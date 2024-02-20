import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Cookies from 'js-cookie'
import Moment from 'moment'
import { useNavigate } from 'react-router-dom'

function AccountStatement() {

    const userId = Cookies.get('id');
    const userName = Cookies.get('userName');

    const navigate = useNavigate();



    const [data, setData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    const [accData, setAccData] = useState([]);

    const [alldata, setAllData] = useState([]);
    const [matchOdds, setMatchOdds] = useState([]);
    const [bookMaker, setBookMaker] = useState([]);





    useEffect(() => {

        // fetchAccountSt();
        fetchMatched();
        getCheckBox();
        document.getElementById('Statement').click();
    }, [userId]);




    // const fetchAccountSt = async () => {
    //     try {
    //         const fetched = await fetch(`http://localhost:5000/accountStatement/${userId}`);
    //         const response = await fetched.json();
    //         console.log("Get account Statemnet : " + JSON.stringify(response));

    //         if (Array.isArray(response.data)) {

    //             // setAccData(response.data)
    //         }


    //     } catch (error) {
    //         console.error("Error fetching accountStatement api " + error);
    //     }
    // };

    const fetchMatched = async () => {

        try {
            const fetched = await fetch(`http://localhost:5000/usersChild/${userId}`);
            const response = await fetched.json();
            console.log("Get userChild matches data: " + JSON.stringify(response.Alldata));
            // setAllData(response.Alldata)
            // console.log("Get userChild Account Statement matches data: " + JSON.stringify(response.AccStatement));

            if (Array.isArray(response.AccStatement) && Array.isArray(response.Alldata)) {

                console.log("Get userChild Account Statement matches data: " + JSON.stringify(response.AccStatement[0]));
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


                const beforFilterFancy =  response.Alldata.filter(item => item.Market == "Fancy");

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

                console.log("Filtered unique Fancy Data: ", filteredFancyData);
                console.log("Filtered unique Fancy Data length: ", filteredFancyData.length);






                // Combine filteredData and filteredBookMakerData into a single array
                const combinedFilteredUniqueData = filteredData.concat(filteredBookMakerData, filteredFancyData);

                console.log("Combined filtered Data: " + JSON.stringify(combinedFilteredUniqueData));
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

                console.log("Filter account statement data : " + JSON.stringify(accountStatementData))
                setAccData(accountStatementData)
                setAllData(betsData)

                console.log("Merged AccountStatement and bets data length: " + mergedData.length);


            }


            // // setMatchOdds(response.MatchOdds)
            // // setBookMaker(response.BookMaker)
            // // Group the MatchOdds array by EventId
            // const groupedMatches = response.MatchOdds.reduce((accumulator, currentItem) => {
            //     const eventId = currentItem.EventId;
            //     if (!accumulator[eventId]) {
            //         accumulator[eventId] = [];
            //     }
            //     accumulator[eventId].push(currentItem);
            //     return accumulator;
            // }, {});

            // // Calculate the ResultAmount for each group
            // const resultAmounts = Object.keys(groupedMatches).map(eventId => {
            //     const matches = groupedMatches[eventId];
            //     const resultAmount = matches.reduce((totalResultAmount, match) => totalResultAmount + match.ResultAmount, 0);
            //     return { EventId: eventId, ResultAmount: resultAmount };
            // });

            // console.log("ResultAmounts: ", resultAmounts);


            // setData(resultAmounts);
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
    const getCheckBox = (item) => {
        console.log("Selected Item : " + item)

        if (item == "Statement") {
            setData(combinedData);
            console.log("Length of combined data : " + combinedData.length)
        }
        if (item == "FreeChips") {
            setData(accData)
            console.log("Length of combined data : " + accData.length)
        }
        if (item == "PL") {
            setData(alldata)
            console.log("Length of combined data : " + alldata.length)
        }
    }

    // No empty dependency array, effect will run continuously
    const handleEvent = (eventId) => {
        navigate(`/matchDetailList/${eventId}`);

        console.log("Clicked Event Id : " + eventId)
    }


    // const fetchMatched = async () =>{
    //     try{

    //         const fetched = await fetch(`http://localhost:5000/usersChild/${userId}`)
    //         const response = await fetched.json();
    //         console.log("Get userChild matches data : "+ JSON.stringify(response))
    //         setData(response.MatchOdds)
    //     } catch(err){
    //         console.error("Error in fetching Userschild Api : "+err)
    //     }
    // }



    return (

        <>


            <div className="nav-md">
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
                                <div className="filter_page  data-background">
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
                                        <div className="form-group">
                                            <input
                                                name="fltrselct"
                                                defaultValue={0}
                                                defaultChecked={true}
                                                type="radio"
                                                onClick={(e) => { e.preventDefault(); getCheckBox('Statement') }}
                                                id="Statement"
                                            />
                                            <label htmlFor="Statement">
                                                <span>Statement</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="fltrselct"
                                                defaultValue={1}
                                                type="radio"
                                                id="FreeChips"
                                                onClick={(e) => { e.preventDefault(); getCheckBox('FreeChips') }}

                                            />
                                            <label htmlFor="FreeChips">
                                                <span>Accounts</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="fltrselct"
                                                defaultValue={0}
                                                type="radio"
                                                onClick={(e) => { e.preventDefault(); getCheckBox('PL') }}
                                                id="PL"
                                            />
                                            <label htmlFor="PL">
                                                <span>P/L Statement</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="fltrselct"
                                                defaultValue={0}
                                                type="radio"
                                                onClick={(e) => { e.preventDefault(); getCheckBox('CPL') }}

                                                id="CPL"
                                            />
                                            <label htmlFor="CPL">
                                                <span>Casino P/L Statement</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="fltrselct"
                                                defaultValue={2}
                                                type="radio"
                                                onClick={(e) => { e.preventDefault(); getCheckBox('Settlement') }}
                                                id="Settlement"
                                            />
                                            <label htmlFor="Settlement">
                                                <span>Settlement</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="fltrselct"
                                                defaultValue={2}
                                                type="radio"
                                                onClick={(e) => { e.preventDefault(); getCheckBox('PL2') }}
                                                id="PL2"
                                            />
                                            <label htmlFor="PL2">
                                                <span>Profit and Loss</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="block_2">
                                        <input
                                            type="date"
                                            name="fdate"
                                            id="fdate"
                                            defaultValue=""
                                            className="form-control"
                                            placeholder="From Date"
                                            autoComplete="off"
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
                                        />
                                    </div>
                                    <div className="block_2">
                                        <input
                                            type="search"
                                            name="searchTerm"
                                            id="searchTerm"
                                            className="form-control"
                                            placeholder="Search"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="block_2 buttonacount">
                                        <button
                                            type="button"
                                            name="submit"
                                            id="submit_form_button"
                                            onclick="filterData()"
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
                                                <th className="lightgreencolor rrig text-right">Commission</th>
                                                <th className="darkpurplecolor rrig text-right">Balance</th>
                                                <th className="lightgreencolor rrig text-right">Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody id="statments">
                                            {data.length > 0 && data.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td className=" ">{Moment(new Date(item.Date || item.SettleTime)).format('DD/MM/YYYY hh:mm:ss a')}</td>
                                                    <td className=" " >
                                                        {item.source === 'bets' && (
                                                            <a onClick={(e) => {
                                                                e.preventDefault();
                                                                handleEvent(item.EventId)
                                                            }}>
                                                                {getDisplayedContent(item)}
                                                            </a>
                                                        )}
                                                        {item.source !== 'bets' && getDisplayedContent(item)}
                                                    </td>
                                                    <td className="green text-right">
                                                        {item.source === 'accountstatement' ?
                                                            item.Deposit :
                                                            (item.ResultAmount !== undefined && item.ResultAmount > 0 ?
                                                                0 :
                                                                (item.ResultAmount !== undefined ?
                                                                    item.ResultAmount.toString().replace(/^(-)/, '') :
                                                                    ''))}
                                                    </td>
                                                    <td className="red text-right">{item.source === 'accountstatement' ? item.Withdraw : item.ResultAmount > 0 ? item.ResultAmount : 0}</td>
                                                    <td className="green text-right">0</td>
                                                    <td className="green text-right">{item.Balance}</td>
                                                    <td>-</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" defaultValue="All" id="typeid" />
                    </div>
                    <footer>
                        <div className="pull-right" />
                        <div className="clearfix" />
                    </footer>
                </div>
                <Footer />
            </div>


        </>


    )
}

export default AccountStatement;