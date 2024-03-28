import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import Moment from 'moment-timezone';

function MatchDetailList() {


    const userId = Cookies.get('id');
    const userName = Cookies.get('userName');
    const eventIdParams = useParams()
    console.log("Params event Id : " + JSON.stringify(eventIdParams.eventId))

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [calculateResultAmount, setCalculateResultAmount] = useState(0);




    useEffect(() => {
        fetchMatched();
    }, [userId]);




    const fetchMatched = async () => {
        setIsLoading(true)
        try {
            const fetched = await fetch(`https://api.s2bet.in/usersChild/${userId}`);
            const response = await fetched.json();
            // console.log("Get userChild matches data: " + JSON.stringify(response.Alldata));
            // setAllData(response.Alldata)
            // console.log("Get userChild Account Statement matches data: " + JSON.stringify(response.AccStatement));

            if (Array.isArray(response.AccStatement) && Array.isArray(response.Alldata)) {


                // Use a Map to keep track of unique eventNames
                // Use a Map to keep track of unique eventIds
                const uniqueEventId = new Map();
                const eventIdToResultAmount = new Map(); // To store EventId to corresponding ResultAmount

                // Iterate through data and populate uniqueEventId and eventIdToResultAmount
                response.Alldata.forEach(item => {
                    if (item.Market === "Match Odds") {
                        const eventId = item.EventId;
                        if (!uniqueEventId.has(eventId)) {
                            uniqueEventId.set(eventId, true);
                            eventIdToResultAmount.set(eventId, item.ResultAmount);
                        } else {
                            // If eventId already exists, add up the ResultAmount
                            eventIdToResultAmount.set(eventId, eventIdToResultAmount.get(eventId) + item.ResultAmount);
                        }
                    }
                });

                // Set ResultAmount for each unique EventId to corresponding matches
                const filteredData = response.Alldata.reduce((filtered, item) => {
                    if (item.Market === "Match Odds" && uniqueEventId.get(item.EventId)) {
                        // Set the ResultAmount
                        item.ResultAmount = eventIdToResultAmount.get(item.EventId);
                        // Remove the EventId from uniqueEventId to prevent duplicates
                        uniqueEventId.delete(item.EventId);
                        filtered.push(item);
                    }
                    return filtered;
                }, []);

                // console.log("Filtered unique Data  : " + JSON.stringify(filteredData))
                // console.log("Filtered unique Data length  : " + JSON.stringify(filteredData.length))



                // Unique Data for BookMaker


                // Use a Map to keep track of unique eventIds for BookMaker market
                const uniqueBookMakerEventId = new Map();
                const bookMakerEventIdToResultAmount = new Map(); // To store EventId to corresponding ResultAmount for BookMaker market

                // Iterate through data and populate uniqueBookMakerEventId and bookMakerEventIdToResultAmount
                response.Alldata.forEach(item => {
                    if (item.Market === "BookMaker") {
                        const eventId = item.EventId;
                        if (!uniqueBookMakerEventId.has(eventId)) {
                            uniqueBookMakerEventId.set(eventId, true);
                            bookMakerEventIdToResultAmount.set(eventId, item.ResultAmount);
                        } else {
                            // If eventId already exists, add up the ResultAmount
                            bookMakerEventIdToResultAmount.set(eventId, bookMakerEventIdToResultAmount.get(eventId) + item.ResultAmount);
                        }
                    }
                });

                // Set ResultAmount for each unique EventId to corresponding matches in BookMaker market
                const filteredBookMakerData = response.Alldata.reduce((filtered, item) => {
                    if (item.Market === "BookMaker" && uniqueBookMakerEventId.get(item.EventId)) {
                        // Set the ResultAmount
                        item.ResultAmount = bookMakerEventIdToResultAmount.get(item.EventId);
                        // Remove the EventId from uniqueBookMakerEventId to prevent duplicates
                        uniqueBookMakerEventId.delete(item.EventId);
                        filtered.push(item);
                    }
                    return filtered;
                }, []);

                // console.log("Filtered unique BookMaker Data: " + JSON.stringify(filteredBookMakerData))
                // console.log("Filtered unique BookMaker Data length: " + JSON.stringify(filteredBookMakerData.length))


                // Unique Data for Fancy


                const beforFilterFancy = response.Alldata.filter(item => item.Market == "Fancy");

                // console.log("before filter fancy length : " + beforFilterFancy.length)

                // Use a Map to keep track of unique eventIds for Fancy market
                const uniqueFancyEventId = new Map();
                const fancyEventIdToResultAmount = new Map(); // To store EventId to corresponding ResultAmount for Fancy market

                // Iterate through data and populate uniqueFancyEventId and fancyEventIdToResultAmount
                response.Alldata.forEach(item => {
                    if (item.Market === "Fancy") {
                        const eventId = item.EventId;
                        const selectionId = item.SelectionId; // Also check for SelectionId
                        const key = `${eventId}_${selectionId}`; // Create a unique key combining EventId and SelectionId

                        if (!uniqueFancyEventId.has(key)) {
                            uniqueFancyEventId.set(key, true);
                            fancyEventIdToResultAmount.set(key, item.ResultAmount);
                        } else {
                            // If key already exists, add up the ResultAmount
                            fancyEventIdToResultAmount.set(key, fancyEventIdToResultAmount.get(key) + item.ResultAmount);
                        }
                    }
                });

                // Set ResultAmount for each unique EventId and SelectionId pair to corresponding matches in Fancy market
                const filteredFancyData = response.Alldata.reduce((filtered, item) => {
                    if (item.Market === "Fancy") {
                        const eventId = item.EventId;
                        const selectionId = item.SelectionId;
                        const key = `${eventId}_${selectionId}`;

                        if (uniqueFancyEventId.get(key)) {
                            // Set the ResultAmount
                            item.ResultAmount = fancyEventIdToResultAmount.get(key);
                            // Remove the key from uniqueFancyEventId to prevent duplicates
                            uniqueFancyEventId.delete(key);
                            filtered.push(item);
                        }
                    }
                    return filtered;
                }, []);

                // console.log("Filtered unique Fancy Data: ", filteredFancyData);
                // console.log("Filtered unique Fancy Data length: ", filteredFancyData.length);






                // Combine filteredData and filteredBookMakerData into a single array
                const combinedFilteredUniqueData = filteredData.concat(filteredBookMakerData, filteredFancyData);

                // console.log("Combined filtered Data: " + JSON.stringify(combinedFilteredUniqueData));
                // console.log("Combined filtered Data length: " + combinedFilteredUniqueData.length);

                const filterByParamsEventId = combinedFilteredUniqueData.filter(item => item.EventId == eventIdParams.eventId)

                console.log("Params event id filtered data : " + JSON.stringify(filterByParamsEventId))
                console.log("Params event id filtered data length: " + filterByParamsEventId.length)


                // Calculate the total ResultAmount for the filtered matches with the same EventId and Market
                const marketResultAmounts = {};
                const marketMatches = {};

                filterByParamsEventId.forEach(item => {
                    if (!marketMatches[item.Market]) {
                        marketMatches[item.Market] = [];
                    }
                    marketMatches[item.Market].push(item);

                    if (item.Market === 'Fancy') {
                        if (!marketResultAmounts[item.Market]) {
                            marketResultAmounts[item.Market] = {};
                        }
                        if (!marketResultAmounts[item.Market][item.SelectionId]) {
                            marketResultAmounts[item.Market][item.SelectionId] = 0;
                        }
                        marketResultAmounts[item.Market][item.SelectionId] += item.ResultAmount;
                    } else {
                        if (!marketResultAmounts[item.Market]) {
                            marketResultAmounts[item.Market] = 0;
                        }
                        marketResultAmounts[item.Market] += item.ResultAmount;
                    }
                });

                // Show all unique SelectionId matches of Market "Fancy" with their calculated ResultAmount
                const uniqueMarketMatches = {};
                for (const market in marketMatches) {
                    if (marketMatches.hasOwnProperty(market)) {
                        if (market === 'Fancy') {
                            uniqueMarketMatches[market] = [];
                            for (const selectionId in marketResultAmounts[market]) {
                                if (marketResultAmounts[market].hasOwnProperty(selectionId)) {
                                    const match = marketMatches[market].find(item => item.SelectionId === selectionId);
                                    if (match) {
                                        match.ResultAmount = marketResultAmounts[market][selectionId];
                                        uniqueMarketMatches[market].push(match);
                                    }
                                }
                            }
                        } else {
                            uniqueMarketMatches[market] = marketMatches[market][0];
                            uniqueMarketMatches[market].ResultAmount = marketResultAmounts[market];
                        }
                    }
                }

                console.log("All unique SelectionId matches of Market Fancy with their calculated ResultAmount:");
                console.log(uniqueMarketMatches);



                // Check if uniqueMarketMatches['Match Odds'] is an array
                const matchOddsArray = uniqueMarketMatches['Match Odds'] ? [uniqueMarketMatches['Match Odds']] : [];
                console.log("Mathcoddss: ", matchOddsArray);

                // Check if uniqueMarketMatches['Fancy'] is an array
                const FancyArray = uniqueMarketMatches.Fancy ? [uniqueMarketMatches.Fancy] : [];
                console.log("FancyArray: ", FancyArray);

                // Check if uniqueMarketMatches['BookMaker'] is an array
                const BookMakerArray = uniqueMarketMatches.BookMaker ? [uniqueMarketMatches.BookMaker] : [];
                console.log("BookMakerArray: ", BookMakerArray);

                // console.log("Mathcoddss: " + matchOddsArray)

                // Combine the arrays
                if (FancyArray.length > 0) {
                    const newArr = [...FancyArray[0], ...matchOddsArray, ...BookMakerArray];

                    console.log("Combined Array:", newArr);

                    setData(newArr)

                    // Initialize total ResultAmount
                    let totalResultAmount = 0;

                    // Iterate through each object in newArr
                    newArr.forEach(item => {
                        // Add ResultAmount of each object to the totalResultAmount
                        totalResultAmount += item.ResultAmount || 0; // Use 0 if ResultAmount is undefined or null
                    });

                    // Output the total ResultAmount
                    console.log("Total ResultAmount:", totalResultAmount);
                    setCalculateResultAmount(totalResultAmount)
                } else {

                    const newArr = [...FancyArray, ...matchOddsArray, ...BookMakerArray];

                    console.log("Combined Array:", newArr);

                    setData(newArr)

                    // Initialize total ResultAmount
                    let totalResultAmount = 0;

                    // Iterate through each object in newArr
                    newArr.forEach(item => {
                        // Add ResultAmount of each object to the totalResultAmount
                        totalResultAmount += item.ResultAmount || 0; // Use 0 if ResultAmount is undefined or null
                    });

                    // Output the total ResultAmount
                    console.log("Total ResultAmount:", totalResultAmount);
                    setCalculateResultAmount(totalResultAmount)
                }

            }

        } catch (err) {
            console.error("Error in fetching Userschild Api: " + err);
        } finally {
            // Set loading state back to false after the request is completed
            setIsLoading(false);
        }
    }


    const handleShowBets = (eid, marketNumber, marketSId) => {

        console.log("Event Id : " + eid + " MarketNumber : " + marketNumber + " marketSId : " + marketSId)
        navigate(`/ShowBetCr/${eid}/${marketNumber}/${marketSId}`)
    }








    return (
        <>
            {isLoading && <div className="spinner" id="loader-1" style={{ display: 'block' }}></div>}


            {/* <div className="nav-md"> */}
            <div className="container body">
                <Header />
                {/* page content */}
                <div
                    className="right_col main_container"
                    role="main"
                    style={{ minHeight: 599 }}
                >
                    <div id="page-wrapper">
                        <div className="container">
                            <section id="content">
                                <section className="vbox">
                                    <section className="">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="title_new_at">
                                                    Match Details{" "}
                                                    <button
                                                        style={{ float: "right" }}
                                                        onclick="javascript:history.go(-1)"
                                                        backbutton=""
                                                        className="btn btn-xs btn-primary"
                                                    >
                                                        Back
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <div id="divLoading" />
                                                <div className="table-scroll table-responsive">
                                                    <div
                                                        id="DataTables_Table_23_wrapper"
                                                        className="dataTables_wrapper no-footer"
                                                    >
                                                        <div
                                                            id="DataTables_Table_23_filter"
                                                            className="dataTables_filter"
                                                        >
                                                            <label>
                                                                Search:
                                                                <input
                                                                    type="search"
                                                                    className=""
                                                                    placeholder=""
                                                                    aria-controls="DataTables_Table_23"
                                                                />
                                                            </label>
                                                        </div>
                                                        <table
                                                            datatable=""
                                                            className="table table-striped jambo_table bulk_action no-footer dataTable"
                                                            id="DataTables_Table_23"
                                                            role="grid"
                                                            aria-describedby="DataTables_Table_23_info"
                                                            style={{}}
                                                        >
                                                            <thead>
                                                                <tr className="headings" role="row">
                                                                    <th
                                                                        className="sorting_asc"
                                                                        tabIndex={0}
                                                                        aria-controls="DataTables_Table_23"
                                                                        rowSpan={1}
                                                                        colSpan={1}
                                                                        aria-label="S.No. : activate to sort column descending"
                                                                        style={{ width: 102 }}
                                                                        aria-sort="ascending"
                                                                    >
                                                                        S.No.
                                                                    </th>
                                                                    <th
                                                                        className="sorting"
                                                                        tabIndex={0}
                                                                        aria-controls="DataTables_Table_23"
                                                                        rowSpan={1}
                                                                        colSpan={1}
                                                                        aria-label="Event Name : activate to sort column ascending"
                                                                        style={{ width: 216 }}
                                                                    >
                                                                        Event Name
                                                                    </th>
                                                                    <th
                                                                        className="sorting"
                                                                        tabIndex={0}
                                                                        aria-controls="DataTables_Table_23"
                                                                        rowSpan={1}
                                                                        colSpan={1}
                                                                        aria-label="Market : activate to sort column ascending"
                                                                        style={{ width: 138 }}
                                                                    >
                                                                        Market
                                                                    </th>
                                                                    <th
                                                                        className="sorting"
                                                                        tabIndex={0}
                                                                        aria-controls="DataTables_Table_23"
                                                                        rowSpan={1}
                                                                        colSpan={1}
                                                                        aria-label="P_L : activate to sort column ascending"
                                                                        style={{ width: 76 }}
                                                                    >
                                                                        P_L
                                                                    </th>
                                                                    <th
                                                                        className="sorting"
                                                                        tabIndex={0}
                                                                        aria-controls="DataTables_Table_23"
                                                                        rowSpan={1}
                                                                        colSpan={1}
                                                                        aria-label="Comm : activate to sort column ascending"
                                                                        style={{ width: 122 }}
                                                                    >
                                                                        Comm
                                                                    </th>
                                                                    <th
                                                                        className="sorting"
                                                                        tabIndex={0}
                                                                        aria-controls="DataTables_Table_23"
                                                                        rowSpan={1}
                                                                        colSpan={1}
                                                                        aria-label="Comm : activate to sort column ascending"
                                                                        style={{ width: 122 }}
                                                                    >
                                                                        Total
                                                                    </th>
                                                                    <th
                                                                        className="sorting"
                                                                        tabIndex={0}
                                                                        aria-controls="DataTables_Table_23"
                                                                        rowSpan={1}
                                                                        colSpan={1}
                                                                        aria-label="Comm : activate to sort column ascending"
                                                                        style={{ width: 122 }}
                                                                    >
                                                                        Result
                                                                    </th>
                                                                    <th
                                                                        className="sorting"
                                                                        tabIndex={0}
                                                                        aria-controls="DataTables_Table_23"
                                                                        rowSpan={1}
                                                                        colSpan={1}
                                                                        aria-label="Date : activate to sort column ascending"
                                                                        style={{ width: 90 }}
                                                                    >
                                                                        Date
                                                                    </th>
                                                                    <th
                                                                        className="sorting"
                                                                        tabIndex={0}
                                                                        aria-controls="DataTables_Table_23"
                                                                        rowSpan={1}
                                                                        colSpan={1}
                                                                        aria-label="Action : activate to sort column ascending"
                                                                        style={{ width: 126 }}
                                                                    >
                                                                        Action
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="betlistdiv">
                                                                {data.map((item, index) => (
                                                                    <tr key={item.id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{item.EventName}</td>
                                                                        <td>{item.Market == "Fancy" ? item.Event : item.Market}</td>
                                                                        {/* <td className="checkColor green">{item.ResultAmount}</td> */}
                                                                        <td className={item.ResultAmount > 0 ? "checkColor red" : item.ResultAmount <= 0 ? "checkColor green" : ""}>
                                                                            {item.ResultAmount > 0 ? "-" + Math.abs(item.ResultAmount) : Math.abs(item.ResultAmount)}
                                                                        </td>

                                                                        <td>0</td>
                                                                        <td className={item.ResultAmount > 0 ? "checkColor red" : item.ResultAmount <= 0 ? "checkColor green" : ""}>
                                                                            {item.ResultAmount > 0 ? "-" + Math.abs(item.ResultAmount) : Math.abs(item.ResultAmount)}
                                                                        </td>                                                                            <td>{item.Result}</td>
                                                                        <td>{Moment(new Date(item.SettleTime)).format('YYYY-MM-DD hh:mm:ss')}</td>
                                                                        <td>
                                                                            <a onClick={(e) => { e.preventDefault(); handleShowBets(item.EventId, item.Market === "Match Odds" ? 1 : item.Market === "BookMaker" ? 2 : 3, item.Market === "Fancy" ? item.SelectionId : 0) }}>
                                                                                Show Bets
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                ))}

                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td colSpan={3}>Total Pnl</td>
                                                                    {/* <td colSpan={1} id="total" className="red">
                                                                           {calculateResultAmount}
                                                                        </td> */}

                                                                    <td colSpan={1} id="total" className={calculateResultAmount > 0 ? "red" : calculateResultAmount <= 0 ? "green" : ""}>
                                                                        {calculateResultAmount > 0 ? "-" + Math.abs(calculateResultAmount) : Math.abs(calculateResultAmount)}
                                                                    </td>
                                                                    <td colSpan={1} className="" id="totalCom">
                                                                        0
                                                                    </td>
                                                                    <td colSpan={3} id="grandtotal" className={calculateResultAmount > 0 ? "red" : calculateResultAmount <= 0 ? "green" : ""}>
                                                                        {calculateResultAmount > 0 ? "-" + Math.abs(calculateResultAmount) : Math.abs(calculateResultAmount)}
                                                                    </td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </section>
                            </section>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className="pull-right" />
                    <div className="clearfix" />
                </footer>
            </div>
            <Footer />
            {/* </div> */}


        </>

    )
}

export default MatchDetailList