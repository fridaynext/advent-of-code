"use strict";

/************************ DAY 1 *****************************/

let expenses = [1438,781,1917,1371,1336,1802,1566,1878,737,1998,1488,1372,1715,1585,1676,1810,1692,1329,1916,1854,1307,1347,1445,1475,1435,1270,1949,1957,1602,1931,1505,1636,1539,1803,1011,1821,1021,1461,1755,1332,1576,1923,1899,1574,1641,1357,1509,1877,1875,1228,1725,1808,1678,1789,1719,1691,1434,1538,2002,1569,1403,1146,1623,1328,1876,520,1930,1633,1990,1330,1402,1880,1984,1938,1898,1908,1661,1335,1424,1833,1731,1568,1659,1554,1323,1344,1999,1716,1851,1313,1531,190,1834,1592,1890,1649,1430,1599,869,1460,1009,1771,1818,1853,1544,1279,1997,1896,1272,1772,1375,1373,1689,1249,1840,1528,1749,1364,1670,1361,1408,1828,1864,1826,1499,1507,336,1532,1349,1519,1437,1720,1817,1920,1388,1288,1290,1823,1690,1331,1564,1660,1598,1479,1673,1553,1991,66,1571,1453,1398,1814,1679,1652,1687,1951,1334,1319,1605,1757,1517,1724,2008,1601,1909,1286,1780,1901,1961,1798,1628,1831,1277,1297,1744,1946,1407,1856,1922,1476,1836,1240,1591,1572,2000,1813,1695,1723,1238,1588,1881,1850,1298,1411,1496,744,1477,1459,1333,1902];

// Find 2 entries that sum to 2020, and then multiply them
for (let i = 0; i < expenses.length; i++) {
    for(let j = 0; j < expenses.length; j++) {
        // skip the outer expense (i)
        if (j !== i) {
            if( expenses[i] + expenses[j] === 2020) {
                console.log("2 nums that sum 2020 multiplied = " + (expenses[i]*expenses[j]));
            }
        }
    }
}

// Find 3 entries that sum to 2020, and then multiply them
for (let i = 0; i < expenses.length; i++) {
    for(let j = 0; j < expenses.length; j++) {
        // skip the outer expense (i)
        if (j !== i) {
            for (let k = 0; k < expenses.length; k++) {
                if (k !== j) {
                    if (expenses[i] + expenses[j] + expenses[k] === 2020) {
                        console.log("3 nums that sum 2020 multiplied = " + (expenses[i]*expenses[j]*expenses[k]));
                    }
                }
            }
            if( expenses[i] + expenses[j] === 2020) {

            }
        }
    }
}

/************************ DAY 2 *****************************/
// pull in ../assets/passwords.json and analyze each for correctness
$.ajax("/advent-of-code/assets/passwords.json").done(function(data, status, jqXhr) {
    console.log("Request status: " + status);
    let totalPw = 0;
    let totalCorrect = 0;
    let newTotalCorrect = 0;
    data.forEach(function(pwGroup, index, allDataArr) {
        totalPw++; // count total pw in JSON
        // Decode the pw policy
        let policyPw = pwGroup.policy.split(' ');
        let policy = policyPw[0];
        let policyMin = policy.split('-')[0];
        let policyMax = policy.split('-')[1];
        let pwLetter = policyPw[1];

        // Decide if the pw meets the policy reqs
        let numMatches = 0;
        pwGroup.password.split('').forEach(function (letter, index, fullArr) {
            if (letter === pwLetter) {
                numMatches++;
            }
        });
        if (numMatches >= policyMin && numMatches <= policyMax) {
            totalCorrect++;
        }

        // Decide if ONLY ONE of the positions given has a letter match
        let firstIndex = pwGroup.password.split('')[policyMin-1];
        let lastIndex = pwGroup.password.split('')[policyMax-1];
        if (firstIndex === pwLetter || lastIndex=== pwLetter) {
            // at least one of them matches
            if (!(firstIndex === pwLetter && lastIndex === pwLetter)) {
                // they don't BOTH match, so add to the counter
                newTotalCorrect++;
            }
        }
    });
    console.log("Total pw: " + totalPw);
    console.log("Total correct pws: " + totalCorrect);
    console.log("New total correct pws: " + newTotalCorrect);

})
    .fail(function(jqXhr, status, error) {
        console.log("There was an error: ");
        console.error(error);
    })
    .always(function() {
        console.log("Finished processing passwords");
    });

/************************ DAY 3 *****************************/
$.ajax("/advent-of-code/assets/trees.json")
    .done(function(data, status, jqXhr) {

        // if we go at a slope of -1/3, how many trees(#) will we hit?
        let offset = 0;

        let numTreesHit = 0;

        // *******************  PART 2  ***************** //
        // Also for slopes of: -1, -1/3, -1/5, -1/7, -2
        let numTreesHit2 = 0;
        let numTreesHit3 = 0;
        let numTreesHit4 = 0;
        let numTreesHit5 = 0;
        let offset2 = 0;
        let offset3 = 0;
        let offset4 = 0;
        let offset5 = 0;
        data.forEach(function(line, index, fullArr) {
            // Now we're looking at a single row of trees
            let thisRow = line.treeRow.split(''); let hit = "no";
            offset = checkOffset(offset);
            offset2 = checkOffset(offset2);
            offset3 = checkOffset(offset3);
            offset4 = checkOffset(offset4);
            offset5 = index % 2 === 0 ? checkOffset(offset5) : offset5;

            numTreesHit += avoidTrees(thisRow, offset);
            numTreesHit2 += avoidTrees(thisRow, offset2);
            numTreesHit3 += avoidTrees(thisRow, offset3);
            numTreesHit4 += avoidTrees(thisRow, offset4);
            numTreesHit5 += index % 2 === 0 ? avoidTrees(thisRow, offset5) : 0;
            offset += 3;
            offset2 += 1;
            offset3 += 5;
            offset4 += 7;
            offset5 += index % 2 === 0 ? 1 : 0;

        });
        console.log("Trees hit at Offset 1: " + numTreesHit);
        console.log("Trees hit at Offset 2: " + numTreesHit2);
        console.log("Trees hit at Offset 3: " + numTreesHit3);
        console.log("Trees hit at Offset 4: " + numTreesHit4);
        console.log("Trees hit at Offset 5: " + numTreesHit5);
        console.log("All trees multiplied together: " + numTreesHit * numTreesHit2 * numTreesHit3 * numTreesHit4 * numTreesHit5);

    })
    .fail(function(jqXhr, status, error) {
        console.log("There was an error: ");
        console.error(error);
    })
    .always(function() {
        console.log("Finished processing trees");
    });

function avoidTrees(row, offset) {
    // returns either 1 or 0 if it hit a tree or not
    if (row[offset] === '#') {
        return 1;
    } else {
        return 0;
    }
}
function checkOffset(offset) {
    if(offset > 30) {
        // the pattern repeats, so break it down to quotient/remainder
        return offset - 31;
    }
    return offset;
}