import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { json, useParams } from 'react-router-dom';
import Moment from 'moment'
import Cookies from 'js-cookie';

function Ledger() {

    const LoggedInUserId = Cookies.get('id')
    const { userId } = useParams();



    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    const [accData, setAccData] = useState([]);

    const [alldata, setAllData] = useState([]);
    const [fromDate, setFromDate] = useState(getDefaultFromDate());
    const [toDate, setToDate] = useState(getDefaultToDate());
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClicked, setFilterClicked] = useState(false);
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        fetchMatched();
    }, [])


    useEffect(() => {

        if (filterClicked) {
            // fetchMyBalanceApi();
            filterBetUsers()
            setFilterClicked(false); // Reset the filterClicked state
        }
    }, [filterClicked]);







    const fetchMatched = async () => {

        setIsLoading(true)
        try {
            const fetched = await fetch(`https://api.s2bet.in/usersChild/${userId}`);

            const response = await fetched.json();

            console.log("Get userChild matches data: " + JSON.stringify(response.Alldata));

            const fetchSettlementUser = await fetch(`https://api.s2bet.in/getSettlement/${LoggedInUserId}`)

            const Ressetttlement = await fetchSettlementUser.json();

            console.log("Get settlement data: " + JSON.stringify(Ressetttlement.data));

            const filterSettle = Ressetttlement.data
                .filter(item => item.ChildId == userId)
                .map(item => ({
                    ...item,
                    Amount: item.SettlementType === "Liya Hai" ? item.Amount * (-1) : item.Amount
                }));

            console.log("Filter settlement data by child Id : ", filterSettle)

            // setAllData(response.Alldata)
            // console.log("Get userChild Account Statement matches data: " + JSON.stringify(response.AccStatement));

            if (Array.isArray(response.AccStatement) && Array.isArray(response.Alldata)) {

                // console.log("Get userChild Account Statement matches data: " + JSON.stringify(response.AccStatement[0]));
                // console.log("Response data before filter unique : " + response.Alldata.length)



                // Unique data for Match Odds 


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
                console.log("Filtered unique Data length  : " + JSON.stringify(filteredData.length))



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
                console.log("Filtered unique BookMaker Data length: " + JSON.stringify(filteredBookMakerData.length))


                // Unique Data for Fancy


                const beforFilterFancy = response.Alldata.filter(item => item.Market == "Fancy");

                console.log("before filter fancy length : " + beforFilterFancy.length)

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
                console.log("Filtered unique Fancy Data length: ", filteredFancyData.length);


                // Combine filteredData and filteredBookMakerData into a single array
                const combinedFilteredUniqueData = filteredData.concat(filteredBookMakerData, filteredFancyData);

                // console.log("Combined filtered Data: " + JSON.stringify(combinedFilteredUniqueData));
                // console.log("Combined filtered Data length: " + combinedFilteredUniqueData.length);

                // setAllData(combinedFilteredUniqueData)

                const mergedData = [...response.AccStatement[0].map(item => ({ ...item, source: 'accountstatement' })), ...combinedFilteredUniqueData.map(item => ({ ...item, source: 'bets', balance: '' })),];

                // Sort the data by the ISO date string
                mergedData.sort((a, b) => new Date(b.Date || b.SettleTime) - new Date(a.Date || a.SettleTime));

                // setCombinedData(mergedData);
                // setData(mergedData);

                // const accountStatementData = mergedData.filter(item => item.source === 'accountstatement');
                // // (item.Date || item.SettleTime)
                //  setAccData(accountStatementData)

                const betsData = mergedData.filter(item => item.source === 'bets');

                // console.log("Filter account statement data : " + JSON.stringify(accountStatementData))


                // let runningBalance = 0;
                // for (let i = betsData.length - 1; i >= 0; i--) {
                //     runningBalance += betsData[i].ResultAmount;
                //     betsData[i].balance = runningBalance * (-1);
                // }

                // setAllData(betsData)

                console.log("bets data : " + JSON.stringify(betsData));
                console.log("bets data length: " + betsData.length);

                const settlementMerge = [...betsData, ...filterSettle]

                settlementMerge.sort((a, b) => new Date(b.SettledDate || b.SettleTime) - new Date(a.SettledDate || a.SettleTime));

                console.log("Mergerd Settlement data : ", JSON.stringify(settlementMerge))
                console.log("Merge Settlement and bets length : ", settlementMerge.length)

                let runningBalance = 0;

                for (let i = settlementMerge.length - 1; i >= 0; i--) {
                    const currentAmount = settlementMerge[i].ResultAmount !== undefined ? settlementMerge[i].ResultAmount * (-1) : settlementMerge[i].Amount || 0;
                    runningBalance += currentAmount;
                    settlementMerge[i].balance = runningBalance;
                }

                const filteredDataByDate = settlementMerge.filter(item =>

                    new Date(item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                    new Date(item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
                );

                setAllData(settlementMerge)
                setFilteredData(filteredDataByDate)

                // console.log("Merged AccountStatement and bets data length: " + mergedData.length);


            }
        } catch (err) {
            console.error("Error in fetching Userschild Api: " + err);
        } finally {
            // Set loading state back to false after the request is completed
            setIsLoading(false);
        }
    }

    const filterBetUsers = () => {

        if (alldata.length > 0 && Array.isArray(alldata)) {

            console.log("All state data after clicks on filter ", alldata)

            const filteredData = alldata.filter(item =>

                new Date(item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                new Date(item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
            );

            console.log("From Date : " + fromDate)
            console.log("To Date : " + toDate)
            // Sort the data by the ISO date string
            filteredData.sort((a, b) => new Date(b.SettleTime || b.SettledDate) - new Date(a.SettleTime || a.SettledDate));
            console.log("Formatted and Sorted Bet History data:", filteredData);
            // // Sort the data by the ISO date string
            // formattedData.sort((a, b) => new Date(a.result.data.placeTime) - new Date(b.result.data.placeTime));

            // console.log("Formatted and Sorted Bet History data:", formattedData);
            console.log('filtered data length : ', filteredData.length)

            // setUser(formattedUserName)
            setAllData(filteredData);
            setFilteredData(filteredData)


        } else {
            console.error('Invalid data format:', alldata);
        }
    }


    function getDefaultFromDate() {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 30);
        console.log("Default From Date : " + twoDaysAgo)
        return twoDaysAgo.toISOString().split('T')[0];
    }

    function getDefaultToDate() {
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Set the time to 23:59:59.999
        console.log("Today date : " + today)
        return today.toISOString().split('T')[0];
    }


    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };


    const handleFilter = () => {
        // fetchMyBalanceApi(); // Trigger refetching with the updated filter criteria
        // fetchMatched()
        filterBetUsers()
        setFilterClicked(true);
    };







    return (
        <>

            {isLoading && <div className="spinner" id="loader-1" style={{ display: 'block' }}></div>}

            {/* <div className="nav-md"> */}
            <div className="container body">
                <Header />


                {/* page content */}
                <div className="right_col" role="main" style={{ minHeight: 599 }}>
                    <div className="loader" style={{ display: "none" }} />
                    <div className="">
                        <div className="col-md-12">
                            <div className="title_new_at">
                                Account Statement
                                <div className="pull-right">
                                    <button className="btn_common" onclick="javascript:history.go(-1)">
                                        Back
                                    </button>{" "}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12"></div>
                        <div className="col-md-12">
                            <div
                                className="filter_page  data-background"
                                style={{ paddingLeft: 0 }}
                            >
                                {/*  <form method="post" id="formSubmit" style="color:#000;"><input type="hidden" name="compute" value=""> */}
                                <div className="col-md-12 custom-check">
                                    <input
                                        type="hidden"
                                        name="user_id"
                                        id="user_id"
                                        defaultValue={36452}
                                    />
                                    <input
                                        type="hidden"
                                        name="ajaxUrl"
                                        id="ajaxUrl"
                                        defaultValue="CacStatement"
                                    />
                                </div>
                                <div className="block_2" style={{ paddingLeft: 0 }}>
                                    <input
                                        type="date"
                                        name="fdate"
                                        id="fdate"
                                        defaultValue=""
                                        className="form-control"
                                        placeholder="From Date"
                                        autoComplete="off"
                                        onChange={handleFromDateChange}
                                        value={fromDate}
                                    />
                                </div>
                                <div className="block_2">
                                    <input
                                        type="date"
                                        name="tdate"
                                        id="tdate"
                                        defaultValue=""
                                        className="form-control"
                                        placeholder="To Date"
                                        autoComplete="off"
                                        onChange={handleToDateChange}
                                        value={toDate}
                                    />
                                </div>
                                {/* <div className="block_2">
                                        <input
                                            type="search"
                                            name="searchTerm"
                                            id="searchTerm"
                                            className="form-control"
                                            placeholder="Search"
                                            autoComplete="off"
                                        />
                                    </div> */}
                                <div className="block_2 buttonacount">
                                    <button
                                        type="button"
                                        name="submit"
                                        id="submit_form_button"
                                        onClick={handleFilter}
                                        className="blue_button"
                                        data-attr="submit"

                                    >
                                        Filter
                                    </button>
                                    {/* <a  class="red_button">Clear</a> */}
                                </div>
                                {/* </form> */}
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div id="divLoading"> </div>
                            {/*Loading class */}
                            <div className="custom-scroll table-responsive" id="filterdata">
                                <table
                                    className="table table-bordered table-dark table_new_design"
                                    id="datatablesss"
                                >
                                    <thead>
                                        <tr className="headings">
                                            <th className="darkpurplecolor">S.No.</th>
                                            <th className="lightgreencolor">Date</th>
                                            <th className="darkpurplecolor">Description</th>
                                            <th className="lightgreencolor rrig text-right">Credit</th>
                                            <th className="darkpurplecolor rrig text-right">Debit</th>
                                            <th className="lightgreencolor rrig text-right">Balance</th>
                                            <th className="darkpurplecolor rrig text-right">Remark</th>
                                        </tr>
                                    </thead>
                                    <tbody id="statments">
                                        {filteredData.length > 0 && filteredData.map((item, index) => {

                                            return (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td className=" ">{Moment(new Date(item.Date || item.SettleTime || item.SettledDate)).format('DD/MM/YYYY hh:mm:ss a')}</td>

                                                    <td className=" ">
                                                        {item.EventName ? item.EventName + " " + (item.Market === "Fancy" ? item.Market + " " + item.Event : item.Market) : (item.SettlementType === "Liya Hai" ? `Cash Recieved from ${item.ChildName}` : `Cash Paid to ${item.ChildName}`)}
                                                    </td>

                                                    <td className="green text-right">
                                                        {item.ResultAmount ?
                                                            (item.ResultAmount <= 0 ? item.ResultAmount * (-1) : 0) :
                                                            (item.SettlementType === "Diya Hai" ? item.Amount * (-1) : 0)}
                                                    </td>
                                                    <td className="red text-right">
                                                        {item.ResultAmount ?
                                                            (item.ResultAmount >= 0 ? item.ResultAmount * (-1) : 0) :
                                                            (item.SettlementType === "Liya Hai" ? item.Amount : 0)}
                                                    </td>
                                                    <td className={item.balance <= 0 ? "red text-right" : "green text-right"} id="balance">{item.balance} {" "}{item.balance <= 0 ? "(Dena Hai)" : "(Lena Hai)"}</td>
                                                    <td>-</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" defaultValue="Report,Settlement" id="typeid" />
                </div>{" "}

                <footer>
                    <div className="pull-right" />
                    <div className="clearfix" />
                </footer>
            </div>
            <Footer />
            {/* </div > */}

        </>

    )
}

export default Ledger