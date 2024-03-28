import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import Moment from 'moment'

function DownlineProfitLoss() {

    // const { contextUserId } = useUser()
    const location = useLocation();
    const ChilduserId = location.state?.userId;

    console.log("Location State : ", location)
    console.log("User context Id is : ", ChilduserId)
    let userId;

    if (ChilduserId == null || undefined) {
        userId = Cookies.get('id');
    } else {
        userId = ChilduserId;
    }

    // const userId = Cookies.get('id');
    const userName = Cookies.get('userName');

    const navigate = useNavigate();


    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    const [accData, setAccData] = useState([]);

    const [alldata, setAllData] = useState([]);
    const [matchOdds, setMatchOdds] = useState([]);
    const [bookMaker, setBookMaker] = useState([]);
    const [fromDate, setFromDate] = useState(getDefaultFromDate());
    const [toDate, setToDate] = useState(getDefaultToDate());
    const [searchTerm, setSearchTerm] = useState('');
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);



    useEffect(() => {
        fetchMatched();
    }, [])



    const fetchMatched = async () => {

        setIsLoading(true)
        try {
            const fetched = await fetch(`https://api.s2bet.in/usersChild/${userId}`);
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

                setData(betsData)

                const filteredDataByDate = betsData.filter(item =>

                    new Date(item.SettleTime) >= new Date(fromDate) &&
                    new Date(item.SettleTime) <= new Date(toDate).setHours(23, 59, 59, 999)
                );

                console.log("Mereged data after by date : ", filteredDataByDate)

                setAllData(filteredDataByDate)

                console.log("Merged AccountStatement and bets data length: " + mergedData.length);
                console.log("bets Data : " + JSON.stringify(betsData));
                console.log("bets Data length : " + betsData.length);




            }

        } catch (err) {
            console.error("Error in fetching Userschild Api: " + err);
        } finally {
            // Set loading state back to false after the request is completed
            setIsLoading(false);
        }
    }


    const getDisplayedContent = (item) => {
        if (item.source == 'bets') {
            return item.EventName;
        }
    };


    const handleShowBets = (eid, marketNumber, marketSId) => {

        console.log("Event Id : " + eid + " MarketNumber : " + marketNumber + " marketSId : " + marketSId)
        navigate(`/ShowBetCr/${eid}/${marketNumber}/${marketSId}`)
    }


    function getDefaultFromDate() {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
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
        console.log(" From Date : " + e.target.value)
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        console.log(" To Date : " + e.target.value)
        setToDate(e.target.value);
    };


    const handleFilter = () => {
        const filteredData = data.filter(item => {
            const dateToCompare = new Date(item.SettleTime);
            const displayedContent = getDisplayedContent(item);
            const sportFilter = document.getElementById("sportid").value;

            return (
                (sportFilter == 'Fancy' ? item.Market == 'Fancy' : sportFilter == 'All' || item.SportId == sportFilter) &&
                dateToCompare >= new Date(fromDate) &&
                dateToCompare <= new Date(toDate) &&
                (searchTerm === '' || displayedContent.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        });

        console.log("Filtered data:", filteredData);
        setAllData(filteredData);
    };


    const handlePerPageChange = (e) => {
        setPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to the first page when changing items per page
    };

    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = alldata.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(alldata.length / perPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const handleClick = (pageNumber) => {
        if (pageNumber < 1) {
            // If the requested page number is less than 1, set currentPage to 1
            setCurrentPage(1);
        } else {
            setCurrentPage(pageNumber);
        }
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
                    <div className="col-md-12">
                        <div className="title_new_at">
                            {" "}
                            Profit Loss Listing
                            <select style={{ color: "black", fontSize:'15px' }} id="pages" onChange={handlePerPageChange}
                                value={perPage}>
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
                                        <option value="4">Cricket</option>
                                        <option value="2">Soccer</option>
                                        <option value="1">Tennis</option>
                                        {/* <option value="Live Casino">Live Casino</option>
                                        <option value="International Casino">Inter. Casino</option> */}
                                        <option value="Fancy">Fancy</option>
                                    </select>
                                </div>
                                <div className="col-md-2 col-xs-6" style={{ padding: 0 }}>
                                    <input
                                        type="date"
                                        name="from_date"
                                        id="betsstartDate"
                                        className="form-control col-md-7 col-xs-12 has-feedback-left datetimepicker"
                                        placeholder="From date"
                                        autoComplete="off"
                                        onChange={handleFromDateChange}
                                        value={fromDate}
                                    />
                                </div>
                                <div className="col-md-2 col-xs-6" style={{ padding: 0 }}>
                                    <input
                                        type="date"
                                        name="to_date"
                                        id="betsendDate"
                                        className="form-control col-md-7 col-xs-12 has-feedback-left datetimepicker"
                                        placeholder="To date"
                                        autoComplete="off"
                                        onChange={handleToDateChange}
                                        value={toDate}
                                    />
                                </div>
                                <div className="col-md-2 col-xs-6" style={{ padding: 0 }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Via ID"
                                        id="matchname"
                                        name="searchTerm"
                                        autoComplete="off"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        maxLength={100}
                                        size={50}
                                    />
                                </div>
                                <div className="col-md-3 col-xs-12 mobmtop">
                                    <button
                                        type="button"
                                        className="blue_button"
                                        id="submit_form_button"
                                        onClick={handleFilter}
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

                                    {currentItems.length > 0 && currentItems.map((item, index) => {

                                        return (
                                            <tr key={item.id}>
                                                <td>{(currentPage - 1) * perPage + index + 1}</td>
                                                <td>{item.EventName}</td>
                                                <td>{item.SelectionId}</td>
                                                <td>{item.Market == "Fancy" ? item.Event : item.Market}</td>
                                                <td>{item.ResultAmount == 0 ? item.ResultAmount : item.ResultAmount * (-1)}</td>
                                                <td>0</td>
                                                <td>{Moment(new Date(item.SettleTime)).format('DD/MM/YYYY hh:mm:ss a')}</td>
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
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, alldata.length)} of {alldata.length} Entries
                        </div>
                        <div
                            className="dataTables_paginate paging_simple_numbers pagination-row"
                            id="paginationList"
                        >
                            <a
                                className={`paginate_button previous ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={() => handleClick(currentPage - 1)}
                                aria-controls="datatable"
                                data-dt-idx={0}
                                tabIndex={0}
                                id="datatable_previous"
                            >
                                Previous
                            </a>
                            {pageNumbers.map((pageNumber) => (
                                <a
                                    key={pageNumber}
                                    className={`paginate_button ${currentPage === pageNumber ? 'current' : ''}`}
                                    onClick={() => handleClick(pageNumber)}
                                    aria-controls="datatable"
                                    data-dt-idx={pageNumber}
                                    tabIndex={0}
                                >
                                    {pageNumber}
                                </a>
                            ))}
                            <a
                                className={`paginate_button next ${currentPage === totalPages ? 'disabled' : ''}`}
                                onClick={() => handleClick(currentPage + 1)}
                                aria-controls="datatable"
                                data-dt-idx={3}
                                tabIndex={0}
                                id="datatable_next"
                            >
                                Next
                            </a>
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
            {/* </div > */}



        </>

    )
}

export default DownlineProfitLoss