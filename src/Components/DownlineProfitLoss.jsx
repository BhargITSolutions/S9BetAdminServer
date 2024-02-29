import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

function DownlineProfitLoss() {

        // const { contextUserId } = useUser()
        const location  = useLocation();
        const ChilduserId = location.state?.userId; 
    
        console.log("Location State : ", location)
        console.log("User context Id is : ", ChilduserId)
        let userId;
    
        if(ChilduserId == null || undefined){
            userId = Cookies.get('id');
        } else {
            userId = ChilduserId;
        }

    // const userId = Cookies.get('id');
    const userName = Cookies.get('userName');

    const navigate = useNavigate();



    const [data, setData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    const [accData, setAccData] = useState([]);

    const [alldata, setAllData] = useState([]);
    const [matchOdds, setMatchOdds] = useState([]);
    const [bookMaker, setBookMaker] = useState([]);



    useEffect(() => {
        fetchMatched();
    }, [])



    const fetchMatched = async () => {

        try {
            const fetched = await fetch(`http://localhost:5000/usersChild/${userId}`);
            const response = await fetched.json();
            // console.log("Get userChild matches data: " + JSON.stringify(response.Alldata));
            // setAllData(response.Alldata)
            // console.log("Get userChild Account Statement matches data: " + JSON.stringify(response.AccStatement));

            if (Array.isArray(response.AccStatement) && Array.isArray(response.Alldata)) {

                // console.log("Get userChild Account Statement matches data: " + JSON.stringify(response.AccStatement[0]));
                console.log("Response data before filter unique : " + response.Alldata.length)



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
                console.log("Combined filtered Data length: " + combinedFilteredUniqueData.length);

                // setAllData(combinedFilteredUniqueData)

                const mergedData = [...response.AccStatement[0].map(item => ({ ...item, source: 'accountstatement' })), ...combinedFilteredUniqueData.map(item => ({ ...item, source: 'bets' })),];

                // Sort the data by the ISO date string
                mergedData.sort((a, b) => new Date(b.Date || b.SettleTime) - new Date(a.Date || a.SettleTime));

                setCombinedData(mergedData);
                setData(mergedData);

                const accountStatementData = mergedData.filter(item => item.source === 'accountstatement');
                // (item.Date || item.SettleTime)

                const betsData = mergedData.filter(item => item.source === 'bets');

                // // Sort the data by the ISO date string
                // accountStatementData.sort((a, b) => new Date(b.Date || b.SettleTime) - new Date(a.Date || a.SettleTime));
                // // Sort the data by the ISO date string
                // betsData.sort((a, b) => new Date(b.Date || b.SettleTime) - new Date(a.Date || a.SettleTime));

                // console.log("Filter account statement data : " + JSON.stringify(accountStatementData))
                setAccData(accountStatementData)
                setAllData(betsData)

                console.log("Merged AccountStatement and bets data length: " + mergedData.length);
                console.log("bets Data : " + JSON.stringify(betsData));
                console.log("bets Data length : " + betsData.length);




            }

        } catch (err) {
            console.error("Error in fetching Userschild Api: " + err);
        }
    }


    const getDisplayedContent = (item) => {
        if (item.source == 'bets') {
            return item.ResultAmount > 0
                ? `Loss from ${userName} by ${item.EventName} ${item.Market == "Fancy" ? item.Market + " " + item.Event : item.Market}`
                : `Profit to ${userName} by ${item.EventName} ${item.Market == "Fancy" ? item.Market + " " + item.Event : item.Market}`;
        } else {
            return item.Deposit > 0
                ? `Chip Withdraw from ${item.ToUserName} by ${item.UserName}  - Done By - ${item.ByUserName}`
                : `Chip Credited to ${item.ToUserName} by ${item.UserName}  - Done By - ${item.ByUserName}`
        }
    };


    const handleShowBets = (eid, marketNumber, marketSId) =>{

        console.log("Event Id : "+eid + " MarketNumber : "+ marketNumber+" marketSId : "+marketSId)
        navigate(`/ShowBetCr/${eid}/${marketNumber}/${marketSId}`)
    }



    return (
        <>
            <div className="nav-md">
                <div className="container body">
                    <Header />

                    {/* page content */}
                    <div className="right_col" role="main" style={{ minHeight: 599 }}>
                        <div className="loader" style={{ display: "none" }} />
                        <div className="col-md-12">
                            <div className="title_new_at">
                                {" "}
                                Profit Loss Listing
                                <select style={{ color: "black" }} id="pages">
                                    <option value={10} selected="selected">
                                        10
                                    </option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <div className="pull-right">
                                    <button className="btn_common" onclick="javascript:history.go(-1)">
                                        Back
                                    </button>{" "}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="filter_page data-background">
                                <form
                                    method="get"
                                    id="formSubmit"
                                    className="form-horizontal form-label-left input_mask"
                                >
                                    <div className="col-md-3 col-xs-6" style={{ padding: 0 }}>
                                        <select className="form-control" id="sportid" style={{ margin: 0 }}>
                                            <option value="All" selected="selected">
                                                All
                                            </option>
                                            <option value="Cricket">Cricket</option>
                                            <option value="Soccer">Soccer</option>
                                            <option value="Tennis">Tennis</option>
                                            <option value="Live Casino">Live Casino</option>
                                            <option value="International Casino">Inter. Casino</option>
                                            <option value="Fancy">Fancy</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2 col-xs-6" style={{ padding: 0 }}>
                                        <input
                                            type="datetime"
                                            name="from_date"
                                            defaultValue="2020-12-16 00:00:00"
                                            id="betsstartDate"
                                            className="form-control col-md-7 col-xs-12 has-feedback-left datetimepicker"
                                            placeholder="From date"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="col-md-2 col-xs-6" style={{ padding: 0 }}>
                                        <input
                                            type="datetime"
                                            name="to_date"
                                            defaultValue="2020-12-16 23:59:59"
                                            id="betsendDate"
                                            className="form-control col-md-7 col-xs-12 has-feedback-left datetimepicker"
                                            placeholder="To date"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="col-md-2 col-xs-6" style={{ padding: 0 }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Via ID"
                                            id="matchname"
                                            name="searchTerm"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="col-md-3 col-xs-12 mobmtop">
                                        <button
                                            type="button"
                                            className="blue_button"
                                            id="submit_form_button"
                                            onclick="filter()"
                                            value="filter"
                                            data-attr="submit"
                                        >
                                            Filter
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div id="divLoading"> </div>
                            {/*Loading class */}
                            <div
                                className="table-responsive appendAjaxTbl data-background"
                                style={{}}
                            >
                                <table
                                    className="table table-striped jambo_table bulk_action"
                                    style={{ margin: "0 !important" }}
                                >
                                    <thead>
                                        <tr className="headings">
                                            <th className="darkpurplecolor">S.No. </th>
                                            <th className="lightgreencolor">Event Name </th>
                                            <th className="lightgreencolor">ID</th>
                                            <th className="darkpurplecolor">Market </th>
                                            <th className="lightgreencolor">P_L </th>
                                            <th className="darkpurplecolor">Commission </th>
                                            <th className="lightgreencolor">Created On </th>
                                            <th className="darkpurplecolor">Action </th>
                                        </tr>
                                    </thead>
                                    <tbody id="betlistdiv">

                                        {alldata.length > 0 && alldata.map((item, index) => {

                                            return (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.EventName}</td>
                                                    <td>{item.SelectionId}</td>
                                                    <td>{item.Market == "Fancy" ? item.Event : item.Market}</td>
                                                    <td>{item.ResultAmount == 0 ? item.ResultAmount : item.ResultAmount * (-1)}</td>
                                                    <td>0</td>
                                                    <td>{item.SettleTime}</td>
                                                    <td>
                                                        <a onClick={(e) => { e.preventDefault(); handleShowBets(item.EventId, item.Market === "Match Odds" ? 1 : item.Market === "BookMaker" ? 2 : 3, item.Market === "Fancy" ? item.SelectionId : 0) }}>
                                                            Show Bets
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })}


                                    </tbody>
                                </table>
                                <table
                                    className="table table-striped jambo_table bulk_action"
                                    style={{ display: "none" }}
                                >
                                    <thead>
                                        <tr className=" ">
                                            <th className="">(Total P &amp; L ) 0</th>
                                            <th className="">(Total Commition) 0</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div
                                className="dataTables_info"
                                id="items"
                                role="status"
                                aria-live="polite"
                            >
                                Showing 1 to 10 of Entries 10
                            </div>
                            <div
                                className="dataTables_paginate paging_simple_numbers pagination-row"
                                id="paginationList"
                            >
                                <strong className="paginate_button">1</strong>
                            </div>
                            {/*commanpopup*/}{" "}
                        </div>
                    </div>
                    <footer>
                        <div className="pull-right" />
                        <div className="clearfix" />
                    </footer>
                </div>
                <Footer />
            </div >



        </>

    )
}

export default DownlineProfitLoss