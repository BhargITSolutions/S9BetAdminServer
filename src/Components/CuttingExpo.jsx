import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './Header';
import Footer from './Footer';


import axios from 'axios';


function CuttingExpo() {

  const { eid, gameId } = useParams();
  const mainBlnc = Cookies.get('MainBalance');
  const exposure = Cookies.get('exposure');
  const userId = Cookies.get('id')
  const userIp = Cookies.get('userIP')


  const numEid = parseInt(eid)
  console.log("eid type : " + typeof (numEid))

  const [filteredMatch, setFilterMatch] = useState([]);
  const [filteredEventNames, setfilterEventNames] = useState([])
  const [fileredMarketId, setfilterMarketId] = useState([])
  const [odds, setOdds] = useState([]);
  const [bm, setBM] = useState([]);
  const [fancy, setFancy] = useState([]);
  const [data, setData] = useState([]);
  const [stakeValue, setStakeValue] = useState(0);
  const [teamName, setBetTeamName] = useState('');
  const [lossData, setLossData] = useState(0);
  const [profitData, setProfitData] = useState(0);
  const [type, setType] = useState('');
  const [teamselectionId, setTeamSelectionId] = useState('');
  const [clickedType, setClickedType] = useState(null);
  const [clickedTable, setClickedTable] = useState('');
  const [fancyPrice, setFancyPrice] = useState(0);
  const [sportsStack, setSportsStack] = useState([]);
  const [userMatchStack, setuserMatchStack] = useState([]);
  const [minmaxStack, setMinMaxStack] = useState([]);
  const [betDelay, setBetDelay] = useState(0);
  const [bookMDelay, setBookMDelay] = useState(0);
  const [fancyDelay, setFancyDelay] = useState(0);
  const [teamProfit, setTeamProfit] = useState(0)
  const [teamLoss, setTeamLoss] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [matchDelayTime, setMatchDelaytime] = useState(null)
  const [matchOddMarket, setMatchOddMarket] = useState([])
  const [bookMakerMarket, setbookMakerMarket] = useState([])
  const [fancyBookMarket, setFancyBookMarket] = useState([])
  const [matchOddBetProfit, setmatchOddBetProfit] = useState(0)
  const [matchOddBetLoss, setmatchOddBetLoss] = useState(0)
  const [matchOddBetProfitLay, setmatchOddBetProfitLay] = useState(0)
  const [matchOddBetLossLay, setmatchOddBetLossLay] = useState(0)
  const [bookMBetProfit, setBookMBetProfit] = useState(0)
  const [bookMBetLoss, setBookMBetLoss] = useState(0)
  const [fancyBetProfit, setfancyBetProfit] = useState(0)
  const [fancyBetLoss, setfancyBetLoss] = useState(0)
  const [openBetTable, setOpenBetTable] = useState([]);
  const [FancybookbtnArray, setFancyBookBtnArray] = useState([]);
  const [accumulatedAmountStack, setAccumulatedAmountStack] = useState(new Map());




  var betType;
  var oddType;
  var eve;



  if (clickedTable == "OddsDiv") {
    betType = "Matchodds";
    oddType = 1;
    eve = filteredMatch[0].eventName;


  } else if (clickedTable == "bookmakerDiv") {
    betType = "BookMaker";
    oddType = 2;
    eve = filteredMatch[0].eventName;
  } else {
    betType = "Fancy";
    oddType = 3;
    eve = teamName;
  }


  useEffect(() => {


    fetchData();
    tableApi();
    getStackLimit();
    // fetchBet();
    // allCalculatedBet();
    // const intervalId = setInterval(fetchData, 5000);

    // return () => clearInterval(intervalId);
  }, [gameId, eid]);

  useEffect(() => {
    fetchBet()
    allCalculatedBet();
    // tableApi();
  })

  useEffect(() => {

    if (clickedTable == "OddsDiv") {

      if (type == "back") {
        const calc = ((clickedType - 1).toFixed(2)) * stakeValue
        setLossData(-1 * stakeValue)
        setProfitData(calc)
      } else {
        const calc = ((clickedType - 1).toFixed(2)) * stakeValue
        setLossData(-1 * calc)
        setProfitData(stakeValue)
      }
    } else if (clickedTable == "bookmakerDiv") {
      if (type == "back") {
        const newStake = stakeValue / 100
        const calc = clickedType * newStake
        setLossData(-1 * stakeValue)
        setProfitData(calc)
      } else {
        const newStake = stakeValue / 100
        const calc = clickedType * newStake
        setLossData(-1 * calc)
        setProfitData(stakeValue)
      }
    } else if (clickedTable == "fancyTableSHow") {
      const calc = stakeValue * (fancyPrice / 100)

      setLossData(-1 * stakeValue)
      setProfitData(calc)
    }

    console.log("set clickedType state value is : " + clickedType)

  }, [type, stakeValue, clickedType, clickedTable, fancyPrice])


  function generateRandomAlphaNumeric(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  // // Example: Generate a random alphanumeric string of length 8
  // const randomString = generateRandomAlphaNumeric(8);
  // console.log(randomString);

  const fetchBet = async () => {
    try {
      const response = await fetch(`https://api.s2bet.in/GetBetHistory/${userId}`);
      const result = await response.json();
      console.log("Bet result : " + JSON.stringify(result))

      // Filter by date and Status
      const filteredData = result.data.filter(item =>
        item.eventId == gameId && item.isSettlement == 2 && item.isDelete == 0
      );
      console.log("Filtered by eventId : " + JSON.stringify(filteredData));

      // Sort the data by the ISO date string
      const sortedFilter = filteredData.sort((a, b) => new Date(b.placeTime) - new Date(a.placeTime));

      setOpenBetTable(sortedFilter)


      // For BACK !!!!!!!

      const filtermatchOdds = filteredData.filter(item => item.market == "Matchodds" && item.selectionId == odds[0].selectionId && item.type == "back")

      const totalProfit = filtermatchOdds.reduce((sum, item) => sum + item.profit, 0);

      console.log("Total Profit for back: ", totalProfit);
      const totalLoss = filtermatchOdds.reduce((sum, item) => sum + item.liability, 0);

      console.log("Total Loss for back: ", totalLoss);

      console.log("Match Odd filter : " + JSON.stringify(filtermatchOdds))
      // setmatchOddBetProfit(totalProfit)
      // setmatchOddBetLoss(totalLoss)

      // For LAY !!!!!!

      const filtermatchOddsLay = filteredData.filter(item => item.market == "Matchodds" && item.selectionId == odds[0].selectionId && item.type == "lay")

      const totalProfitLay = filtermatchOddsLay.reduce((sum, item) => sum + item.profit, 0);

      console.log("Total Loss for Lay : ", totalProfitLay);
      const totalLossLay = filtermatchOddsLay.reduce((sum, item) => sum + item.liability, 0);

      console.log("Total Profit for Lay : ", totalLossLay);

      console.log("Match Odd filter for lay : " + JSON.stringify(filtermatchOddsLay))
      // setmatchOddBetProfit(totalProfit)
      // setmatchOddBetLoss(totalLoss)
      // setmatchOddBetProfitLay(totalLossLay)
      // setmatchOddBetLossLay(totalProfitLay)

      // const finalProfitMatchOdd = totalProfit + totalLossLay
      // const finalLossMatchOdd = totalLoss + totalProfitLay

      // console.log("Profit " + finalProfitMatchOdd)
      // console.log("loss " + finalLossMatchOdd)
      // setmatchOddBetProfit(finalProfitMatchOdd)
      // setmatchOddBetLoss(finalLossMatchOdd)


      // NEXT TEAM For BACK /////////////

      const filterODD = filteredData.filter(item => {
        // Check if the market is "Matchodds", type is "back", 
        // and there is at least one matching selectionId in the odds array
        return item.market === "Matchodds" &&
          item.type === "back" &&
          odds.some(oddsitem => oddsitem.selectionId === item.selectionId);
      });

      // Get unique selectionIds from filterODDLay
      const filterODDSelectionIds = new Set(filterODD.map(item => item.selectionId));

      // Filter items from odds based on selectionId not present in filterODDLay
      const filterOddAgainForOdd = odds.filter(item => !filterODDSelectionIds.has(item.selectionId));

      // Add profit = 0 and loss = 0 to the items in filterOddAgain
      const filterOddAgainWithProfitLossOdd = filterOddAgainForOdd.map(item => ({
        ...item,
        profit: 0,
        liability: 0,
      }));

      // Combine filterODDLay and filterOddAgainWithProfitLoss into a single array
      const combinedArrayForOdd = [...filterODD, ...filterOddAgainWithProfitLossOdd];

      console.log("Next Team for Odd: " + JSON.stringify(combinedArrayForOdd));

      // // Filter items for the same selectionId
      // const selectionItems = filterODD.filter(item => item.selectionId === item.selectionId);

      // console.log("Same Id data: " + JSON.stringify(selectionItems))

      // Create an object to store total profit for each selectionId
      const totalProfitBySelectionId = {};
      const totalLossBySelectionId = {};

      // Calculate net profit for each selectionId
      combinedArrayForOdd.forEach(item => {
        const selectionId = item.selectionId;
        const profit = item.profit;
        const loss = item.liability;

        // If selectionId is not in the object, add it
        if (!totalProfitBySelectionId.hasOwnProperty(selectionId)) {
          totalProfitBySelectionId[selectionId] = 0;
        }

        // If selectionId is not in the object, add it
        if (!totalLossBySelectionId.hasOwnProperty(selectionId)) {
          totalLossBySelectionId[selectionId] = 0;
        }

        // Add profit to the total for this selectionId
        totalProfitBySelectionId[selectionId] += profit;
        totalLossBySelectionId[selectionId] += loss;
      });

      // Calculate the net profit (profit - loss) for each selectionId
      const netProfitBySelectionId = {};
      Object.keys(totalProfitBySelectionId).forEach(selectionId => {
        // Calculate total loss to other selectionIds
        const totalLossToOtherSelections = Object.keys(totalLossBySelectionId)
          .filter(otherSelectionId => otherSelectionId !== selectionId)
          .reduce((acc, otherSelectionId) => acc + totalLossBySelectionId[otherSelectionId], 0);

        const profit = totalProfitBySelectionId[selectionId];
        const loss = totalLossBySelectionId[selectionId];

        // Subtract total loss to other selectionIds from the profit
        netProfitBySelectionId[selectionId] = profit + totalLossToOtherSelections;
      });


      // Example usage:
      console.log("Total Profit by SelectionId for Odd: ", totalProfitBySelectionId);
      console.log("Total Loss by SelectionId for Odd : ", totalLossBySelectionId);
      console.log("Net Profit by SelectionId for Odd : ", netProfitBySelectionId);




      // NEXT TEAM For LAY /////////////

      const filterODDLay = filteredData.filter(item => {
        // Check if the market is "Matchodds", type is "back", 
        // and there is at least one matching selectionId in the odds array
        return item.market === "Matchodds" &&
          item.type === "lay" &&
          odds.some(oddsitem => oddsitem.selectionId === item.selectionId);
      });

      // Get unique selectionIds from filterODDLay
      const filterODDLaySelectionIds = new Set(filterODDLay.map(item => item.selectionId));

      // Filter items from odds based on selectionId not present in filterODDLay
      const filterOddAgain = odds.filter(item => !filterODDLaySelectionIds.has(item.selectionId));

      // Add profit = 0 and loss = 0 to the items in filterOddAgain
      const filterOddAgainWithProfitLoss = filterOddAgain.map(item => ({
        ...item,
        profit: 0,
        liability: 0,
      }));

      console.log("filter odd Again : " + JSON.stringify(filterOddAgainWithProfitLoss));

      console.log("Next Team for Lay : " + JSON.stringify(filterODDLay));

      console.log("Odds item : " + JSON.stringify(odds.length))

      // Combine filterODDLay and filterOddAgainWithProfitLoss into a single array
      const combinedArray = [...filterODDLay, ...filterOddAgainWithProfitLoss];

      console.log("Combined Both Array: " + JSON.stringify(combinedArray));

      // console.log("Next Team for Lay Addition: " + JSON.stringify(filterODDLay == 0 ? filterODDLay + filterODD));

      // // Filter items for the same selectionId
      // const selectionItemsLay = filterODD.filter(item => item.selectionId === item.selectionId);

      // console.log("Same Id data: " + JSON.stringify(selectionItemsLay))

      // Create an object to store total profit for each selectionId
      const totalProfitBySelectionIdLay = {};
      const totalLossBySelectionIdLay = {};

      // Calculate net profit for each selectionId
      combinedArray.forEach(item => {
        const selectionId = item.selectionId;
        const profit = item.profit;
        const loss = item.liability;

        // If selectionId is not in the object, add it
        if (!totalProfitBySelectionIdLay.hasOwnProperty(selectionId)) {
          totalProfitBySelectionIdLay[selectionId] = 0;
        }

        // If selectionId is not in the object, add it
        if (!totalLossBySelectionIdLay.hasOwnProperty(selectionId)) {
          totalLossBySelectionIdLay[selectionId] = 0;
        }

        // Add profit to the total for this selectionId
        totalProfitBySelectionIdLay[selectionId] += loss;
        totalLossBySelectionIdLay[selectionId] += profit;
      });

      // Calculate the net profit (profit - loss) for each selectionId
      const netProfitBySelectionIdLay = {};
      Object.keys(totalProfitBySelectionIdLay).forEach(selectionId => {
        // Calculate total loss to other selectionIds
        const totalLossToOtherSelections = Object.keys(totalLossBySelectionIdLay)
          .filter(otherSelectionId => otherSelectionId !== selectionId)
          .reduce((acc, otherSelectionId) => acc + totalLossBySelectionIdLay[otherSelectionId], 0);

        const profit = totalProfitBySelectionIdLay[selectionId];
        const loss = totalLossBySelectionIdLay[selectionId];

        // Subtract total loss to other selectionIds from the profit
        netProfitBySelectionIdLay[selectionId] = profit + totalLossToOtherSelections;
      });


      console.log("Total Profit by SelectionId Odd: ", netProfitBySelectionId)
      console.log("Total Loss by SelectionId Odd: ", totalLossBySelectionId)
      console.log("Total Profit by SelectionId Lay: ", totalProfitBySelectionIdLay);
      console.log("Total Loss by SelectionId Lay: ", totalLossBySelectionIdLay);
      console.log("Net Profit by SelectionId Lay: ", netProfitBySelectionIdLay);

      // const finalProfitMatchOdd = netProfitBySelectionId + netProfitBySelectionIdLay
      // // const finalLossMatchOdd = totalLossBySelectionId + netProfitBySelectionIdLay

      // console.log("Profit " + finalProfitMatchOdd)


      // Assuming netProfitBySelectionId and netProfitBySelectionIdLay have the same selectionIds
      const finalProfitMatchOdd = {};

      Object.keys(netProfitBySelectionId).forEach(selectionId => {
        // Sum the corresponding values for each selectionId
        finalProfitMatchOdd[selectionId] = (netProfitBySelectionId[selectionId] || 0) + (netProfitBySelectionIdLay[selectionId] || 0);
      });

      // const finalProfitMatchOddArray = Object.entries(finalProfitMatchOdd).map(([selectionId, profit]) => ({ selectionId, profit }));
      console.log("Final Profit for Match Odd: ", finalProfitMatchOdd);
      // console.log("loss " + finalLossMatchOdd)
      setmatchOddBetProfit(finalProfitMatchOdd)
      // setmatchOddBetLoss(finalLossMatchOdd)



      // console.log("Final Profit for Match Odd: ", finalProfitMatchOdd);
      // console.log("Final Loss for Match Odd: ", finalLossMatchOdd);
      // console.log("Final Profit for Lay Odd: ", finalProfitLayOdd);
      // console.log("Final Net Loss for Lay Odd: ", finalNetLossLayOdd);
      //  console.log("Final Loss for Lay Odd: ", finalLossLayOdd);



      // For BACK for BOOKMAKER !!!!!!! !!!!!!!


      const filterBookM = filteredData.filter(item => item.market == "BookMaker" && bm.some(bmitem => bmitem.sid == item.selectionId) && item.type == "back")

      const totalProfitBook = filterBookM.reduce((sum, item) => sum + item.profit, 0);

      console.log("Total Profit for back: ", totalProfitBook);
      const totalLossBook = filterBookM.reduce((sum, item) => sum + item.liability, 0);

      console.log("Total Loss for back: ", totalLossBook);

      console.log("Book Maker filter : " + JSON.stringify(filterBookM))
      // setmatchOddBetProfit(totalProfit)
      // setmatchOddBetLoss(totalLoss)

      // For LAY !!!!!!

      const filterBookLay = filteredData.filter(item => item.market == "BookMaker" && bm.some(bmitem => bmitem.sid == item.selectionId) && item.type == "lay")

      const totalProfitLayBook = filterBookLay.reduce((sum, item) => sum + item.profit, 0);

      console.log("Total Loss for Lay : ", totalProfitLayBook);
      const totalLossLayBook = filterBookLay.reduce((sum, item) => sum + item.liability, 0);

      console.log("Total Profit for Lay : ", totalLossLayBook);

      console.log("Match Odd filter for lay : " + JSON.stringify(filterBookLay))
      // setmatchOddBetProfit(totalProfit)
      // setmatchOddBetLoss(totalLoss)
      // setmatchOddBetProfitLay(totalLossLay)
      // setmatchOddBetLossLay(totalProfitLay)

      // const finalProfitMatchOdd = totalProfit + totalLossLay
      // const finalLossMatchOdd = totalLoss + totalProfitLay

      // console.log("Profit " + finalProfitMatchOdd)
      // console.log("loss " + finalLossMatchOdd)
      // setmatchOddBetProfit(finalProfitMatchOdd)
      // setmatchOddBetLoss(finalLossMatchOdd)


      // NEXT TEAM For BACK /////////////

      const filterBook = filteredData.filter(item => {
        // Check if the market is "Matchodds", type is "back", 
        // and there is at least one matching selectionId in the odds array
        return item.market === "BookMaker" &&
          item.type === "back" &&
          bm.some(bmitem => bmitem.sid == item.selectionId);
      });

      console.log("Next team filter back bookMaker : " + JSON.stringify(filterBook))

      // Get unique selectionIds from filterODDLay
      const filterBookSelectionIds = new Set(filterBook.map(item => item.selectionId));

      // Filter items from odds based on selectionId not present in filterODDLay
      const filterBookAgainForBook = bm.filter(item => !filterBookSelectionIds.has(item.sid));

      // Add profit = 0 and loss = 0 to the items in filterOddAgain
      const filterBookAgainWithProfitLossBook = filterBookAgainForBook.map(item => ({
        ...item,
        profit: 0,
        liability: 0,
      }));

      // Combine filterODDLay and filterOddAgainWithProfitLoss into a single array
      const combinedArrayForBook = [...filterBook, ...filterBookAgainWithProfitLossBook];

      console.log("Next Team for Book combined: " + JSON.stringify(combinedArrayForBook));
      console.log("filter book selection Ids : " + JSON.stringify(filterBookSelectionIds))
      console.log("Next team for Book Back again : " + JSON.stringify(filterBookAgainForBook))
      console.log('filter Book again with profit loss book : ' + JSON.stringify(filterBookAgainWithProfitLossBook))

      // // Filter items for the same selectionId
      // const selectionItems = filterODD.filter(item => item.selectionId === item.selectionId);

      // console.log("Same Id data: " + JSON.stringify(selectionItems))

      // Create an object to store total profit for each selectionId
      const totalProfitBySelectionIdBook = {};
      const totalLossBySelectionIdBook = {};

      // Calculate net profit for each selectionId
      combinedArrayForBook.forEach(item => {
        const selectionId = item.selectionId || item.sid;
        const profit = item.profit;
        const loss = item.liability;

        // If selectionId is not in the object, add it
        if (!totalProfitBySelectionIdBook.hasOwnProperty(selectionId)) {
          totalProfitBySelectionIdBook[selectionId] = 0;
        }

        // If selectionId is not in the object, add it
        if (!totalLossBySelectionIdBook.hasOwnProperty(selectionId)) {
          totalLossBySelectionIdBook[selectionId] = 0;
        }

        // Add profit to the total for this selectionId
        totalProfitBySelectionIdBook[selectionId] += profit;
        totalLossBySelectionIdBook[selectionId] += loss;
      });

      // Calculate the net profit (profit - loss) for each selectionId
      const netProfitBySelectionIdBook = {};
      Object.keys(totalProfitBySelectionIdBook).forEach(selectionId => {
        // Calculate total loss to other selectionIds
        const totalLossToOtherSelectionsBook = Object.keys(totalLossBySelectionIdBook)
          .filter(otherSelectionId => otherSelectionId !== selectionId)
          .reduce((acc, otherSelectionId) => acc + totalLossBySelectionIdBook[otherSelectionId], 0);

        const profit = totalProfitBySelectionIdBook[selectionId];
        const loss = totalLossBySelectionIdBook[selectionId];

        // Subtract total loss to other selectionIds from the profit
        netProfitBySelectionIdBook[selectionId] = profit + totalLossToOtherSelectionsBook;
      });


      // Example usage:
      console.log("Total Profit by SelectionId for Odd: ", totalProfitBySelectionIdBook);
      console.log("Total Loss by SelectionId for Odd : ", totalLossBySelectionIdBook);
      console.log("Net Profit by SelectionId for Odd : ", netProfitBySelectionIdBook);




      // NEXT TEAM For LAY /////////////

      const filterBookLayNextTeam = filteredData.filter(item => {
        // Check if the market is "Matchodds", type is "back", 
        // and there is at least one matching selectionId in the odds array
        return item.market === "BookMaker" &&
          item.type === "lay" &&
          bm.some(Booksitem => Booksitem.sid === item.selectionId);
      });

      // Get unique selectionIds from filterODDLay
      const filterBookLaySelectionIds = new Set(filterBookLayNextTeam.map(item => item.selectionId));

      // Filter items from odds based on selectionId not present in filterODDLay
      const filterBookAgain = bm.filter(item => !filterBookLaySelectionIds.has(item.sid));

      // Add profit = 0 and loss = 0 to the items in filterOddAgain
      const filterBookAgainWithProfitLoss = filterBookAgain.map(item => ({
        ...item,
        profit: 0,
        liability: 0,
      }));

      console.log("filter Book Again : " + JSON.stringify(filterBookAgainWithProfitLoss));

      console.log("Next Team for Book Lay : " + JSON.stringify(filterBookLayNextTeam));
      console.log("Next Team for Book Again : " + JSON.stringify(filterBookAgain));

      console.log("Book item : " + JSON.stringify(bm.length))

      // Combine filterODDLay and filterOddAgainWithProfitLoss into a single array
      const combinedArrayBook = [...filterBookLayNextTeam
        , ...filterBookAgainWithProfitLoss];

      console.log("Combined Both Array Book: " + JSON.stringify(combinedArrayBook));

      // console.log("Next Team for Lay Addition: " + JSON.stringify(filterODDLay == 0 ? filterODDLay + filterODD));

      // // Filter items for the same selectionId
      // const selectionItemsLay = filterODD.filter(item => item.selectionId === item.selectionId);

      // console.log("Same Id data: " + JSON.stringify(selectionItemsLay))

      // Create an object to store total profit for each selectionId
      const totalProfitBySelectionIdLayBook = {};
      const totalLossBySelectionIdLayBook = {};

      // Calculate net profit for each selectionId
      combinedArrayBook.forEach(item => {
        const selectionId = item.selectionId || item.sid;
        const profit = item.profit;
        const loss = item.liability;

        // If selectionId is not in the object, add it
        if (!totalProfitBySelectionIdLayBook.hasOwnProperty(selectionId)) {
          totalProfitBySelectionIdLayBook[selectionId] = 0;
        }

        // If selectionId is not in the object, add it
        if (!totalLossBySelectionIdLayBook.hasOwnProperty(selectionId)) {
          totalLossBySelectionIdLayBook[selectionId] = 0;
        }

        // Add profit to the total for this selectionId
        totalProfitBySelectionIdLayBook[selectionId] += loss;
        totalLossBySelectionIdLayBook[selectionId] += profit;
      });

      // Calculate the net profit (profit - loss) for each selectionId
      const netProfitBySelectionIdLayBook = {};
      Object.keys(totalProfitBySelectionIdLayBook).forEach(selectionId => {
        // Calculate total loss to other selectionIds
        const totalLossToOtherSelectionsBook = Object.keys(totalLossBySelectionIdLayBook)
          .filter(otherSelectionId => otherSelectionId !== selectionId)
          .reduce((acc, otherSelectionId) => acc + totalLossBySelectionIdLayBook[otherSelectionId], 0);

        const profit = totalProfitBySelectionIdLayBook[selectionId];
        const loss = totalLossBySelectionIdLayBook[selectionId];

        // Subtract total loss to other selectionIds from the profit
        netProfitBySelectionIdLayBook[selectionId] = profit + totalLossToOtherSelectionsBook;
      });


      console.log("Total Profit by SelectionId Book: ", netProfitBySelectionIdBook)
      console.log("Total Loss by SelectionId Book: ", totalLossBySelectionIdBook)
      console.log("Total Profit by SelectionId Lay Book: ", totalProfitBySelectionIdLayBook);
      console.log("Total Loss by SelectionId Lay Book: ", totalLossBySelectionIdLayBook);
      console.log("Net Profit by SelectionId Lay Book: ", netProfitBySelectionIdLayBook);

      // const finalProfitMatchOdd = netProfitBySelectionId + netProfitBySelectionIdLay
      // // const finalLossMatchOdd = totalLossBySelectionId + netProfitBySelectionIdLay

      // console.log("Profit " + finalProfitMatchOdd)


      // Assuming netProfitBySelectionId and netProfitBySelectionIdLay have the same selectionIds
      const finalProfitBook = {};

      Object.keys(netProfitBySelectionIdBook).forEach(selectionId => {
        // Sum the corresponding values for each selectionId
        finalProfitBook[selectionId] = (netProfitBySelectionIdBook[selectionId] || 0) + (netProfitBySelectionIdLayBook[selectionId] || 0);
      });

      // const finalProfitMatchOddArray = Object.entries(finalProfitMatchOdd).map(([selectionId, profit]) => ({ selectionId, profit }));
      console.log("Final Profit for BookMaker: ", finalProfitBook);
      // console.log("loss " + finalLossMatchOdd)
      setBookMBetProfit(finalProfitBook)
      // setmatchOddBetLoss(finalLossMatchOdd)



      // console.log("Final Profit for Match Odd: ", finalProfitMatchOdd);
      // console.log("Final Loss for Match Odd: ", finalLossMatchOdd);
      // console.log("Final Profit for Lay Odd: ", finalProfitLayOdd);
      // console.log("Final Net Loss for Lay Odd: ", finalNetLossLayOdd);
      //  console.log("Final Loss for Lay Odd: ", finalLossLayOdd);


      // console.log("BookMaker filter : "+ JSON.stringify(filterBookMOdds))

      const filterFancy = filteredData.filter(item => item.market == "Fancy" && item.type === "lay" && fancy.some(facnyitem => facnyitem.sid === item.selectionId))

      // console.log("Fancy filter : " + JSON.stringify(filterFancy))
      // console.log("Fancy filter : " + JSON.stringify(filterFancy.selectionId == teamselectionId))

      // console.log("Selectionid : " + teamselectionId)


      // const FancyBookArray = Array.from({ length: 7 }, (_, request, pl) => ({ request: request - 3 + 50, pl: 1000 }))


      // setFancyBookBtnArray(FancyBookArray)

      // const calcProfit = filterFancy.filter(item => fancy.some(facnyitem => facnyitem.sid === item.selectionId))

      // console.log("filter calc : "+JSON.stringify(calcProfit))

      // const proft = calcProfit.forEach({

      // })


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const allCalculatedBet = async () => {

    try {
      const response = await fetch(`https://api.s2bet.in/GetBetHistory/${userId}`);
      const result = await response.json();
      console.log("Bet result : " + JSON.stringify(result))

      // Filter by date and Statu s
      const filteredData = result.data.filter(item =>
        item.eventId == gameId && item.isSettlement == 2 && item.isDelete == 0
      );

      const filterFancyAll = filteredData.filter(item => item.market == "Fancy" && fancy.some(facnyitem => facnyitem.sid === item.selectionId))

      console.log("filterFacnyAll data : " + JSON.stringify(filterFancyAll))

      // Initialize a Map to store the accumulated amountStack for each selectionId
      const amountStackMap = new Map();

      // Iterate through the filterFancyAll array
      filterFancyAll.forEach(item => {
        const { selectionId, amountStake } = item;

        // If the selectionId is not in the map, add it with the current amountStack
        if (!amountStackMap.has(selectionId)) {
          amountStackMap.set(selectionId, amountStake || 0);
        } else {
          // If the selectionId is already in the map, accumulate the amountStack
          const currentAmountStack = amountStackMap.get(selectionId);
          amountStackMap.set(selectionId, currentAmountStack + (amountStake || 0));
        }
      });

      // Update the state with the accumulated amountStack
      setAccumulatedAmountStack(new Map(amountStackMap));
      console.log("Calculated Bets of fancy : " + new Map(amountStackMap))

    } catch (error) {
      console.error('Error fetching allCalculatedBet funciton:', error);
    }
  }

  const openFancyBtn = async (id) => {

    try {
      const response = await fetch(`https://api.s2bet.in/GetBetHistory/${userId}`);
      const result = await response.json();
      console.log("Bet result : " + JSON.stringify(result))

      // Filter by date and Statu s
      const filteredData = result.data.filter(item =>
        item.eventId == gameId && item.isSettlement == 2 && item.isDelete == 0
      );

      const filterFancyAll = filteredData.filter(item => item.market == "Fancy" && fancy.some(facnyitem => facnyitem.sid === item.selectionId))

      console.log("filterFacnyAll data : " + JSON.stringify(filterFancyAll))

      const filterByIdAll = filterFancyAll.filter(item => item.selectionId == id)

      console.log("Fancy filter ALl : " + JSON.stringify(filterByIdAll))


      // Find the minimum and maximum oddsRequest in the group
      const minOddsRequest = Math.min(...filterByIdAll.map(item => item.oddsRequest));
      const maxOddsRequest = Math.max(...filterByIdAll.map(item => item.oddsRequest));



      // BET CALCULATION FOR BACK !!!!!!!!!

      const filterByBack = filterByIdAll.filter(item => item.type === "back")

      console.log("Fancy filter for Back : " + JSON.stringify(filterByBack))


      // Group items by id
      const groupedByIdBack = {};
      filterByBack.forEach(item => {
        if (!groupedByIdBack[item.id]) {
          groupedByIdBack[item.id] = [];
        }
        groupedByIdBack[item.id].push(item);
      });

      // // Find the minimum and maximum oddsRequest in the group
      // const minOddsRequest = Math.min(...filterById.map(item => item.oddsRequest));
      // const maxOddsRequest = Math.max(...filterById.map(item => item.oddsRequest));

      // Calculate the range and set the length dynamically
      const rangeBack = maxOddsRequest - minOddsRequest + 10;

      // Create FancyBookArray for each group
      const resultArraysBack = [];
      const calcArrayBack = []
      Object.keys(groupedByIdBack).forEach(groupId => {
        const groupItems = groupedByIdBack[groupId];


        const FancyBookArray = Array.from({ length: rangeBack }, (_, index) => {
          const request = index + minOddsRequest - 5;
          const pl = request >= groupItems[0].oddsRequest ? groupItems[0].profit : groupItems[0].liability;

          return { request, pl };
        });

        resultArraysBack.push({ id: groupId, FancyBookArray });
      });

      console.log("Result Arrays For Back:", resultArraysBack);

      const redcBack = resultArraysBack.reduce((acc, current) => {
        current.FancyBookArray.forEach((entry) => {
          const existingEntry = acc.find((item) => item.request === entry.request);

          if (existingEntry) {
            existingEntry.pl += entry.pl;
          } else {
            acc.push({ request: entry.request, pl: entry.pl });
          }
        });

        return acc;
      }, []);

      console.log("Calculated Array for Back : " + JSON.stringify(redcBack))



      // BET CALCULATION FOR LAY !!!!!!!!!

      const filterByLay = filterByIdAll.filter(item => item.type === "lay")

      console.log("Fancy filter for Lay : " + JSON.stringify(filterByLay))


      // Group items by id
      const groupedById = {};
      filterByLay.forEach(item => {
        if (!groupedById[item.id]) {
          groupedById[item.id] = [];
        }
        groupedById[item.id].push(item);
      });

      // // Find the minimum and maximum oddsRequest in the group
      // const minOddsRequest = Math.min(...filterById.map(item => item.oddsRequest));
      // const maxOddsRequest = Math.max(...filterById.map(item => item.oddsRequest));

      // Calculate the range and set the length dynamically
      const range = maxOddsRequest - minOddsRequest + 10;

      // Create FancyBookArray for each group
      const resultArrays = [];
      const calcArray = []
      Object.keys(groupedById).forEach(groupId => {
        const groupItems = groupedById[groupId];


        const FancyBookArray = Array.from({ length: range }, (_, index) => {
          const request = index + minOddsRequest - 5;
          const pl = request >= groupItems[0].oddsRequest ? groupItems[0].liability : groupItems[0].profit;

          return { request, pl };
        });

        resultArrays.push({ id: groupId, FancyBookArray });
      });

      console.log("Result Arrays:", resultArrays);

      const redc = resultArrays.reduce((acc, current) => {
        current.FancyBookArray.forEach((entry) => {
          const existingEntry = acc.find((item) => item.request === entry.request);

          if (existingEntry) {
            existingEntry.pl += entry.pl;
          } else {
            acc.push({ request: entry.request, pl: entry.pl });
          }
        });

        return acc;
      }, []);

      console.log("Calculated Array : " + JSON.stringify(redc))
      console.log("Calculated Array for Back : " + JSON.stringify(redcBack))


      // Combine redcBack and redc to create the final calculated array
      const finalCalculatedArray = redcBack.map((entryBack) => {
        const entryLay = redc.find((entry) => entry.request === entryBack.request);

        if (entryLay) {
          entryBack.pl += entryLay.pl;
        }

        return entryBack;
      });

      console.log("Final Calculated Array : " + JSON.stringify(finalCalculatedArray));

      setFancyBookBtnArray(finalCalculatedArray)


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
//   const sendBet = async () => {

//     try {
//       const convertToIST = (dateString) => {
//         const date = new Date(dateString);
//         const ISTOffset = 330; // IST offset is UTC+5:30
//         const ISTTime = new Date(date.getTime() + (ISTOffset * 60000));
//         return ISTTime.toISOString().slice(0, 19).replace('T', ' '); // Format the date-time string
//       };

//       const matchedTime = convertToIST(new Date());
//       const response = await fetch('https://api.s2bet.in/saveBet', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           BetId: generateRandomAlphaNumeric(30),
//           SportId: parseInt(eid),
//           EventId: parseInt(gameId),
//           Event: eve,
//           MarketId: fileredMarketId[0],
//           Market: betType,
//           SelectionId: teamselectionId,
//           Selection: teamName,
//           OddsType: oddType,
//           Type: type,
//           OddsRequest: parseFloat(clickedType),
//           AmountStake: stakeValue,
//           BetType: 1,
//           IsSettlement: 2,
//           IsDelete: 0,
//           Status: true,
//           UserId: parseInt(userId),
//           ResultType: null,
//           ResultAmount: 0,
//           IpAddress: userIp,
//           IsMatched: true,
//           EventName: filteredMatch[0].eventName,
//           Profit: profitData,
//           Liability: lossData,
//           MatchedTime: matchedTime, // Convert to IST
//           settleTime: null,
//           PlaceTime: convertToIST(new Date()), // Convert to IST
//         }),
//       })


//       const result = await response.json();
//       console.log("Response is : " + JSON.stringify(result))
//       if (result.isSuccess === true) {
//         // Handle successful response
//         fetchBet();
//         console.log("Data Send of Bet Place");
//         const modalId = document.getElementById('openBetSlipM')
//         $(modalId).modal('hide');
//         $('#success').modal('show');
//         setTimeout(() => {
//           $('#success').modal('hide');
//           // setMatchDelaytime(null)
//         }, 2000);
//         window.location.reload();
//         setStakeValue(0)
//         // setMatchDelaytime(null)
//       } else {
//         // Handle error response
//         console.error('Error during Place Bet button Api:', result);
//         const modalId = document.getElementById('openBetSlipM')
//         $(modalId).modal('hide');
//         $('#error').modal('show');
//         $('#errormes').html('Bet Not Placed');
//         setTimeout(() => {
//           // setIsLoading(false); // Set loading state back to false after the timeout
//           $('#error').modal('hide');
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Error during Place Bet button Api:', error);
//       const modalId = document.getElementById('openBetSlipM')
//       $(modalId).modal('hide');
//       $('#error').modal('show');
//       $('#errormes').html('Bet Not Placed')
//       setTimeout(() => {
//         // setIsLoading(false); // Set loading state back to false after the timeout
//         $('#error').modal('hide');
//       }, 2000);
//     }
//   }

//   const handlePlaceBet = () => {


//     // console.log("min and max limit : " + minmaxStack[0].minOddLimit)

//     const date = new Date();
//     setMatchDelaytime(date)

//     let delay = betDelay
//     // const newTime = new Date().toISOString()

//     setIsLoading(true);

//     setTimeout(() => {
//       setIsLoading(false)

//       if (clickedTable == "OddsDiv") {

//         if (stakeValue > mainBlnc) {
//           console.log("Stake value exceed to your main balance, stake value : " + stakeValue)
//           const modalId = document.getElementById('openBetSlipM')
//           $(modalId).modal('hide');
//           $('#error').modal('show');
//           $('#errormes').html('Stake value exceed to your main balance')
//           setTimeout(() => {
//             $('#error').modal('hide');
//           }, 2000);
//         }
//         else if (stakeValue < minmaxStack[0].minOddLimit || stakeValue > minmaxStack[0].maxOddLimit) {

//           console.log('Enter Stake in your Odds limit')
//           const modalId = document.getElementById('openBetSlipM')
//           $(modalId).modal('hide');

//           $('#error').modal('show');
//           $('#errormes').html(`Enter Stake between ${minmaxStack[0].minOddLimit} to ${minmaxStack[0].maxOddLimit}`)
//           setTimeout(() => {
//             $('#error').modal('hide');
//           }, 2000);
//         }
//         else if (stakeValue > exposure) {
//           console.log('Stake is more than exposure ' + stakeValue + " " + exposure)

//           const modalId = document.getElementById('openBetSlipM')
//           $(modalId).modal('hide');
//           $('#error').modal('show');
//           $('#errormes').html('Maximum exposure limit : ' + exposure)
//           setTimeout(() => {
//             $('#error').modal('hide');
//           }, 2000);

//         } else {
//           console.log("Bet placed  in : " + clickedTable)
//           sendBet();

//           // let delay = betDelay;
//           // setIsLoading(true);

//           // const current = new Date()
//           // console.log("Current time is : " + current)

//           // setTimeout(() => {
//           //   // setIsLoading(false)
//           //   // const newTime = new Date().toISOString()
//           //   // setMatchDelaytime(newTime)
//           //   console.log("Delayed time : " + newTime)
//           //   sendBet();
//           // }, delay * 1000);

//         }
//       } else if (clickedTable == "bookmakerDiv") {

//         if (stakeValue > mainBlnc) {
//           console.log("Stake value exceed to your main balance, stake value : " + stakeValue)
//           const modalId = document.getElementById('openBetSlipM')
//           $(modalId).modal('hide');

//           $('#error').modal('show');
//           $('#errormes').html('Stake value exceed to your main balance')
//           setTimeout(() => {
//             $('#error').modal('hide');
//           }, 2000);
//         }

//         else if (stakeValue < minmaxStack[0].minBookmakerLimit || stakeValue > minmaxStack[0].maxBookmakerLimit) {

//           console.log('Enter Stake in your Bookmaker limit')
//           const modalId = document.getElementById('openBetSlipM')
//           $(modalId).modal('hide');

//           $('#error').modal('show');
//           $('#errormes').html(`Enter Stake between ${minmaxStack[0].minBookmakerLimit} to ${minmaxStack[0].maxBookmakerLimit}`)
//           setTimeout(() => {
//             $('#error').modal('hide');
//           }, 2000);

//         }
//         else if (stakeValue > exposure) {
//           console.log('Stake is more than exposure ' + stakeValue + " " + exposure)
//           const modalId = document.getElementById('openBetSlipM')
//           $(modalId).modal('hide');

//           $('#error').modal('show');
//           $('#errormes').html('Maximum exposure limit : ' + exposure)
//           setTimeout(() => {
//             $('#error').modal('hide');
//           }, 2000);

//         } else {
//           console.log("Bet placed in BookMaker Table" + clickedTable)
//           // Determine the delay based on the clickedTable

//           sendBet();
//           // let delay = betDelay;
//           // setIsLoading(true);

//           // const current = new Date()
//           // console.log("Current time is : " + current)

//           // setTimeout(() => {
//           //   setIsLoading(false)
//           //   const newTime = new Date()
//           //   setMatchDelaytime(newTime)
//           //   console.log("Delayed time : " + newTime)
//           //   sendBet();
//           // }, delay * 1000);


//         }

//       } else if (clickedTable == "fancyTableSHow") {

//         if (stakeValue > mainBlnc) {
//           console.log("Stake value exceed to your main balance, stake value : " + stakeValue)
//           const modalId = document.getElementById('openBetSlipM')
//           $(modalId).modal('hide');

//           $('#error').modal('show');
//           $('#errormes').html('Stake value exceed to your main balance')
//           setTimeout(() => {
//             $('#error').modal('hide');
//           }, 2000);
//         }

//         else if (stakeValue < minmaxStack[0].minFancyLimit || stakeValue > minmaxStack[0].maxFancyLimit) {

//           console.log('Enter Stake in your Fancy limit')
//           const modalId = document.getElementById('openBetSlipM')
//           $(modalId).modal('hide');

//           $('#error').modal('show');
//           $('#errormes').html(`Enter Stake between ${minmaxStack[0].minFancyLimit} to ${minmaxStack[0].maxFancyLimit}`)
//           setTimeout(() => {
//             $('#error').modal('hide');
//           }, 2000);

//         }
//         else if (stakeValue > exposure) {
//           console.log('Stake is more than exposure ' + stakeValue + " " + exposure)
//           const modalId = document.getElementById('openBetSlipM')
//           $(modalId).modal('hide');

//           $('#error').modal('show');
//           $('#errormes').html('Maximum exposure limit : ' + exposure)
//           setTimeout(() => {
//             $('#error').modal('hide');
//           }, 2000);

//         } else {
//           console.log("Bet placed in Fancy Table" + clickedTable)
//           // Determine the delay based on the clickedTable
//           sendBet();
//           // let delay = betDelay;
//           // setIsLoading(true);

//           // const current = new Date()
//           // console.log("Current time is : " + current)

//           // setTimeout(() => {
//           //   setIsLoading(false)
//           //   const newTime = new Date()
//           //   setMatchDelaytime(newTime)
//           //   console.log("Delayed time : " + newTime)
//           //   sendBet();
//           // }, delay * 1000);


//         }

//       }
//       // const newTime = new Date()
//       // setMatchDelaytime(newTime)
//       // console.log("Delayed time : " + newTime)
//     }, delay * 1000)


//   }



  const getStackLimit = async () => {
    try {
      const response = await fetch(`https://api.s2bet.in/GetStackLimit`);
      const result = await response.json();
      // console.log("Get Stack Limit api : " + JSON.stringify(result.data.userMatchSettings))

      if (Array.isArray(result.data.sports) &&
        Array.isArray(result.data.userMatchSettings)) {
        // const userStackData = [...result.data.sports, ...result.data.userMatchSettings]
        // console.log("Get Stack Limit api array : " + JSON.stringify(userStackData))
        const sportsData = [...result.data.sports];
        const userMatchData = [...result.data.userMatchSettings]

        // console.log("Get Stack Limit api array : " + JSON.stringify(userMatchData))
        setSportsStack(sportsData)
        setuserMatchStack(userMatchData)

        const filterGameId = userMatchData.filter((item => item.gameId == gameId))
        console.log("filter game id : " + filterGameId + " json " + JSON.stringify(filterGameId))

        const filterEid = sportsData.filter((item => item.id == eid))
        console.log("filter eid : " + JSON.stringify(filterEid[0].minOddLimit))
        console.log("filter eid : " + JSON.stringify(filterEid))
        setBetDelay(filterEid[0].betDelayTime)
        setBookMDelay(filterEid[0].bookmakerDelayTime)
        setFancyDelay(filterEid[0].fancyDelayTime)

        if (filterGameId.length !== 0) {
          setMinMaxStack(filterGameId);
        } else {
          setMinMaxStack(filterEid);
        }
        // setMinMaxStack(filterEid)

        // console.log('min max stack state : ' + minmaxStack[0].minOddLimit)
      }
    } catch (error) {
      console.error("Error in fetching GetStackLimit api", error)
    }

  }


  const fetchData = async () => {
    try {
      const response = await fetch('https://api.s2bet.in/GetInPlaySportEvents');
      const result = await response.json();

      console.log("Inplay api before combine : ", JSON.stringify(result))

      if (
        Array.isArray(result.data.sportsEventModelInPlay) &&
        Array.isArray(result.data.sportsEventModelToday) &&
        Array.isArray(result.data.sportsEventModelTomorrow)
      ) {
        // Combine the three arrays into a single array
        const combinedData = [
          ...result.data.sportsEventModelInPlay,
          ...(result.data.sportsEventModelToday.length > 0
            ? result.data.sportsEventModelToday
            : result.data.sportsEventModelTomorrow.length > 0
              ? result.data.sportsEventModelTomorrow
              : [])
        ];

        console.log('Event Comibinde data : ' + JSON.stringify(combinedData))

        const filteredData = combinedData.filter(item => item.gameId === gameId);
        console.log("gameId " + JSON.stringify(filteredData))
        const filteredEid = combinedData.filter(item => item.eid === eid);

        // Extracting eventName values from the filteredEid array
        const eventNameArray = filteredEid.map(item => item.eventName);
        const eventMarketId = filteredEid.map(item => item.marketId)

        console.log('Filtered Event Market: ', eventMarketId);
        console.log('Filtered Event Name: ', eventNameArray);


        // console.log('filter : ' + JSON.stringify(filteredData[0].eventName))

        setFilterMatch(filteredData)
        setfilterEventNames(eventNameArray)
        setfilterMarketId(eventMarketId)

        setData(combinedData);
      } else {
        console.error('Invalid data format of in play api of event page :', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const tableApi = async () => {
    try {
      const response = await axios.get(`/api/Data${gameId}.json`);
      const result = response.data; // Axios automatically parses JSON, no need for .json()

      console.log("Table api data:", result);

      if (Array.isArray(result.Odds)) {
        const firstOddsItem = result.Odds[0];

        if (Array.isArray(firstOddsItem.runners)) {
          const runnersData = firstOddsItem.runners;
          setOdds(runnersData);
        } else {
          console.error('No runners data available.');
        }
      } else {
        console.error('Invalid data format:', result);
      }

      if (Array.isArray(result.Bookmaker)) {
        console.log("BookMaker data:", JSON.stringify(result.Bookmaker));
        setBM(result.Bookmaker);
      } else {
        console.error('No Bookmaker data available.');
      }

      if (Array.isArray(result.Fancy)) {
        console.log("Fancy data:", JSON.stringify(result.Fancy));
        setFancy(result.Fancy);
      } else {
        console.error('No Fancy data available.');
      }
    } catch (error) {
      console.error('Error fetching Table API data:', error);
    }
  };

  function openTable() {
    var maindivbets = document.getElementById("maindivbets");
    var currentDisplayStyle = window.getComputedStyle(maindivbets).display;

    // Toggle between "block" and "none"
    maindivbets.style.display = (currentDisplayStyle === "none") ? "block" : "none";
  }

  function checkIframe() {
    var tvformobilediv = document.getElementsByClassName("tvformobilediv")[0];

    if (tvformobilediv) {
      var currentDisplayStyle = window.getComputedStyle(tvformobilediv).display;

      // Toggle between "block" and "none"
      tvformobilediv.style.display = currentDisplayStyle === "none" ? "block" : "none";
    }
  }

//   const openBetSlip = (team, odd, type, table, fancyyPrice, selectionId) => {
//     var betSlip = document.getElementById('placeBetSilp');
//     var betSlipInput = betSlip.querySelector('#ShowBetPrice'); // Replace 'betSlipInput' with the actual id of your input
//     var betTeam = document.getElementById('betTeamName')
//     var lossData = document.getElementById('LossData')
//     var stakeInput = document.getElementById('stakeValue');

//     const modalId = document.getElementById('openBetSlipM');

//     $(modalId).on('hidden.bs.modal', function () {
//       // Assuming setStakeValue is a state updater function
//       setStakeValue(0);
//       console.log("Modal hide ")
//     });

//     // var currentDisplayStyle = window.getComputedStyle(betSlip).display;
//     // betSlip.style.display = currentDisplayStyle === "none" ? "block" : "none";
//     // betSlip.style.display = "block"

//     // setTimeout(() => {
//     //   betSlip.style.display = "none"
//     // }, 5000)

//     // Set the input value


//     if (table == "bookmakerDiv") {
//       betSlipInput.value = odd / 100
//     } else {
//       betSlipInput.value = odd;
//     }
//     betTeam.innerHTML = team;
//     const convertNum = parseInt(fancyyPrice)
//     setType(type)
//     setClickedType(odd)
//     setClickedTable(table)
//     setFancyPrice(convertNum)
//     setBetTeamName(team)
//     setTeamSelectionId(selectionId)


//     console.log("clicked data is : " + JSON.stringify(odd))
//     console.log("clicked team is : " + JSON.stringify(team))
//     console.log("clicked type is : " + JSON.stringify(type))
//     console.log("clicked table is : " + table)
//     console.log("clicked Fancy Price is : " + parseInt(convertNum) + " " + typeof (convertNum))
//     console.log("clicked table is selection Id : " + selectionId)

//     // Set a new timeout to hide the bet slip after 5 seconds
//     // betSlipTimeout = setTimeout(() => {
//     //   betSlip.style.display = 'none';
//     // }, 5000);

//     // Scroll to the element with ID "placeBetSlip"
//     // const placeBetSlipElement = document.getElementById('placeBetSlip');
//     // if (placeBetSlipElement) {
//     //   placeBetSlipElement.scrollIntoView({ behavior: 'smooth' });
//     // }
//     // betSlip.scrollIntoView({ behavior: 'smooth' });
//   };


  const handleStakeChange = (event) => {
    const newStakeValue = parseFloat(event.target.value) || 0;
    setStakeValue(newStakeValue);
  };

  function handleToggleStyle(element) {
    if (element) {
      const anchorTag = document.querySelector('a');
      const isActive = document.getElementsByClassName('active');

      if (isActive) {
        anchorTag.style.background = '#83a95c !important';
        var maindivbets = document.getElementById("maindivbets");
        maindivbets.style.display = "block"
        // openTable();
      } else {
        anchorTag.style.background = '';
      }
    }
  }

//   const handleStakeButtonClick = (name) => {
//     // Extract the number from the name (e.g., "Name1" becomes "1")
//     const number = name.replace(/\D/g, '');

//     // Form the corresponding value key (e.g., "Value1")
//     const valueKey = `Value${number}`;

//     // Get the value from chipValues using the constructed value key
//     const correspondingValue = chipValues[valueKey];

//     // Select the stake input element by its ID
//     var stakeInput = document.getElementById('stakeValue');
//     stakeInput.value = correspondingValue;
//     setStakeValue(correspondingValue)

//     // Log the result
//     console.log(`Stake button clicked for ${name}. Corresponding value: ${correspondingValue}`);
//   };

  const handleClearStake = () => {
    // Handle logic for clearing stakes
    // Select the stake input element by its ID
    // var stakeInput = document.getElementById('stakeValue');
    // stakeInput.value = "";
    console.log('Clear button clicked');
    setStakeValue(0)
    setProfitData(0)
    setLossData(0)
  };

  const handleIncrement = () => {
    setStakeValue((prevStakeValue) => prevStakeValue + 100);
  };

  const handleDecrement = () => {
    setStakeValue((prevStakeValue) => Math.max(prevStakeValue - 100, 0));
  };

//   const handleClearAll = () => {
//     const modalId = document.getElementById('openBetSlipM')
//     $(modalId).modal('hide');
//     setStakeValue(0)
//     // var betSlip = document.getElementById('placeBetSilp');
//     // betSlip.style.display = "none";
//     setProfitData(0)
//     setLossData(0)
//     console.log('Clear All button clicked');
//   }


    return (

        <>
            <div className="container body">

                <Header />
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n      .namespan {\n        width: 80px ;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        vertical-align: middle;\n      }\n\n      #closedbetstable th {\n        border: 1px solid #000 ;\n      }\n\n      #closedbetstable td {\n        border: 1px solid #000 ;\n      }\n\n      .mod-header {\n        background: #000;\n        color: white;\n      }\n\n      .close_new {\n        color: white;\n      }\n\n      #UpdateChipsMsg {\n        text-align: center;\n        margin: 10px 10px 15px;\n      }\n\n      .errmsg {\n        text-align: center;\n        color: red;\n      }\n\n      .succmsg {\n        text-align: center;\n        color: green;\n      }\n\n      .col-md-12.col-sm-12.col-xs-12.form-title {\n        border-bottom: 2px solid;\n        margin: 0 10px 15px;\n        font-size: 18px;\n        color: #000;\n      }\n\n      .top-margin {\n        margin: 10px 0px 15px;\n      }\n\n      .matchTime {\n        text-align: right;\n      }\n\n      .table-striped>tbody>tr:nth-of-type(odd) {\n        background-color: none;\n        color: #151313; //\n        border-right: 1px solid #000;\n      }\n\n      .table-striped>tbody>tr:nth-of-type(even) {\n        background-color: none;\n        color: #151313; //\n        border-right: 2px solid #000;\n      }\n\n      .inplay_txt {\n        color: green;\n      }\n\n      .closedBox {\n        text-align: center;\n        color: #da881e;\n        font-size: 30px;\n        margin: 20px;\n      }\n\n      .overlay-table {\n        position: absolute;\n        z-index: 999999;\n        background: rgba(0, 0, 0, 0.7);\n        width: 100%;\n        height: 100%;\n      }\n\n      .overlay-table span {\n        width: 100%;\n        font-size: 18px;\n        text-align: center;\n        display: inline-block;\n        color: #fff;\n        padding-top: 7%;\n      }\n\n      div#liveCommentary {\n        float: left;\n        text-align: center;\n        padding: 0 1%;\n        color: green;\n        font-weight: bold;\n        border: 1px solid #ddd;\n        background: #ffffff;\n        width: auto;\n      }\n\n      .mod-header {\n        margin: 0px;\n        background: #232323;\n        color: #fff;\n        padding: 10px 5px;\n        border-bottom: transparent;\n      }\n\n      .close_new {\n        color: white;\n      }\n\n      #InfoUserMsg {\n        text-align: center;\n        margin: 10px 10px 15px;\n      }\n\n      .errmsg {\n        text-align: center;\n        color: red;\n      }\n\n      .succmsg {\n        text-align: center;\n        color: green;\n      }\n\n      .col-md-12.col-sm-12.col-xs-12.form-title {\n        border-bottom: 2px solid;\n        margin: 0 10px 15px;\n        font-size: 18px;\n        color: #000;\n      }\n\n      .top-margin {\n        margin: 10px 0px 15px;\n      }\n\n      .back-cell {\n        background-color: #b5e0ff;\n        padding: 1px;\n      }\n\n      .lay-cell {\n        background-color: #fbb7c5 ;\n        padding: 1px;\n      }\n\n      .inplay_txt {\n        color: green;\n      }\n\n      .fancyLia {\n        color: red\n      }\n\n      .mgh10 {\n        margin-top: 10px;\n      }\n\n      .right_col {\n        height: 100% ;\n      }\n\n      .betSlipBox {}\n\n      .close_new {\n        color: white;\n      }\n\n      #addUserMsg {\n        text-align: center;\n      }\n\n      .errmsg {\n        text-align: center;\n        color: red;\n      }\n\n      .succmsg {\n        text-align: center;\n        color: green;\n      }\n\n      .loderbox {\n        width: 100%;\n        background: #111;\n        /* position: relative; */\n        height: 100%;\n        opacity: 0.7;\n      }\n\n      .overlay_mobile_off {\n        position: fixed;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        z-index: 1040;\n        background-color: #000;\n        opacity: .5;\n      }\n\n      .matchScore {\n        width: 30%;\n        display: inline-block;\n      }\n\n      #tital_change {\n        float: left;\n        width: 43%;\n      }\n\n      .up {\n        transform: rotate(-135deg);\n        -webkit-transform: rotate(-135deg);\n      }\n\n      .down {\n        transform: rotate(45deg);\n        -webkit-transform: rotate(45deg);\n      }\n\n      .positive {\n        color: green ;\n      }\n\n      .negative {\n        color: #FF0000 ;\n      }\n\n\n      .rain {\n\n        -webkit-animation: glowing 1500ms infinite;\n        -moz-animation: glowing 1500ms infinite;\n        -o-animation: glowing 1500ms infinite;\n        animation: glowing 1500ms infinite;\n      }\n\n      @-webkit-keyframes glowing {\n        0% {\n          background-color: #B20000;\n          -webkit-box-shadow: 0 0 3px #B20000;\n        }\n\n        50% {\n          background-color: #FF0000;\n          -webkit-box-shadow: 0 0 40px #FF0000;\n        }\n\n        100% {\n          background-color: #B20000;\n          -webkit-box-shadow: 0 0 3px #B20000;\n        }\n      }\n\n      @-moz-keyframes glowing {\n        0% {\n          background-color: #B20000;\n          -moz-box-shadow: 0 0 3px #B20000;\n        }\n\n        50% {\n          background-color: #FF0000;\n          -moz-box-shadow: 0 0 40px #FF0000;\n        }\n\n        100% {\n          background-color: #B20000;\n          -moz-box-shadow: 0 0 3px #B20000;\n        }\n      }\n\n      @-o-keyframes glowing {\n        0% {\n          background-color: #B20000;\n          box-shadow: 0 0 3px #B20000;\n        }\n\n        50% {\n          background-color: #FF0000;\n          box-shadow: 0 0 40px #FF0000;\n        }\n\n        100% {\n          background-color: #B20000;\n          box-shadow: 0 0 3px #B20000;\n        }\n      }\n\n      @keyframes glowing {\n        0% {\n          background-color: #B20000;\n          box-shadow: 0 0 3px #B20000;\n        }\n\n        50% {\n          background-color: #FF0000;\n          box-shadow: 0 0 40px #FF0000;\n        }\n\n        100% {\n          background-color: #B20000;\n          box-shadow: 0 0 3px #B20000;\n        }\n      }\n\n      .bcolormob {\n        width: 28% ;\n      }\n\n      @media only screen and (max-width:768px) {\n        .bcolormob {\n          width: 39.5% ;\n        }\n      }\n\n      .score-main {\n        background: url(images/score-bg.png) no-repeat;\n        background-size: 100% 100%;\n        position: relative;\n        padding: 10px;\n        width: 100%;\n        float: left;\n        min-height: 120px;\n        position: relative;\n        color: #fff;\n      }\n\n      .score_team,\n      .score_area .runners-table {\n        width: 100%;\n        background: transparent url(../images/scoreboard_BG.gif) repeat;\n        background-color: #000;\n        background-image: linear-gradient(#2b2b2b 1px, transparent 0),\n          linear-gradient(90deg, #2b2b2b 1px, transparent 0);\n        background-size: 4px 4px, 4px 4px;\n        background-position: -2px -2px, -2px -2px;\n        float: left;\n        color: #fff;\n        padding: 10px;\n      }\n\n      .score-body {\n        background: rgba(0, 0, 0, 0.6);\n        height: 60px;\n        -webkit-transform: translateY(35%);\n        transform: translateY(35%);\n        display: flex;\n        height: 60px;\n        border-radius: 4px;\n        align-items: center;\n      }\n\n      .score_area.srt {\n        border: 1px solid #222224;\n      }\n\n      .ball-update {\n        position: absolute;\n        text-align: center;\n        left: 0;\n        right: 0;\n        margin: 0 auto;\n        bottom: -14px;\n        overflow: hidden;\n        width: 100%;\n      }\n\n      .ball-update ul {\n        display: flex;\n        margin: 0 auto;\n        display: inline-block;\n        padding: 0px;\n      }\n\n      .team-left {\n        float: left;\n        text-align: left;\n      }\n\n      .team-right {\n        float: right;\n        text-align: right;\n      }\n\n      .target_center {\n        text-align: center;\n        height: 85px;\n        background: rgb(50, 57, 22);\n        border-radius: 8px;\n        position: absolute;\n        left: 0;\n        right: 0;\n        margin: 0 auto;\n        width: 270px;\n        top: -23%;\n        text-transform: uppercase;\n      }\n\n      .team-box {\n        flex: 1;\n        color: #fff;\n        padding: 10px;\n        vertical-align: middle;\n        line-height: 25px;\n      }\n\n      .sc {\n        width: 45%;\n        display: inline-block;\n        text-align: center;\n      }\n\n      .current_set {\n        background: #303030;\n        color: #0c0;\n        width: 100%;\n        float: left;\n        text-align: center;\n        padding: 5px;\n        font-size: 15px;\n      }\n\n      @media (max-width : 767px) {\n        .team-box {\n          padding: 5px 5px;\n          height: 55px;\n          border-right: solid 1px #696969;\n          text-align: center;\n        }\n\n        .score_area {\n          padding: 0px 0px 1px;\n        }\n\n        .matchScore {\n          text-align: center;\n          float: left;\n          width: 100%;\n        }\n\n        .score-main {\n          padding: 0px;\n          min-height: 82px;\n          font-size: 11px;\n        }\n\n        .score-body {\n          transform: inherit;\n          -webkit-transform: inherit;\n          border-radius: 0px;\n        }\n\n        .target_center {\n          position: inherit;\n          background: transparent;\n          border-radius: 0px;\n        }\n\n        .ball-update {\n          background: rgba(0, 0, 0, 0.6);\n          bottom: 0px;\n          border-top: solid 1px #696969;\n        }\n\n        .score_area li {\n          margin: 5px 3px;\n        }\n      }\n\n      .back-cell {\n        background-color: #b5e0ff ;\n      }\n\n      .loader {\n        position: absolute;\n      }\n\n      .newpad {\n        padding: 10px 5px ;\n      }\n\n      .scrtrnsform {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-153%, -50%);\n        font-size: 28px;\n        color: #fff;\n      }\n\n      #goalstatus {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%) ;\n        font-size: 28px;\n        color: #fff;\n      }\n\n      .scrtrnsform1 {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(45%, -50%);\n        font-size: 28px;\n        color: #fff;\n      }\n\n      .tcenter {\n        text-align: left;\n      }\n\n      .padzero {\n        padding: 0;\n      }\n\n      @media only screen and (max-width: 700px) {\n        .tcenter {\n          text-align: center ;\n        }\n\n        .mrzero {\n          margin: 0px ;\n        }\n\n        .padzero {\n          padding: 0;\n        }\n\n        .imheight {\n          height: 107px ;\n        }\n      }\n\n      .soccerimg {\n        width: 20px;\n      }\n\n      .block_box_btn {\n        float: right;\n        width: 35%;\n      }\n\n      @media (max-width: 767px) {\n        .block_box_btn {\n          float: left;\n          width: 100% ;\n          top: 3px;\n          right: 0;\n          position: relative;\n        }\n\n        #tital_change {\n          width: 100% ;\n        }\n      }\n\n      #fancyresultshowarrow {\n        margin-right: 17px;\n      }\n\n      #matchName {\n        font-size: 11px;\n        margin: 3px;\n      }\n\n      .sportimg {\n        filter: invert(1);\n        width: 18px;\n      }\n\n      .score-main {\n        background: url(/images/score-bg.png)no-repeat;\n        background-size: 100% 100%;\n        position: relative;\n        padding: 0px;\n        width: 100%;\n        float: left;\n        min-height: 120px;\n        position: relative;\n        color: #fff;\n      }\n\n      .score_area li {\n        float: left;\n        list-style: none;\n        padding: 4px 6px;\n        margin: 6px 2px;\n      }\n\n      .ball_4 {\n        background-color: #2d90d4;\n        border: 1px solid #2d90d4;\n        border-radius: 50px;\n        color: white ;\n      }\n\n      .ball_1,\n      .ball_2,\n      .ball_3,\n      .ball_5 {\n        background-color: #48a23c;\n        border: 1px solid #48a23c;\n        border-radius: 50px;\n        color: #fff ;\n      }\n\n      @media (max-width: 767px) {\n        .score_area li {\n          margin: 2px 3px;\n        }\n\n        .item-score {\n          padding-left: 0px ;\n        }\n      }\n\n      .teamtype {\n        padding: 0;\n      }\n\n      .score-footer {\n        padding: 0;\n      }\n    "
                    }}
                />
                {/* page content */}
                <div className="right_col" role="main" style={{ minHeight: 599 }}>
                    {/* top tiles */}
                    <div className="tile_count">
                        <div
                            className="col-md-12 col-sm-12 col-xs-12"
                            id="UpCommingData"
                            style={{ display: "none" }}
                        />
                        <div
                            className="col-md-8 col-sm-12 col-xs-12"
                            id="MatchOddInfo"
                            style={{ padding: 0 }}
                        >
                            <div
                                className="fullrow col-md-12 col-sm-12 col-xs-12 matchBoxMain matchBox_29526625 matchBoxs_1163621754"
                                style={{}}
                            >
                                <div className="modal-dialog-staff">
                                    {/* dialog body */}
                                    <div className="modal-header mod-header" style={{}}>
                                        <div className="block_box">
                                            <span id="tital_change" style={{}}>
                                                {" "}
                                                <span id="fav29526625">
                                                    <i className="fas fa-star" aria-hidden="true" />
                                                </span>{" "}
                                                <span id="matchnameid">{filteredMatch.length > 0 && filteredMatch[0][0].eventName}</span>
                                            </span>
                                            {/* <div id="liveCommentary">Teen patti launched</div> */}
                                            <div className="block_box_btn" style={{ margin: "0px 5px" }}>
                                                <div
                                                    className="btn-group hidden-nav-xs"
                                                    style={{ float: "right" }}
                                                >
                                                    <button
                                                        style={{
                                                            backgroundColor: "#b351c7 ",
                                                            border: "none",
                                                            fontSize: 14
                                                        }}
                                                        type="button"
                                                        className="btn btn-sm btn-primary dropdown-toggle"
                                                        data-toggle="modal"
                                                        data-target="#listmatch"
                                                        onclick="getMyProfit()"
                                                    >
                                                        <i
                                                            className="fa fa-gear fa-spin"
                                                            style={{ fontSize: "14px " }}
                                                            aria-hidden="true"
                                                        />{" "}
                                                        Matches
                                                    </button>
                                                </div>
                                                <div className="dropdown" style={{ display: "inline" }}>
                                                    <button
                                                        style={{
                                                            fontSize: 14,
                                                            padding: 3,
                                                            border: "none",
                                                            background: "#12717c",
                                                            color: "#fff",
                                                            marginRight: "2%"
                                                        }}
                                                        className="btn btn-primary btn-xs"
                                                        type="button"
                                                        id="cheatBetButton"
                                                        disabled= {true}
                                                    >
                                                        <a style={{ color: "#fff" }} href="/cheatBunch/32982404">
                                                            Cheat Bets
                                                        </a>
                                                    </button>
                                                    <button
                                                        style={{
                                                            fontSize: 14,
                                                            padding: 3,
                                                            border: "none",
                                                            background:
                                                                "linear-gradient(to bottom, #76c7ce 0%, #12717c 100%)",
                                                            color: "#fff",
                                                            marginRight: "2%"
                                                        }}
                                                        className="btn btn-primary btn-xs"
                                                        type="button"
                                                        disabled= {true}
                                                    >
                                                        <a
                                                            href="/monitorUser"
                                                            style={{ color: "#fff " }}
                                                        >
                                                            Monitoring
                                                        </a>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="score_area">
                                        <iframe
                                            id="animscore"
                                            src="https://score1.365cric.com/#/score1/32982404"
                                            className="iframestyle"
                                            title="Match Score"
                                            style={{ display: "none" }}
                                        />
                                        <iframe
                                            id="cricketScore"
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                background: "url(/images/score-bg.png)no-repeat"
                                            }}
                                            className="iframestyle"
                                            title="Match Score"
                                            src="https://score.newbsf.com/#/score1/32982404?v=510938"
                                        />
                                    </div>
                                    <div className="score_area" style={{ display: "none" }}>
                                        <span className="matchScore" id=" ">
                                            <div className="score_area srt">
                                                <div className="mt" style={{ background: "#000" }}>
                                                    <div
                                                        className="col-md-4 col-xs-4 tms"
                                                        style={{
                                                            textAlign: "left",

                                                            borderRight: "none"
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                marginLeft: "1%",
                                                                color: "#8EEA29",
                                                                fontWeight: "bold"
                                                            }}
                                                            id="scorename"
                                                        />{" "}
                                                        <span style={{ color: "#8EEA29" }} id="scorehead" />
                                                    </div>
                                                    <div
                                                        className="col-md-4 col-xs-4 tms"
                                                        style={{
                                                            borderRight: "1px solid #c9c9c9",

                                                            padding: 0,
                                                            overflowY: "scroll",
                                                            borderLeft: "1px solid #c9c9c9"
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: "#fff",
                                                                fontWeight: "bold",
                                                                fontSize: 25
                                                            }}
                                                            id="statusball"
                                                        />
                                                    </div>
                                                    <div
                                                        className="col-md-4 col-xs-4 tms rrt"
                                                        style={{}}
                                                    >
                                                        <span
                                                            style={{ color: "#8EEA29", fontWeight: "bold" }}
                                                            id="target"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className="col-md-8 col-xs-8 tms"
                                                    style={{
                                                        display: "none",
                                                        height: 40,
                                                        backgroundImage:
                                                            "linear-gradient(-180deg, #315195 0%, #14213D 100%)"
                                                    }}
                                                >
                                                    <span style={{ color: "#fff" }} id="" />
                                                </div>
                                                <div
                                                    className="col-md-4 col-xs-4 tms rrt"
                                                    style={{
                                                        display: "none",
                                                        height: 40,
                                                        backgroundImage:
                                                            "linear-gradient(-180deg, #315195 0%, #14213D 100%)"
                                                    }}
                                                >
                                                    <span style={{ color: "#fff" }} id="" />
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="modal-body">
                                        <div
                                            className="matchClosedBox_1163621754"
                                            style={{ display: "none" }}
                                        >
                                            <div className="fullrow fullrownew">
                                                <div className="pre-text">
                                                    Match Odds <br />{" "}
                                                    <span className="match-colsed"> Closed</span>
                                                </div>
                                                <div className="matchTime" />
                                            </div>
                                            <div>
                                                <div className="closedBox">
                                                    <h1>Closed</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mainboxborder">
                                            <div className="match-odds-sec">
                                                <div
                                                    className="item match-status"
                                                    style={{
                                                        fontWeight: "bold",
                                                        textAlign: "left",
                                                        marginLeft: "1%",
                                                        color: "#000"
                                                    }}
                                                >
                                                    MATCHED -
                                                    <span style={{ fontWeight: "bold" }} id="tmval">
                                                        8161630.02
                                                    </span>
                                                </div>
                                                <div
                                                    className="item match-shedule"
                                                    id="demo_30183211"
                                                    style={{
                                                        padding: "5px 0px",
                                                        textAlign: "right",
                                                        marginRight: "1%"
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: "bold",
                                                            marginRight: "2%",
                                                            color: "blue"
                                                        }}
                                                        id="valumeText"
                                                    >
                                                        HIGH VOL.
                                                    </span>
                                                    <span>
                                                        <a
                                                            href="/announcementmgmt/1/10"
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <span style={{ color: "red", fontWeight: 700 }}>
                                                                <i
                                                                    className="fa fa-bullhorn"
                                                                    style={{ fontSize: 15, marginRight: "3%" }}
                                                                    aria-hidden="true"
                                                                />{" "}
                                                            </span>
                                                        </a>
                                                    </span>
                                                    <span className="click-tv" id="tvvv">
                                                        <img
                                                            style={{ float: "none" }}
                                                            className="tv-icons tvformobile"
                                                            onclick="checkIframe()"
                                                            src="/images/tv-screen.png"
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="col-lg-12 col-xs-12 tvformobilediv"
                                                style={{ display: "none", padding: 0 }}
                                            >
                                                <iframe
                                                    id="tvFrame"
                                                    style={{ width: "100%", height: 250 }}
                                                    src="https://ss247.life/api/97bef780da2b6a17ace2e366225eeb3b962fe743/Nstreamapi.php?chid=1034"
                                                />
                                            </div>
                                            <div
                                                className="fullrow MatchIndentB"
                                                style={{ position: "relative" }}
                                            >
                                                 {odds.length > 0 && (
                                                <table
                                                    id="OddsDiv"
                                                    className="table table-striped  bulk_actions matchTable1176776199"
                                                >
                                                    <tbody>
                                                        <tr className="headings mobile_heading">
                                                            <th className="fix_heading color_red" />
                                                            <th />
                                                            <th />
                                                            <th className="back_heading_color">Back</th>
                                                            <th className="lay_heading_color">Lay</th>
                                                            <th />
                                                            <th />
                                                        </tr>
                                                        {odds.map((item, index) => (
                                                        <tr
                                                            id="user_row0"
                                                            className="back_lay_color runner-row-36912034"
                                                            key={index} 
                                                        >
                                                            <td>
                                                                <p className="runner_text" id="runnderName0">
                                                                {item.name}
                                                                </p>{" "}
                                                                <span
                                                                    className="runner_amount"
                                                                    style={{ color: "rgb(60, 210, 71)" }}
                                                                    id="withBet448"
                                                                >
                                                                    36.00
                                                                </span>{" "}
                                                                <input
                                                                    type="hidden"
                                                                    className="position_1176776199"
                                                                    id="selection_0"
                                                                    data-id={36912034}
                                                                    defaultValue="-390349.92"
                                                                />
                                                            </td>
                                                            <td className="36912034_0availableToBack2_price_1176776199"></td>
                                                            <td className="36912034_0availableToBack1_price_1176776199"></td>
                                                            <td className="mark-back back-cell 36912034_0availableToBack0_price_1176776199 ">
                                                                <span id="team1back1448">{item.ex.availableToBack[0].price}</span>{" "}
                                                                <span id="team1backprice1448">{item.ex.availableToBack[0].size}</span>
                                                            </td>
                                                            {/*- availableToLay */}
                                                            <td className="mark-lay lay-cell 36912034_0availableToLay0_price_1176776199">
                                                                <span id="team1lay1448">{item.ex.availableToLay[0].price}</span>{" "}
                                                                <span id="team1layprice1448">{item.ex.availableToLay[0].size}</span>
                                                            </td>
                                                            <td className="36912034_0availableToLay1_price_1176776199"></td>
                                                            <td className="36912034_0availableToLay2_price_1176776199"></td>
                                                        </tr>
                                                         ))}
                                                    </tbody>
                                                </table>
                                                 )}
                                                <br />
                                                <table
                                                    className="table table-striped  bulk_actions matchTable1176776199"
                                                    id="bookmaker"
                                                >
                                                    <tbody>
                                                        <tr className="headings mobile_heading">
                                                            <th className="fix_heading color_red" />
                                                            <th />
                                                            <th />
                                                            <th className="back_heading_color">Back</th>
                                                            <th className="lay_heading_color">Lay</th>
                                                            <th />
                                                            <th />
                                                        </tr>
                                                        <tr
                                                            id="user_row0"
                                                            className="back_lay_color runner-row-36912034"
                                                        >
                                                            <td>
                                                                <p className="runner_text" id="runnderName0">
                                                                    New Zealand
                                                                </p>{" "}
                                                                <span
                                                                    className="runner_amount"
                                                                    style={{ color: "rgb(60, 210, 71)" }}
                                                                    id="bookMaker448"
                                                                >
                                                                    0.00
                                                                </span>{" "}
                                                                <input
                                                                    type="hidden"
                                                                    className="position_1176776199"
                                                                    id="selection_0"
                                                                    data-id={36912034}
                                                                    defaultValue="-390349.92"
                                                                />
                                                            </td>
                                                            <td className="36912034_0availableToBack2_price_1176776199"></td>
                                                            <td className="36912034_0availableToBack1_price_1176776199"></td>
                                                            <td className="mark-back back-cell 36912034_0availableToBack0_price_1176776199 ">
                                                                <span id="bookMakerback448">6.00</span>{" "}
                                                                <span id="bookMakerbackPrice448">50000.00</span>
                                                            </td>
                                                            {/*- availableToLay */}
                                                            <td className="mark-lay lay-cell 36912034_0availableToLay0_price_1176776199">
                                                                <span id="bookMakerlay448">7.00</span>{" "}
                                                                <span id="bookMakerlayPrice448">50000.00</span>
                                                            </td>
                                                            <td className="36912034_0availableToLay1_price_1176776199"></td>
                                                            <td className="36912034_0availableToLay2_price_1176776199"></td>
                                                        </tr>
                                                        {/*- TD FOR RUNNER VALUE ONE --*/}
                                                        <tr
                                                            id="user_row1"
                                                            className="back_lay_color runner-row-36846149"
                                                        >
                                                            <td>
                                                                <p className="runner_text" id="runnderName349">
                                                                    South Africa
                                                                </p>
                                                                <span
                                                                    className="runner_amount"
                                                                    style={{ color: "rgb(60, 210, 71)" }}
                                                                    id="bookMaker349"
                                                                >
                                                                    0.00
                                                                </span>
                                                                <input
                                                                    type="hidden"
                                                                    className="position_1176776199"
                                                                    id="selection_0"
                                                                    data-id={36846149}
                                                                    defaultValue="244244.56"
                                                                />
                                                            </td>
                                                            <td className="36846149_0availableToBack2_price_1176776199"></td>
                                                            <td className="36846149_0availableToBack1_price_1176776199"></td>
                                                            <td className="mark-back back-cell 36846149_0availableToBack0_price_1176776199">
                                                                <span id="bookMakerback349">0.00</span>{" "}
                                                                <span id="bookMakerbackPrice349">0.00</span>
                                                            </td>
                                                            {/*- availableToLay */}
                                                            <td className="mark-lay lay-cell 36846149_0availableToLay0_price_117677619">
                                                                <span id="bookMakerlay349">0.00</span>{" "}
                                                                <span id="bookMakerlayPrice349">0.00</span>
                                                            </td>
                                                            <td className="36846149_0availableToLay1_price_1176776199"></td>
                                                            <td className="36846149_0availableToLay2_price_1176776199"></td>
                                                        </tr>
                                                        <tr
                                                            id="user_row1"
                                                            className="back_lay_color runner-row-36846149"
                                                        >
                                                            <td>
                                                                <p className="runner_text" id="runnderName60443">
                                                                    The Draw
                                                                </p>
                                                                <span
                                                                    className="runner_amount"
                                                                    style={{ color: "rgb(60, 210, 71)" }}
                                                                    id="bookMaker60443"
                                                                >
                                                                    0.00
                                                                </span>
                                                                <input
                                                                    type="hidden"
                                                                    className="position_1176776199"
                                                                    id="selection_0"
                                                                    data-id={36846149}
                                                                    defaultValue="244244.56"
                                                                />
                                                            </td>
                                                            <td className="36846149_0availableToBack2_price_1176776199"></td>
                                                            <td className="36846149_0availableToBack1_price_1176776199"></td>
                                                            <td className="mark-back 36846149_0availableToBack0_price_1176776199 yello">
                                                                <span id="bookMakerback60443">0.00</span>{" "}
                                                                <span id="bookMakerbackPrice60443">0.00</span>
                                                            </td>
                                                            {/*- availableToLay */}
                                                            <td className="mark-lay 36846149_0availableToLay0_price_1176776199 yello">
                                                                <span id="bookMakerlay60443">0.00</span>{" "}
                                                                <span id="bookMakerlayPrice60443">0.00</span>
                                                            </td>
                                                            <td className="36846149_0availableToLay1_price_1176776199"></td>
                                                            <td className="36846149_0availableToLay2_price_1176776199"></td>
                                                        </tr>
                                                        {/*- TD FOR RUNNER VALUE ONE --*/}
                                                    </tbody>
                                                </table>
                                                <div
                                                    className="fullrow"
                                                    style={{ position: "relative" }}
                                                    id=""
                                                >
                                                    <table
                                                        className="table table-striped bulk_actions"
                                                        id="inner-fancy-toss"
                                                        style={{ marginTop: "1%" }}
                                                    ></table>
                                                </div>
                                            </div>
                                            <div
                                                className="fullrow fullrownew"
                                                style={{
                                                    display: "none",
                                                    background: "#000",
                                                    color: "#fff",
                                                    padding: 0,
                                                    fontWeight: 700
                                                }}
                                            >
                                                <div className="pre-text col-lg-7 col-xs-7">
                                                    <input
                                                        type="checkbox"
                                                        data-id={29526625}
                                                        className="hide inply  "
                                                    />
                                                    <div
                                                        className="col-lg-12 col-xs-12"
                                                        style={{
                                                            padding: 0,
                                                            textAlign: "left",
                                                            marginLeft: "1%",
                                                            height: 36
                                                        }}
                                                    >
                                                        <span id="tital_change" style={{ fontSize: 14 }}>
                                                            <i
                                                                onclick=""
                                                                className="fa fa-star-o"
                                                                aria-hidden="true"
                                                            />
                                                            Match Odds{" "}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="col-lg-5 col-xs-5"
                                                    style={{ padding: 0, height: 36 }}
                                                >
                                                    <button
                                                        className="btn btn-primary btn-xs"
                                                        style={{
                                                            height: 36,
                                                            borderRadius: 0,
                                                            width: "49.5%",
                                                            border: "1px solid #fff",
                                                            background: "#dc143c ",
                                                            color: "#fff",
                                                            marginRight: 0,
                                                            float: "right"
                                                        }}
                                                        id=""
                                                        onclick="openCheatUser()"
                                                    >
                                                        Cheat Bets
                                                    </button>
                                                    <button
                                                        className="btn btn-primary btn-xs"
                                                        style={{
                                                            height: 36,
                                                            width: "49.5%",
                                                            border: "1px solid #fff",
                                                            borderRadius: "inherit",
                                                            background: "#000 ",
                                                            color: "#fff",
                                                            marginRight: 0,
                                                            float: "right"
                                                        }}
                                                        id="userBook"
                                                        onclick="userBook()"
                                                    >
                                                        User Book
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className="fullrow"
                                                style={{ position: "relative", display: "none " }}
                                                id="inner-marke  tOdds"
                                            >
                                                <table
                                                    className="table table-striped bulk_actions"
                                                    id=" "
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <tbody>
                                                        <tr className="headings mobile_heading">
                                                            <td className="fix_heading color_red">
                                                                <span className="stakebb"></span>
                                                            </td>
                                                            <td
                                                                className="back_heading_color"
                                                                style={{ fontWeight: "bold" }}
                                                            >
                                                                LGAI
                                                            </td>
                                                            <td
                                                                className="lay_heading_color"
                                                                style={{ fontWeight: "bold" }}
                                                            >
                                                                KHAI
                                                            </td>
                                                        </tr>
                                                        <tr id="user_row " className="back_lay_color">
                                                            <td>
                                                                <p
                                                                    className="runner_text"
                                                                    id=""
                                                                    runner=""
                                                                    selectionid=""
                                                                >
                                                                    New Zealand
                                                                </p>
                                                                <span
                                                                    className="runner_amount"
                                                                    style={{
                                                                        color: "rgb(255, 99, 71)",
                                                                        fontSize: 12,
                                                                        fontWeight: "bold"
                                                                    }}
                                                                    id="withBet448"
                                                                />
                                                            </td>
                                                            <td
                                                                className="mark-back"
                                                                style={{ verticalAlign: "middle " }}
                                                            >
                                                                <span
                                                                    id="team1back1448"
                                                                    style={{ fontWeight: "bold", fontSize: 13 }}
                                                                />{" "}
                                                                <span id="team1backsize448" />
                                                            </td>
                                                            <td
                                                                className="mark-lay"
                                                                style={{ verticalAlign: "middle " }}
                                                            >
                                                                <span
                                                                    id="team1lay1448"
                                                                    style={{ fontWeight: "bold", fontSize: 13 }}
                                                                />{" "}
                                                                <span id="team1laysize448" />
                                                            </td>
                                                        </tr>
                                                        <tr id="user_row " className="back_lay_color">
                                                            <td>
                                                                <p
                                                                    className="runner_text"
                                                                    id=""
                                                                    runner=""
                                                                    selectionid=""
                                                                >
                                                                    South Africa
                                                                </p>
                                                                <span
                                                                    className="runner_amount"
                                                                    style={{
                                                                        color: "rgb(255, 99, 71)",
                                                                        fontSize: 12,
                                                                        fontWeight: "bold"
                                                                    }}
                                                                    id="withBet349"
                                                                />
                                                            </td>
                                                            <td
                                                                className="mark-back"
                                                                style={{ verticalAlign: "middle " }}
                                                            >
                                                                <span
                                                                    id="team1back1349"
                                                                    style={{ fontWeight: "bold", fontSize: 13 }}
                                                                />{" "}
                                                                <span id="team1backsize349" />
                                                            </td>
                                                            <td
                                                                className="mark-lay"
                                                                style={{ verticalAlign: "middle " }}
                                                            >
                                                                <span
                                                                    id="team1lay1349"
                                                                    style={{ fontWeight: "bold", fontSize: 13 }}
                                                                />{" "}
                                                                <span id="team1laysize349" />
                                                            </td>
                                                        </tr>
                                                        <tr id="user_row " className="back_lay_color">
                                                            <td>
                                                                <p
                                                                    className="runner_text"
                                                                    id=""
                                                                    runner=""
                                                                    selectionid=""
                                                                >
                                                                    The Draw
                                                                </p>
                                                                <span
                                                                    className="runner_amount"
                                                                    style={{
                                                                        color: "rgb(255, 99, 71)",
                                                                        fontSize: 12,
                                                                        fontWeight: "bold"
                                                                    }}
                                                                    id="withBet60443"
                                                                />
                                                            </td>
                                                            <td
                                                                className="mark-back"
                                                                style={{ verticalAlign: "middle " }}
                                                            >
                                                                <span
                                                                    id="team1back160443"
                                                                    style={{ fontWeight: "bold", fontSize: 13 }}
                                                                />{" "}
                                                                <span id="team1backsize60443" />
                                                            </td>
                                                            <td
                                                                className="mark-lay"
                                                                style={{ verticalAlign: "middle " }}
                                                            >
                                                                <span
                                                                    id="team1lay160443"
                                                                    style={{ fontWeight: "bold", fontSize: 13 }}
                                                                />{" "}
                                                                <span id="team1laysize60443" />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="match_score_box" style={{ display: "none" }}>
                                                <div className="modal-header mod-header">
                                                    <div className="block_box">
                                                        <span id="tital_change">
                                                            {" "}
                                                            <span id="matchnameid">
                                                                <i
                                                                    onclick=""
                                                                    className="fa fa-star-o"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                            New Zealand v South Africa
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="fullrow"
                                                style={{ position: "relative", display: "none " }}
                                                id="inner-marketO  ddsown"
                                            >
                                                <table
                                                    className="table table-striped bulk_actions"
                                                    id=" "
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <tbody>
                                                        <tr className="headings mobile_heading">
                                                            <td className="fix_heading color_red">
                                                                <span className="" style={{ fontSize: 11 }}>
                                                                    {" "}
                                                                    BOOKIE BHAV WITH / COMM.{" "}
                                                                </span>
                                                            </td>
                                                            <td
                                                                className="back_heading_color"
                                                                style={{ fontWeight: "bold" }}
                                                            >
                                                                LGAI
                                                            </td>
                                                            <td
                                                                className="lay_heading_color"
                                                                style={{ fontWeight: "bold" }}
                                                            >
                                                                KHAI
                                                            </td>
                                                        </tr>
                                                        <tr id="user_row " className="back_lay_color">
                                                            <td>
                                                                <p
                                                                    className="runner_text"
                                                                    id=""
                                                                    runner=""
                                                                    selectionid=""
                                                                >
                                                                    New Zealand
                                                                </p>
                                                                <span
                                                                    className="runner_amount"
                                                                    style={{
                                                                        color: "rgb(60, 210, 71)",
                                                                        fontSize: 12,
                                                                        fontWeight: "bold"
                                                                    }}
                                                                    id="withBetown448"
                                                                >
                                                                    36.00
                                                                </span>
                                                            </td>
                                                            <td
                                                                className="mark-back"
                                                                style={{ verticalAlign: "middle " }}
                                                            >
                                                                <span
                                                                    id="team1back1own448"
                                                                    style={{ fontWeight: "bold", fontSize: 13 }}
                                                                />
                                                            </td>
                                                            <td
                                                                className="mark-lay"
                                                                style={{ verticalAlign: "middle " }}
                                                            >
                                                                <span
                                                                    id="team1lay1own448"
                                                                    style={{ fontWeight: "bold", fontSize: 13 }}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr id="user_row " className="back_lay_color">
                                                            <td>
                                                                <p
                                                                    className="runner_text"
                                                                    id=""
                                                                    runner=""
                                                                    selectionid=""
                                                                >
                                                                    South Africa
                                                                </p>
                                                                <span
                                                                    className="runner_amount"
                                                                    style={{
                                                                        color: "rgb(255, 99, 71)",
                                                                        fontSize: 12,
                                                                        fontWeight: "bold"
                                                                    }}
                                                                    id="withBetown349"
                                                                >
                                                                    -90.00
                                                                </span>
                                                            </td>
                                                            <td
                                                                className="mark-back"
                                                                style={{ verticalAlign: "middle " }}
                                                            >
                                                                <span
                                                                    id="team1back1own349"
                                                                    style={{ fontWeight: "bold", fontSize: 13 }}
                                                                />
                                                            </td>
                                                            <td
                                                                className="mark-lay"
                                                                style={{ verticalAlign: "middle " }}
                                                            >
                                                                <span
                                                                    id="team1lay1own349"
                                                                    style={{ fontWeight: "bold", fontSize: 13 }}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr id="user_row " className="back_lay_color">
                                                            <td>
                                                                <p
                                                                    className="runner_text"
                                                                    id=""
                                                                    runner=""
                                                                    selectionid=""
                                                                >
                                                                    The Draw
                                                                </p>
                                                                <span
                                                                    className="runner_amount"
                                                                    style={{
                                                                        color: "rgb(255, 99, 71)",
                                                                        fontSize: 12,
                                                                        fontWeight: "bold"
                                                                    }}
                                                                    id="withBetown60443"
                                                                >
                                                                    -90.00
                                                                </span>
                                                            </td>
                                                            <td
                                                                className="mark-back"
                                                                style={{ verticalAlign: "middle " }}
                                                            >
                                                                <span
                                                                    id="team1back1own60443"
                                                                    style={{ fontWeight: "bold", fontSize: 13 }}
                                                                />
                                                            </td>
                                                            <td
                                                                className="mark-lay"
                                                                style={{ verticalAlign: "middle " }}
                                                            >
                                                                <span
                                                                    id="team1lay1own60443"
                                                                    style={{ fontWeight: "bold", fontSize: 13 }}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="match_score_box" style={{ display: "none" }}>
                                            <div className="modal-header mod-header">
                                                <div className="block_box">
                                                    <span id="tital_change">
                                                        {" "}
                                                        <span id="matchnameid">
                                                            <i
                                                                onclick=""
                                                                className="fa fa-star-o"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                        Fancy
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="fullrow margin_bottom fancybox  "
                                            id="inner-fancy_own"
                                            style={{

                                                border: "solid 1px #dbdbdb",
                                                marginTop: "1%"
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <style
                                dangerouslySetInnerHTML={{
                                    __html:
                                        "\n            button.btn.btn-primary.btn-xs.yellow1 {\n              background: yellow;\n              color: #000000;\n            }\n\n            .match_bets table tbody tr td {\n              padding: 5px 5px;\n            }\n\n            .wspace {\n              white-space: nowrap;\n            }\n          "
                                }}
                            />
                        </div>
                        <div className="modal fade" id="myModal" role="dialog">
                            <div className="modal-dialog">
                                {/* Modal content*/}
                                <div className="modal-content">
                                    <div
                                        className="modal-body"
                                        style={{
                                            height: 500,
                                            overflowY: "scroll",
                                            padding: "0 "
                                        }}
                                    >
                                        <table
                                            className="table common-table master-list-table"
                                            style={{
                                                marginBottom: 0,
                                                background: "#fff",
                                                height: 500,
                                                overflowY: "scroll"
                                            }}
                                            id="userTable"
                                        >
                                            <thead>
                                                <tr style={{ background: "#654062" }}>
                                                    <th style={{ color: "#fff" }}>Fancy Book</th>
                                                    <th />
                                                </tr>
                                                <tr style={{ background: "#654062" }}>
                                                    <th style={{ color: "#fff" }}>Rates</th>
                                                    <th style={{ color: "#fff" }}>P&amp;L</th>
                                                </tr>
                                            </thead>
                                            <tbody id="fancyBook" style={{ background: "#fff" }}></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*button style="float:right" class="btn btn-primary btn-xs" >Bets</button*/}
                        <div className="col-md-4 col-xs-12 matchBox">
                            <div className="betSlipBox" style={{}}>
                                <div>
                                    <div className="tab_bets">
                                        <ul
                                            className="nav nav-tabs nav-pills mb-3"
                                            id="pills-tab"
                                            role="tablist"
                                        >
                                            <li className="nav-item betdata active-all active" id="aabet">
                                                <a
                                                    data-toggle="tab"
                                                    href="#allbetss"
                                                    className="allbet"
                                                    id="allbet"
                                                >
                                                    {" "}
                                                    <span className="bet-label" style={{ color: "#fff" }}>
                                                        All Bet
                                                    </span>{" "}
                                                    <span>
                                                        (
                                                        <span id="matched-betsCount" style={{ color: "#fff" }}>
                                                            1
                                                        </span>
                                                        )
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="nav-item betdata" id="ffbet">
                                                <a data-toggle="tab" href="#fbets" className="unmatchbet">
                                                    {" "}
                                                    <span className="bet-label">Fancy Bet</span>{" "}
                                                    <span>
                                                        (<span id="fancy-betsCount">0</span>)
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="nav-item active-position" id="ccpos">
                                                <a
                                                    className="currentposition hidden-xs"
                                                    data-toggle="tab"
                                                    href="#cposition"
                                                >
                                                    Current Position
                                                </a>{" "}
                                                <a
                                                    className="currentposition hidden-lg hidden-md hidden-sm"
                                                    data-toggle="tab"
                                                    href="#cposition"
                                                >
                                                    Curr Pos
                                                </a>
                                            </li>
                                            <li
                                                className="nav-item active-position"
                                                style={{ float: "right", cursor: "pointer" }}
                                            >
                                                <a style={{ padding: "9px 5px" }} className="">
                                                    <i className="fa fa-refresh" aria-hidden="true" />
                                                </a>
                                            </li>
                                            <li
                                                className="nav-item active-position"
                                                style={{ float: "right", cursor: "pointer" }}
                                            >
                                                <a style={{ padding: "9px 5px" }} id="togdiv">
                                                    <span>
                                                        &nbsp;
                                                        <i className="fas fa-caret-down" aria-hidden="true" />
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*- Match UnMatch data -*/}
                            <div className="tab-content" id="">
                                <div className="border-box" id="accountView" role="main">
                                    <div className="fullrow">
                                        <div className="modal-dialog-staff">
                                            <div className="modal-content">
                                                <div className="modal-body" id="maindivbets" style={{}}>
                                                    <div
                                                        className="match_bets MachShowHide tab-pane fade in active"
                                                        id="allbetss"
                                                    >
                                                        <input
                                                            style={{ margin: 3, borderRadius: 5 }}
                                                            id="matchBetSearch"
                                                            type="search"
                                                            className="sr"
                                                            placeholder="Search Here..."
                                                            aria-controls="datatable"
                                                        />
                                                        <table className="table table-striped jambo_table bulk_action wspace auto-index">
                                                            <thead>
                                                                <tr className="headings">
                                                                    <th>No.</th>
                                                                    <th>Runner</th>
                                                                    <th>Client</th>
                                                                    <th>Odds</th>
                                                                    <th>Stack</th>
                                                                    <th style={{ width: "10%" }}>Bet Type</th>
                                                                    <th>Placed Time</th>
                                                                    <th style={{ width: "15%" }}>Matched Time</th>
                                                                    <th>T</th>
                                                                    <th>IP</th>
                                                                    <th>Master</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="match-bet">
                                                                <tr
                                                                    id="user_row_3993199"
                                                                    className="mark-lay content_user_table"
                                                                >
                                                                    <td className="mark-lay" />
                                                                    <td className="mark-lay">New Zealand</td>
                                                                    <td className="mark-lay">ravi6666</td>
                                                                    <td className="mark-lay">0.4</td>
                                                                    <td className="mark-lay">100</td>
                                                                    <td className="mark-lay">Lay</td>
                                                                    <td className="mark-lay">
                                                                        Sun Feb 04 09:35:06 IST 2024
                                                                    </td>
                                                                    <td className="mark-lay">
                                                                        Sun Feb 04 09:35:11 IST 2024
                                                                    </td>
                                                                    <td className="mark-lay">M</td>
                                                                    <td className="mark-lay">106.203.142.18</td>
                                                                    <td className="mark-lay">std@30</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div
                                                        className="match_bets MachShowHide tab-pane fade"
                                                        id="fbets"
                                                    >
                                                        <input
                                                            style={{ margin: 3, borderRadius: 5 }}
                                                            id="fancyBetSearch"
                                                            type="search"
                                                            className="sr"
                                                            placeholder="Search Here..."
                                                            aria-controls="datatable"
                                                        />
                                                        <table className="table table-striped jambo_table bulk_action wspace auto-index">
                                                            <thead>
                                                                <tr className="headings">
                                                                    <th>No.</th>
                                                                    <th>Runner</th>
                                                                    <th style={{ width: "10%" }}>Bet Type</th>
                                                                    <th>Client</th>
                                                                    <th>Odds</th>
                                                                    <th>Stack</th>
                                                                    <th style={{ width: "15%" }}>Placed Time</th>
                                                                    <th style={{ width: "15%" }}>Matched Time</th>
                                                                    <th>IP</th>
                                                                    <th>Master</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="fancy-bet"></tbody>
                                                        </table>
                                                    </div>
                                                    <div
                                                        className="match_bets MachShowHide tab-pane fade"
                                                        id="cposition"
                                                    >
                                                        <div className="pull-right">
                                                            <a onclick="openParentPosition()">Back</a>
                                                        </div>
                                                        <table
                                                            className="table table-striped jambo_table bulk_action"
                                                            style={{ width: "100%" }}
                                                        >
                                                            <thead>
                                                                <tr className="headings">
                                                                    <th>Account</th>
                                                                    <th>New Zealand</th>
                                                                    <th>South Africa</th>
                                                                    <th>The Draw</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="userProitList">
                                                                <tr id="" className="mark-lay content_user_table">
                                                                    <td>
                                                                        <a
                                                                            style={{ fontWeight: 700, marginLeft: 5 }}
                                                                            href="javascript:;"
                                                                            onclick="Userpnlhtml('std@30')"
                                                                        >
                                                                            std@30
                                                                        </a>
                                                                    </td>
                                                                    <td className="cell-selection-1">
                                                                        <span style={{ marginLeft: 5 }} className="red">
                                                                            0.00
                                                                        </span>
                                                                    </td>
                                                                    <td className="cell-selection-1">
                                                                        <span style={{ marginLeft: 5 }} className="red">
                                                                            0.00
                                                                        </span>
                                                                    </td>
                                                                    <td className="cell-selection-1">
                                                                        <span style={{ marginLeft: 5 }} className="red">
                                                                            0.00
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr id="" className="mark-lay content_user_table">
                                                                    <td onclick="showMyCurrentPos()">
                                                                        <a style={{ fontWeight: 700, marginLeft: 5 }}>
                                                                            Own
                                                                        </a>
                                                                    </td>
                                                                    <td className="cell-selection-1">
                                                                        <span style={{ marginLeft: 5 }} className="green">
                                                                            36.00
                                                                        </span>
                                                                    </td>
                                                                    <td className="cell-selection-1">
                                                                        <span style={{ marginLeft: 5 }} className="red">
                                                                            -90.00
                                                                        </span>
                                                                    </td>
                                                                    <td className="cell-selection-1">
                                                                        <span style={{ marginLeft: 5 }} className="red">
                                                                            -90.00
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr id="" className="mark-lay content_user_table">
                                                                    <td>
                                                                        <a style={{ fontWeight: 700, marginLeft: 5 }}>
                                                                            Parent
                                                                        </a>
                                                                    </td>
                                                                    <td className="cell-selection-1">
                                                                        <span style={{ marginLeft: 5 }} className="green">
                                                                            4.00
                                                                        </span>
                                                                    </td>
                                                                    <td className="cell-selection-1">
                                                                        <span style={{ marginLeft: 5 }} className="red">
                                                                            -10.00
                                                                        </span>
                                                                    </td>
                                                                    <td className="cell-selection-1">
                                                                        <span style={{ marginLeft: 5 }} className="red">
                                                                            -10.00
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr id="" className="mark-lay content_user_table">
                                                                    <td>
                                                                        <a style={{ fontWeight: 700, marginLeft: 5 }}>
                                                                            Total
                                                                        </a>
                                                                    </td>
                                                                    <td className="cell-selection-1">
                                                                        <span style={{ marginLeft: 5 }} className="green">
                                                                            40.00
                                                                        </span>
                                                                    </td>
                                                                    <td className="cell-selection-1">
                                                                        <span style={{ marginLeft: 5 }} className="red">
                                                                            -100.00
                                                                        </span>
                                                                    </td>
                                                                    <td className="cell-selection-1">
                                                                        <span style={{ marginLeft: 5 }} className="red">
                                                                            -100.00
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="panel-heading bhead tab_bets"
                                        style={{ padding: "6px 15px" }}
                                    >
                                        <span style={{ color: "#fff" }} className="bal-tittle">
                                            Fancy Result
                                        </span>
                                        <a
                                            style={{ float: "right", color: "#fff" }}
                                            id="fancyresultshowarrow"
                                        >
                                            <i
                                                className="fa fa-caret-down"
                                                style={{ fontSize: 20 }}
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </div>
                                    <div
                                        className="table-responsive"
                                        id="fancyresultdiv"
                                        style={{
                                            marginTop: "1%",
                                            width: "100%",
                                            height: 380,
                                            overflowY: "scroll"
                                        }}
                                    >
                                        <table
                                            className="table table-striped jambo_table bulk_action no-footer dataTable"
                                            style={{
                                                margin: "0 ",
                                                background: "#fff",
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            <thead>
                                                <tr className="headings">
                                                    <th className="darkpurplecolor">S.No.</th>
                                                    <th className="lightgreencolor">Event Name</th>
                                                    <th className="lightgreencolor">ID</th>
                                                    <th className="darkpurplecolor">Market</th>
                                                    <th className="lightgreencolor">P_L</th>
                                                    <th className="darkpurplecolor">Commission</th>
                                                    <th className="lightgreencolor">Created On</th>
                                                    <th className="darkpurplecolor">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody id="betlistdiv">
                                                <tr>
                                                    <td>1</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-583.FY</td>
                                                    <td>38 over run NZ 2</td>
                                                    <td className="checkColor red">-450.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 10:40:31</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c1bf474c06135f43dfa71e/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-582.FY</td>
                                                    <td>37 over run NZ 2</td>
                                                    <td className="checkColor green">1800.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 10:40:20</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c1bf3c4c06135f43dfa6cd/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-581.FY</td>
                                                    <td>36 over run NZ 2</td>
                                                    <td className="checkColor green">900.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 10:40:04</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c1bf2c4c06135f43dfa697/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-578.FY</td>
                                                    <td>33 over run NZ 2</td>
                                                    <td className="checkColor green">180.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 10:19:50</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c1ba6e4c06135f43df9c1b/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-577.FY</td>
                                                    <td>32 over run NZ 2</td>
                                                    <td className="checkColor red">-180.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 10:19:43</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c1ba674c06135f43df9bcf/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-576.FY</td>
                                                    <td>31 over run NZ 2</td>
                                                    <td className="checkColor green">900.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 10:09:44</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c1b8104c06135f43df9484/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-565.FY</td>
                                                    <td>30 over run NZ 2</td>
                                                    <td className="checkColor red">-1800.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 10:09:30</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c1b8024c06135f43df93cc/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>8</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-518.FY</td>
                                                    <td>Fall of 2nd wkt NZ 2</td>
                                                    <td className="checkColor red">-2430.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 10:00:28</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c1b5e44c06135f43df8e63/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>9</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-503.FY</td>
                                                    <td>10 over run NZ 2</td>
                                                    <td className="checkColor red">-90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 08:13:53</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c19ce94c06135f43df6065/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>10</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-507.FY</td>
                                                    <td>Only 6 over run NZ 2</td>
                                                    <td className="checkColor green">90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 07:53:57</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c1983d4c06135f43df5c5e/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>11</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-498.FY</td>
                                                    <td>5 over run NZ 2</td>
                                                    <td className="checkColor green">90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 07:53:08</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c1980c4c06135f43df5bbd/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>12</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-512.FY</td>
                                                    <td>Fall of 1st wkt NZ 2</td>
                                                    <td className="checkColor green">720.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 07:48:21</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c196ed4c06135f43df5acc/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>13</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-504.FY</td>
                                                    <td>Only 3 over run NZ 2</td>
                                                    <td className="checkColor red">-90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 07:37:13</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c194514c06135f43df5932/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>14</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-396.FY</td>
                                                    <td>1st Innings run SA</td>
                                                    <td className="checkColor red">-900.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 07:13:24</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c18ebc4c06135f43df54d7/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>15</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-459.FY</td>
                                                    <td>55 over run SA</td>
                                                    <td className="checkColor red">-585.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 05:35:57</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c177e54c06135f43df4a40/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>16</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-377.FY</td>
                                                    <td>Fall of 7th wkt SA</td>
                                                    <td className="checkColor red">-504.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 05:18:17</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c173c14c06135f43df4903/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>17</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-435.FY</td>
                                                    <td>41 over run SA</td>
                                                    <td className="checkColor green">450.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 04:36:24</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c169f04c06135f43df4524/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>18</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-375.FY</td>
                                                    <td>Fall of 5th wkt SA</td>
                                                    <td className="checkColor red">-720.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-06 03:54:54</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c160364c06135f43df40e2/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>19</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-359.FY</td>
                                                    <td>20 over run SA</td>
                                                    <td className="checkColor green">0.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 10:35:04</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c06c804c06135f43de0472/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>20</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-353.FY</td>
                                                    <td>Only 17 over run SA</td>
                                                    <td className="checkColor green">90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 10:15:28</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c067e84c06135f43ddfc31/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>21</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-358.FY</td>
                                                    <td>15 over run SA</td>
                                                    <td className="checkColor red">-450.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 10:07:54</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c066224c06135f43ddf999/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>22</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-351.FY</td>
                                                    <td>Only 15 over run SA</td>
                                                    <td className="checkColor red">-450.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 10:07:49</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c0661d4c06135f43ddf966/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>23</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-347.FY</td>
                                                    <td>Only 11 over run SA</td>
                                                    <td className="checkColor red">-90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 09:50:15</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c061fe4c06135f43ddf13f/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>24</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-296.FY</td>
                                                    <td>125 over run NZ</td>
                                                    <td className="checkColor red">-90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 07:19:38</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c03eb14c06135f43ddcfeb/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>25</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-252.FY</td>
                                                    <td>115 over run NZ</td>
                                                    <td className="checkColor green">540.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 07:13:53</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c03d594c06135f43ddcd0f/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>26</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-260.FY</td>
                                                    <td>113 over run NZ</td>
                                                    <td className="checkColor green">90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 05:36:01</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c026694c06135f43ddc828/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>27</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-251.FY</td>
                                                    <td>110 over run NZ</td>
                                                    <td className="checkColor red">-450.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 05:34:57</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c026294c06135f43ddc7bc/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>28</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-266.FY</td>
                                                    <td>Only 106 over run NZ</td>
                                                    <td className="checkColor green">90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 05:12:31</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c020e74c06135f43ddc712/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>29</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-223.FY</td>
                                                    <td>105 over run NZ</td>
                                                    <td className="checkColor red">-180.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 05:12:21</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c020dd4c06135f43ddc6db/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>30</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-232.FY</td>
                                                    <td>101 over run NZ</td>
                                                    <td className="checkColor green">90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 05:11:09</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c020954c06135f43ddc6c5/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>31</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-222.FY</td>
                                                    <td>100 over run NZ</td>
                                                    <td className="checkColor red">-450.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 04:35:27</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c018374c06135f43ddc619/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>32</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-243.FY</td>
                                                    <td>Only 98 over run NZ</td>
                                                    <td className="checkColor green">180.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 04:34:25</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c017f94c06135f43ddc602/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>33</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-229.FY</td>
                                                    <td>97 over run NZ</td>
                                                    <td className="checkColor green">180.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 04:34:15</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c017ef4c06135f43ddc5f2/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>34</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-220.FY</td>
                                                    <td>90 over run NZ</td>
                                                    <td className="checkColor green">90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-05 04:29:12</td>
                                                    <td>
                                                        <a href="/showBetsCR/65c016c04c06135f43ddc319/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>35</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-211.FY</td>
                                                    <td>81 over run NZ</td>
                                                    <td className="checkColor green">90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 10:38:58</td>
                                                    <td>
                                                        <a href="/showBetsCR/65bf1bea4c06135f43dad118/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>36</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-195.FY</td>
                                                    <td>75 over run NZ</td>
                                                    <td className="checkColor green">90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 10:11:47</td>
                                                    <td>
                                                        <a href="/showBetsCR/65bf158b4c06135f43dabed0/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>37</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-190.FY</td>
                                                    <td>70 over run NZ</td>
                                                    <td className="checkColor red">-180.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 09:45:20</td>
                                                    <td>
                                                        <a href="/showBetsCR/65bf0f584c06135f43daac27/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>38</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-131.FY</td>
                                                    <td>Only 51 over run NZ</td>
                                                    <td className="checkColor green">90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 08:18:42</td>
                                                    <td>
                                                        <a href="/showBetsCR/65befb0a4c06135f43da87d7/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>39</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-150.FY</td>
                                                    <td>50 over run NZ</td>
                                                    <td className="checkColor green">540.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 08:18:32</td>
                                                    <td>
                                                        <a href="/showBetsCR/65befb004c06135f43da8681/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>40</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-128.FY</td>
                                                    <td>Only 48 over run NZ</td>
                                                    <td className="checkColor red">-90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 07:57:32</td>
                                                    <td>
                                                        <a href="/showBetsCR/65bef6144c06135f43da830b/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>41</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-126.FY</td>
                                                    <td>Only 46 over run NZ</td>
                                                    <td className="checkColor red">-90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 07:49:56</td>
                                                    <td>
                                                        <a href="/showBetsCR/65bef44c4c06135f43da8158/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>42</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-145.FY</td>
                                                    <td>45 over run NZ</td>
                                                    <td className="checkColor red">-477.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 07:42:43</td>
                                                    <td>
                                                        <a href="/showBetsCR/65bef29b4c06135f43da7f34/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>43</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-123.FY</td>
                                                    <td>Only 43 over run NZ</td>
                                                    <td className="checkColor red">-90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 07:34:08</td>
                                                    <td>
                                                        <a href="/showBetsCR/65bef0984c06135f43da7daf/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>44</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-122.FY</td>
                                                    <td>Only 42 over run NZ</td>
                                                    <td className="checkColor green">180.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 07:31:29</td>
                                                    <td>
                                                        <a href="/showBetsCR/65beeff94c06135f43da7cff/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>45</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-120.FY</td>
                                                    <td>40 over run NZ</td>
                                                    <td className="checkColor red">-1080.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 07:24:22</td>
                                                    <td>
                                                        <a href="/showBetsCR/65beee4e4c06135f43da7ae9/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>46</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-98.FY</td>
                                                    <td>Only 38 over run NZ</td>
                                                    <td className="checkColor red">-450.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 07:10:48</td>
                                                    <td>
                                                        <a href="/showBetsCR/65beeb204c06135f43da7894/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>47</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-115.FY</td>
                                                    <td>35 over run NZ</td>
                                                    <td className="checkColor red">-630.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 06:57:17</td>
                                                    <td>
                                                        <a href="/showBetsCR/65bee7f54c06135f43da7649/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>48</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-95.FY</td>
                                                    <td>Only 35 over run NZ</td>
                                                    <td className="checkColor red">-450.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 06:57:11</td>
                                                    <td>
                                                        <a href="/showBetsCR/65bee7ef4c06135f43da7637/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>49</td>
                                                    <td>New Zealand v South Africa</td>
                                                    <td>32982404-110.FY</td>
                                                    <td>30 over run NZ</td>
                                                    <td className="checkColor green">90.00</td>
                                                    <td>0</td>
                                                    <td>2024-02-04 06:38:42</td>
                                                    <td>
                                                        <a href="/showBetsCR/65bee39a4c06135f43da736c/1/10/manis12">
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr style={{ background: "#e4e4e4", color: "red" }}>
                                                    <td colSpan={4} style={{ textAlign: "center" }}>
                                                        Total
                                                    </td>
                                                    <td className="checkColor red">-5886.00</td>
                                                    <td />
                                                    <td />
                                                    <td />
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/*- User Current Position  -*/}
                        </div>
                        <style
                            dangerouslySetInnerHTML={{
                                __html:
                                    "\n          .mod-header {\n            background: #654062;\n            color: white;\n          }\n\n          .close_new {\n            color: white;\n          }\n\n          #InfoUserMsg {\n            text-align: center;\n            margin: 10px 10px 15px;\n          }\n\n          .errmsg {\n            text-align: center;\n            color: red;\n          }\n\n          .succmsg {\n            text-align: center;\n            color: green;\n          }\n\n          .col-md-12.col-sm-12.col-xs-12.form-title {\n            border-bottom: 2px solid;\n            margin: 0 10px 15px;\n            font-size: 18px;\n            color: #000;\n          }\n\n          .top-margin {\n            margin: 10px 0px 15px;\n          }\n\n          .mark-back:hover {\n            background: #4cebdc ;\n          }\n\n          .mark-lay:hover {\n            background: #c6f6f2 ;\n          }\n\n          .mark-back {\n            background: #cdf9ff;\n          }\n\n          .mark-lay {\n            background: #FCA4B7;\n          }\n\n          .content_user_table {\n            color: #000;\n          }\n\n          #delete_all_match {\n            vertical-align: super;\n            display: inline-block;\n            width: 43%;\n          }\n\n          .MatchBetHide {\n            display: inline;\n          }\n\n          #tital_change a {\n            color: white ;\n          }\n\n          .fcolor tr:nth-child(even) {\n            background-color: #e8e8e8 ;\n            color: #000;\n          }\n\n          .fcolor tr:nth-child(odd) {\n            background-color: #fff ;\n            color: #000;\n          }\n        "
                            }}
                        />
                        {/*- Chips Setting */}
                        {/* add player popup start */}
                    </div>
                </div>
                <div
                    id="listmatch"
                    className="modal fade"
                    role="dialog"
                    style={{ top: "11%", display: "none" }}
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        {/* Modal content*/}
                        <div className="modal-content">
                            <div className="modal-header" style={{ background: "#b351c7" }}>
                                <button
                                    style={{ color: "#fff", opacity: 1 }}
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                >
                                    x
                                </button>
                            </div>
                            <div className="modal-body" style={{ padding: 0 }}>
                                <div
                                    className="table-responsive"
                                    style={{ textAlign: "center", margin: 0 }}
                                    id="matchlistdiv"
                                >
                                    <table
                                        className="table table-bordered common-table"
                                        style={{ marginBottom: 0 }}
                                    >
                                        <tbody id="matchListBody">
                                            {filteredEventNames.map((eventName, index) => (

                                                <tr key={index} style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/4/32994370/32994370"
                                                            >
                                                                {eventName}
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className="pull-right" />
                    <div className="clearfix" />
                </footer>
            </div>
            <Footer />

        </>


    )
}

export default CuttingExpo