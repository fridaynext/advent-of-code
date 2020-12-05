"use strict";

/************************ DAY 1 *****************************/

let expenses = [1438, 781, 1917, 1371, 1336, 1802, 1566, 1878, 737, 1998, 1488, 1372, 1715, 1585, 1676, 1810, 1692, 1329, 1916, 1854, 1307, 1347, 1445, 1475, 1435, 1270, 1949, 1957, 1602, 1931, 1505, 1636, 1539, 1803, 1011, 1821, 1021, 1461, 1755, 1332, 1576, 1923, 1899, 1574, 1641, 1357, 1509, 1877, 1875, 1228, 1725, 1808, 1678, 1789, 1719, 1691, 1434, 1538, 2002, 1569, 1403, 1146, 1623, 1328, 1876, 520, 1930, 1633, 1990, 1330, 1402, 1880, 1984, 1938, 1898, 1908, 1661, 1335, 1424, 1833, 1731, 1568, 1659, 1554, 1323, 1344, 1999, 1716, 1851, 1313, 1531, 190, 1834, 1592, 1890, 1649, 1430, 1599, 869, 1460, 1009, 1771, 1818, 1853, 1544, 1279, 1997, 1896, 1272, 1772, 1375, 1373, 1689, 1249, 1840, 1528, 1749, 1364, 1670, 1361, 1408, 1828, 1864, 1826, 1499, 1507, 336, 1532, 1349, 1519, 1437, 1720, 1817, 1920, 1388, 1288, 1290, 1823, 1690, 1331, 1564, 1660, 1598, 1479, 1673, 1553, 1991, 66, 1571, 1453, 1398, 1814, 1679, 1652, 1687, 1951, 1334, 1319, 1605, 1757, 1517, 1724, 2008, 1601, 1909, 1286, 1780, 1901, 1961, 1798, 1628, 1831, 1277, 1297, 1744, 1946, 1407, 1856, 1922, 1476, 1836, 1240, 1591, 1572, 2000, 1813, 1695, 1723, 1238, 1588, 1881, 1850, 1298, 1411, 1496, 744, 1477, 1459, 1333, 1902];

// Find 2 entries that sum to 2020, and then multiply them
for (let i = 0; i < expenses.length; i++) {
    for (let j = 0; j < expenses.length; j++) {
        // skip the outer expense (i)
        if (j !== i) {
            if (expenses[i] + expenses[j] === 2020) {
                console.log("2 nums that sum 2020 multiplied = " + (expenses[i] * expenses[j]));
            }
        }
    }
}

// Find 3 entries that sum to 2020, and then multiply them
for (let i = 0; i < expenses.length; i++) {
    for (let j = 0; j < expenses.length; j++) {
        // skip the outer expense (i)
        if (j !== i) {
            for (let k = 0; k < expenses.length; k++) {
                if (k !== j) {
                    if (expenses[i] + expenses[j] + expenses[k] === 2020) {
                        console.log("3 nums that sum 2020 multiplied = " + (expenses[i] * expenses[j] * expenses[k]));
                    }
                }
            }
            if (expenses[i] + expenses[j] === 2020) {

            }
        }
    }
}

/************************ DAY 2 *****************************/
// pull in ../assets/passwords.json and analyze each for correctness
$.ajax("/advent-of-code/assets/passwords.json").done(function (data, status, jqXhr) {
    console.log("Request status: " + status);
    let totalPw = 0;
    let totalCorrect = 0;
    let newTotalCorrect = 0;
    data.forEach(function (pwGroup, index, allDataArr) {
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
        let firstIndex = pwGroup.password.split('')[policyMin - 1];
        let lastIndex = pwGroup.password.split('')[policyMax - 1];
        if (firstIndex === pwLetter || lastIndex === pwLetter) {
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
    .fail(function (jqXhr, status, error) {
        console.log("There was an error: ");
        console.error(error);
    })
    .always(function () {
        console.log("Finished processing passwords");
    });

/************************ DAY 3 *****************************/
$.ajax("/advent-of-code/assets/trees.json")
    .done(function (data, status, jqXhr) {

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
        data.forEach(function (line, index, fullArr) {
            // Now we're looking at a single row of trees
            let thisRow = line.treeRow.split('');
            let hit = "no";
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
    .fail(function (jqXhr, status, error) {
        console.log("There was an error: ");
        console.error(error);
    })
    .always(function () {
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
    if (offset > 30) {
        // the pattern repeats, so break it down to quotient/remainder
        return offset - 31;
    }
    return offset;
}

/************************ DAY 4 *****************************/
$.ajax("/advent-of-code/assets/passports.json")
    .done(function (data, status, jqXhr) {
        let numValidPassports = 0;
        data.forEach(function (passport, index, fullArr) {
            // Looking at individual passports
            //  byr (Birth Year)
            if (passport.hasOwnProperty("byr") && parseInt(passport.byr) >= 1920 && parseInt(passport.byr) <= 2002) {
                //  iyr (Issue Year)
                if (passport.hasOwnProperty("iyr") && parseInt(passport.iyr) >= 2010 && parseInt(passport.iyr) <= 2020) {
                    //  eyr (Expiration Year)
                    if (passport.hasOwnProperty("eyr") && parseInt(passport.eyr) >= 2020 && parseInt(passport.eyr) <= 2030) {
                        //  hgt (Height)
                        if (passport.hasOwnProperty("hgt")) {
                            let unit = passport.hgt.slice(-2);
                            let height = passport.hgt.substr(0, passport.hgt.length - 2);
                            if ((unit === 'cm' && height >= 150 && height <= 193) || (unit === 'in' && height >= 59 && height <= 76)) {
                                //  hcl (Hair Color)
                                if (passport.hasOwnProperty("hcl")) {
                                    let hcl = passport.hcl;
                                    let allowedChar = /^#[0-9A-F]{6}$/i;
                                    if (hcl.substr(0, 1) === '#' && hcl.substr(1).length === 6 && allowedChar.test(hcl) !== false) {
                                        //  ecl (Eye Color)
                                        if (passport.hasOwnProperty("ecl")) {
                                            let ecl = passport.ecl;
                                            if (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)) {
                                                //  pid (Passport ID)
                                                if (passport.hasOwnProperty("pid")) {
                                                    let pid = passport.pid;
                                                    if (parseInt(pid) && pid.length === 9) {

                                                        //  cid (Country ID)
                                                        //  Don't have to check for this
                                                        numValidPassports++;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        ;
        console.log("Total valid passports = " + numValidPassports);
    })
    .fail(function (jqXhr, status, error) {
        console.log("There was an error: ");
        console.error(error);
    })
    .always(function () {
        console.log("Finished processing passports");
    });

/************************ DAY 5 *****************************/
// BEGIN KEYBASE SALTPACK ENCRYPTED MESSAGE. kiOUtMhcc4NXXRb XMxIeCbf5rFZD7q v7pjkOkifoOLiaC jvc8d2J8FCVgTtt bnS0s62RvBXIjTy 8uD583atDTPThSB LRPvfbWB0U4770K 1GantgeFN7ZjzIg 1dehNVE93uba5ue wEU19fRNRvOT3TG yUeCdJwLJzPZtxg uWE8T1Z5uE9nDoX p1150xqLhW4fH7B gmvHaLYJxGGqFvl yxrVYMJPxbQK8CK xR1cf1Ty0PFhdsc K36nD0mmFsut2dH ku4BCerYpTrInba XX5ueJ7Xp5LV77T XFxRaNViUlAzZMZ cUP9Fk8PS0w8RIF nFd8iNkFIVx2eG6 Ecp4cL0zFkQxgCH tq6v1NilS6pqMqM oOLpeWZXY5L5bM5 qSH5ebxCXivactz LKBqFav4tN19ah5 MBONQOMmwEntdwR yEP6SHzlQm3L5Zj FcoOaU6unE0wHj0 7EFyhK26E0t3GnD 8qzejGbcWw1rSqO JJj4Bl7iSRTa61X OpV0EveGjoq3sRd kGuXy3hZe6QoOD2 KGZQBpHLJPS7kxf 7GfepxxuBUPbSxK 99VQQvoYcFtIiyI TUXFLADzuV4Pt0v bhj9trZfhUxXC9r ZliZ7zaJ8xGAE0K xXOUpXkXoX4r5kE m2DcsrePzpRl3HG uf61Bv9j0DxmI5D jrojf5lFHVYXJeA rNnRZ2je16rYeAp sK9qZQwkCBwEkoj CTMKoU0DP9rWmgE RYRbNdJT3FafQmV T9uioZAXHBVei6O PwfaazSeLgQMoXc DTmclLcHOfi541a lGw3de1XcZevVAI yAuJ06jPl3rVuv5 likc6MJMTQCkXNB AhA3ZHAv4jYJQYi 190VYdXsO3DcUqR YgHOvmJ1OxAaFzG UKSciVLomL3DvKJ N1QObhyBSQgNXm1 UNEAShwG4QHEJyS ogQJOmIpUbmm3RJ Rj5IKNgEKxMhqwo VvPekONQWnajjaZ cydPsYJ57C7CY5q l459nob6lKZt370 MXG6B0GiizSO8yw WQ1t0KmTM4ftlvt 0xauVFAFQzhMtxv Egmrx6eOBjDG8et a7Txa6wnsvldZDO 1viDgPjaqWlspRy QRhECnJ7yZVFkgG 5Ka9vLRtRVsym32 60KVyU4Og2xrUGF aVMXTxLUZ4vcS8O Vi50QQsF1C4W00j jr2ZLUEUCRPoaXE VesGbWAhT0xlIJr wDNYkgIHAdpwVhC CtYbqlfNj1dK5mi NAT4uw7ovDuVE8L NvCwohm6jxlktmu dsAK8gwxC3rA3KO 9HaZ1sheI9Xkw8v Sm5RLCYzPhTzWah nr6SABQ4HKkgTTI hdyeLRJP6BswuvW YSmEdhYDp5aMGHB zgleUd8oMQLPxEh f8yzTHNHWcSO4g0 4m8J1H5EMjfrT35 6uRthd6EZbq49Jh vzryn8O8zejM3Pq aKm3sIIJJb0RIwN sR8JzkdbahQZGWK TczBT1L0qAVGCUz P7OhaLMF33alukL SJYjELCVDvZpyLb y94g7XKJGdjqLyh uic38s2l26p7T2Q qbKGdMOzTQ8AN0j Ca3aawjt3W8znYf TMY7WMET6BG8LBL 2RCPWecB8YifqdF dqjvJ8u13ASTvru EItkUwvvD6EklqG 6DJuaiKUOO7eaxy P64A0V0KWUtm7S0 6xlI9C4BYOqC7WP qE9AEQTnYlEy6kG STOIVvreGQGiPJ0 2BWhLxIQ17yddPP lpI5ItQl9PLSAFl 4aeD8S5BTdNni4S VifFLZcmeXIK2P2 zf29uDb66lMk9eR W5VjIJkvSLFP2G8 wk4oIqjWRphWVU1 8rEPhGT3fJRa3ZD oDnfBcCxqpNCFR0 R98kuBcZ6gO6ppK oHDVWa2b9qhSELK I2owsT2vrzH8BH9 zx9ILsrmwEhkmt2 dvU548ccwkVSznL jpPzS0I4QFK5eLE 7M2yECZ3XqPieHV 2a2qxdbJ2T5OR1C qQ7D9CIav8vlB3x hGnFoXJTQd32S9U etRI8BEpgFA6Ask D8qalTxF4enq7IF QRRiJy2OMUEyI3c PuI1lEVJ1XtdPpL cO3YICNaqGbZd5B t9dtRosCIpExMs7 2Hkzh3nnIQn6AW8 uCGQIfEsLSoncWf FaOfrqhsMcXwJOg pFwbE2YYGaQSDpP G8qqMCgYAbMPkzb asCYfE8FwwUTI2H BUUE4Lv7jBloTQp KSFWX10dSpxuSoz KSQpoNDOk1rSiqF zw89U7qZjs4p0lp AysSlusepIoP7Hl 4tTECi9e7Bbomn8 Yij598wkEK4XWxa YeRfYbWvyqa7vui 4AEIVbBBktfKCvu WWvtTj30FMu218d Wk11arn0OoLJByr TALj3JQKMKZicYC qSsknw5pXs1oReG 3XpkQ3982rRhPV4 VV0maMmzXGHdEsW VmVsgemtWdXVoSw aVDR2f5ZjSiJIVx eTIEGwFP9qx0QWC cAxrfbDF3scU5Pl 7YpeJ0oJaKPKzk1 78WrVWEIGmHBhaW ZNDjq4zImqDqiRA glDMRilKEtUhe8W 7huaHQQwiEVzq7t A7aIRakVKbcj8dB 45liYDtu0GBLtaF 6M9kiHCBRgANQXn C6Ks0cB5VCX2Fvn m3LDOsrAKeTQ0lA th9iVXVriVLZXJR VWKXMpXMIv11Y3x 4i2CgOugUADxr5N TZ5yIYJ9NFfWfGF G7FC9C1yRUZseW5 AWflVYDv0DX7x4e n2mlDPDQktmOqK7 KFS9PhMGjNbS9Hc EbYTMTRAsy3vFh1 wxJJaefgEm7qBrJ 3HPAFXIlgrjYpjo dFszkw3FUb6N1fO 4pW4Vwnxb5gtc8x glvDvyp2ocX3wB1 FDgIAdQ6B2j7m7G 6u78z5fUe8gkKXY rIbmBnAbQLpBX7M Fc01KxU3vXBQaxF qfqgbnQpnhJMfyI 4fAHZhCQ5Zd9ko7 pAUrm1x7l7fXgNS 6w0IzBhGsNRRKpa wwL0yTSPKQSqxi6 YUaHkQM1zQyvfxN clsIzxwDmV9jXD9 6674XBP6dXf8G1d 0vHpIkQEWyExcR8 O60Zjb7y0oTt0XU
// 6ESg196iVJDQ5XK v1vbcSFP3MSZpyY euziOjKlMee8aIb arpVWARTh6vKfvf 7HNSxk5XIrkyCQP 6RhFJUI1IZMBgtx LfuF0oDC2apvkHl DtjkXUvORFe1pPi xzyRKJbP7xpyuQW YezlVHuMlkewlsT MG32MmTDb99t9tP Rv41YUYFw8kb6n0 PdgX1gl9ii6vZGO lokaNy2b6ppScWF WdVNt4RAChXpR9B kjvvgO3qdrX7pO3 va5SghRHdws1UhR llSkwtDzctG8HvK K6ASLvhcyp7IZp3 EdkCfkQXSfchG3K W31FpRw6RAN4Sel Nc2ZqOxPm7H05Wh wWnW3wmpFx0X8ZD 1. END KEYBASE SALTPACK ENCRYPTED MESSAGE.
