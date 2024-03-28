import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Cookies from 'js-cookie'
import Moment from 'moment'
import { useNavigate } from 'react-router-dom'
// import { useUser } from './UserContext'
import { useLocation } from 'react-router-dom'

function AccountStatement() {

    // const { contextUserId } = useUser()
    const location = useLocation();
    const ChilduserId = location.state?.userId;
    const clickedChildRoleId = location.state?.roleId;
    const clickedUserName = location.state?.userName

    console.log("Location State : ", location)
    console.log("User context Id is : ", ChilduserId)
    console.log("User context roleId is : ", clickedChildRoleId)
    console.log("User context userName is : ", clickedUserName)


    let userId;
    let userName;

    if (ChilduserId == null || undefined) {
        userId = Cookies.get('id');
        userName = Cookies.get('userName');
    } else {
        userId = ChilduserId;
        userName = clickedUserName;
    }

    

    const navigate = useNavigate();


    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    const [accData, setAccData] = useState([]);

    const [betsData, setBetsData] = useState([]);
    const [matchOdds, setMatchOdds] = useState([]);
    const [bookMaker, setBookMaker] = useState([]);
    const [settlementData, setSettlementData] = useState([])
    const [fromDate, setFromDate] = useState(getDefaultFromDate());
    const [toDate, setToDate] = useState(getDefaultToDate());
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClicked, setFilterClicked] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Statement');
    const [selectedData, setSelectedData] = useState([])





    useEffect(() => {

        // fetchAccountSt();
        fetchMatched();
        // getCheckBox();
        filterBetUsers()
        document.getElementById('Statement').click();
    }, [userId]);


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

            if (clickedChildRoleId != 8) {




                const fetched = await fetch(`https://api.s2bet.in/usersChild/${userId}`);
                const response = await fetched.json();
                console.log("Get userChild matches data: " + JSON.stringify(response.Alldata));

                const fetchSettlementUser = await fetch(`https://api.s2bet.in/getSettlement/${userId}`)

                const Ressetttlement = await fetchSettlementUser.json();

                if (Array.isArray(response.AccStatement) && Array.isArray(response.Alldata) && Array.isArray(Ressetttlement.data)) {

                    console.log("Get userChild Account Statement matches data: " + JSON.stringify(response.AccStatement[0]));
                    console.log("Response data before filter unique : " + response.Alldata.length)
                    console.log("Get settlement data: " + JSON.stringify(Ressetttlement.data));


                    const filterSettlement = Ressetttlement.data.filter(item => item.ParentId == userId)

                    console.log("settlement data by parent Id : ", filterSettlement)
                    const addSourceInSettlement = filterSettlement.map(item => ({ ...item, source: 'settlement' }))
                    console.log("settlement data by parent Id with source : ", addSourceInSettlement)

                    setSettlementData(addSourceInSettlement)



                    // Unique data for Match Odds 
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

                    console.log("Filtered unique Fancy Data: ", filteredFancyData);
                    console.log("Filtered unique Fancy Data length: ", filteredFancyData.length);






                    // Combine filteredData and filteredBookMakerData into a single array
                    const combinedFilteredUniqueData = filteredData.concat(filteredBookMakerData, filteredFancyData);

                    console.log("Combined filtered Data: " + JSON.stringify(combinedFilteredUniqueData));
                    console.log("Combined filtered Data length: " + combinedFilteredUniqueData.length);

                    // setAllData(combinedFilteredUniqueData)

                    const mergedData = [...response.AccStatement[0].map(item => ({ ...item, source: 'accountstatement' })), ...combinedFilteredUniqueData.map(item => ({ ...item, source: 'bets' })), ...addSourceInSettlement];

                    // Sort the data by the ISO date string
                    mergedData.sort((a, b) => new Date(b.Date || b.SettleTime || b.SettledDate) - new Date(a.Date || a.SettleTime || a.SettledDate));
                    console.log("Mereged data before by date : ", mergedData)

                    const filteredDataByDate = mergedData.filter(item =>

                        new Date(item.Date || item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                        new Date(item.Date || item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
                    );

                    console.log("Mereged data after by date : ", filteredDataByDate)


                    setCombinedData(mergedData);


                    setData(filteredDataByDate);

                    const accountStatementData = mergedData.filter(item => item.source === 'accountstatement');

                    const betsData = mergedData.filter(item => item.source === 'bets');

                    console.log("bets Data length : " + betsData.length);

                    console.log("Filter account statement data : " + JSON.stringify(accountStatementData))
                    setAccData(accountStatementData)
                    setBetsData(betsData)

                    console.log("Merged AccountStatement and bets data length: " + mergedData.length);
                }
            } else {

                const fetched = await fetch(`https://api.s2bet.in/childAccStatement/${userId}`);
                const response = await fetched.json();
                console.log("Get childAccStatement matches data: " + JSON.stringify(response.Alldata));

                // const fetchSettlementUser = await fetch(`https://api.s2bet.in/getSettlement/${userId}`)

                // const Ressetttlement = await fetchSettlementUser.json();

                if (Array.isArray(response.AccStatement) && Array.isArray(response.Alldata)) {

                    console.log("Get userChild Account Statement matches data: " + JSON.stringify(response.AccStatement[0]));
                    console.log("Response data before filter unique : " + response.Alldata.length)




                    // Unique data for Match Odds 
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

                    console.log("Filtered unique Fancy Data: ", filteredFancyData);
                    console.log("Filtered unique Fancy Data length: ", filteredFancyData.length);

                    // Combine filteredData and filteredBookMakerData into a single array
                    const combinedFilteredUniqueData = filteredData.concat(filteredBookMakerData, filteredFancyData);

                    console.log("Combined filtered Data: " + JSON.stringify(combinedFilteredUniqueData));
                    console.log("Combined filtered Data length: " + combinedFilteredUniqueData.length);

                    // setAllData(combinedFilteredUniqueData)

                    const mergedData = [...response.AccStatement[0].map(item => ({ ...item, source: 'accountstatement' })), ...combinedFilteredUniqueData.map(item => ({ ...item, source: 'bets' }))];

                    // Sort the data by the ISO date string
                    mergedData.sort((a, b) => new Date(b.Date || b.SettleTime || b.SettledDate) - new Date(a.Date || a.SettleTime || a.SettledDate));
                    console.log("Mereged data before by date : ", mergedData)

                    const filteredDataByDate = mergedData.filter(item =>

                        new Date(item.Date || item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                        new Date(item.Date || item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
                    );

                    console.log("Mereged data after by date : ", filteredDataByDate)


                    setCombinedData(mergedData);


                    setData(filteredDataByDate);

                    const accountStatementData = mergedData.filter(item => item.source === 'accountstatement');

                    const betsData = mergedData.filter(item => item.source === 'bets');

                    console.log("bets Data length : " + betsData.length);

                    console.log("Filter account statement data : " + JSON.stringify(accountStatementData))
                    setAccData(accountStatementData)
                    setBetsData(betsData)

                    console.log("Merged AccountStatement and bets data length: " + mergedData.length);
                }


            }

        } catch (err) {
            console.error("Error in fetching Userschild Api: " + err);
        } finally {
            // Set loading state back to false after the request is completed
            setIsLoading(false);
        }
    }

    const filterBetUsers = () => {


        if (data.length > 0 && Array.isArray(data)) {

            console.log("All state data after clicks on filter ", betsData)

            const filteredDataByDate = data.filter(item =>

                new Date(item.Date || item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                new Date(item.Date || item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
            );

            console.log("From Date : " + fromDate)
            console.log("To Date : " + toDate)
            // Sort the data by the ISO date string
            filteredDataByDate.sort((a, b) => new Date(b.Date || b.SettleTime || b.SettledDate) - new Date(a.Date || a.SettleTime || a.SettledDate));
            console.log("Formatted and Sorted Bet History data:", filteredDataByDate);

            console.log('filtered data length : ', filteredDataByDate.length)

            // setUser(formattedUserName)
            setData(filteredDataByDate);


        } else {
            console.error('Invalid data format:', data);
        }
    }

    const getDisplayedContent = (item) => {
        if (item.source == 'bets') {
            return item.ResultAmount > 0
                ? `Loss from ${userName} by ${item.EventName} ${item.Market == "Fancy" ? item.Market + " " + item.Event : item.Market}`
                : `Profit to ${userName} by ${item.EventName} ${item.Market == "Fancy" ? item.Market + " " + item.Event : item.Market}`;
        } else if (item.source === 'accountstatement') {
            return item.Deposit > 0
                ? `Chip Withdraw from ${item.ToUserName} by ${item.UserName}  - Done By - ${item.ByUserName}`
                : `Chip Credited to ${item.ToUserName} by ${item.UserName}  - Done By - ${item.ByUserName}`
        } else if (item.source == 'settlement') {
            return item.SettlementType === "Liya Hai"
                ? `Cash Recieved from ${item.ChildName}`
                : `Cash Paid to ${item.ChildName}`

        }
    };

    const getCheckBox = (item) => {
        console.log("Selected Item : " + item)
        setSelectedOption(item);

        if (item == "Statement") {

            const filteredDataByDate = combinedData.filter(item =>

                new Date(item.Date || item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                new Date(item.Date || item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
            );

            console.log("Selected data after by date filter : ", filteredDataByDate)

            setData(filteredDataByDate);


            // setSelectedData(combinedData);
            console.log("Length of combined data : " + combinedData.length)
        }
        if (item == "FreeChips") {
            const filteredDataByDate = accData.filter(item =>

                new Date(item.Date || item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                new Date(item.Date || item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
            );

            console.log("Selected data after by date filter : ", filteredDataByDate)

            setData(filteredDataByDate);

            console.log("Accounts data : " + JSON.stringify(accData))
            console.log("Length of Accounts data : " + accData.length)

        }
        if (item == "PL") {
            const filteredDataByDate = betsData.filter(item =>

                new Date(item.Date || item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                new Date(item.Date || item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
            );

            console.log("Selected data after by date filter : ", filteredDataByDate)

            setData(filteredDataByDate);
            console.log("Profit Loss bets alldata data : " + JSON.stringify(betsData))
            console.log("Length of Profit Loss alldata data : " + betsData.length)
        }
        if (item == "Settlement") {

            const filteredDataByDate = settlementData.filter(item =>

                new Date(item.Date || item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                new Date(item.Date || item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
            );

            console.log("Selected data after by date filter : ", filteredDataByDate)

            setData(filteredDataByDate);



            console.log("Length of settlement data : " + settlementData.length)
        }
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
        let filteredData = [];
        switch (selectedOption) {
            case "Statement":
                filteredData = combinedData.filter(item => {
                    const displayedContent = getDisplayedContent(item);
                    return (
                        new Date(item.Date || item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                        new Date(item.Date || item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
                    ) && (searchTerm === '' || displayedContent.toLowerCase().includes(searchTerm.toLowerCase()));
                });
                break;
            case "FreeChips":
                filteredData = accData.filter(item => {
                    const displayedContent = getDisplayedContent(item);
                    return (
                        new Date(item.Date || item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                        new Date(item.Date || item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
                    ) && (searchTerm === '' || displayedContent.toLowerCase().includes(searchTerm.toLowerCase()));
                });
                break;
            case "PL":
                filteredData = betsData.filter(item => {
                    const displayedContent = getDisplayedContent(item);
                    return (
                        new Date(item.Date || item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                        new Date(item.Date || item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
                    ) && (searchTerm === '' || displayedContent.toLowerCase().includes(searchTerm.toLowerCase()));
                });
                break;
            case "Settlement":
                filteredData = settlementData.filter(item => {
                    const displayedContent = getDisplayedContent(item);
                    return (
                        new Date(item.Date || item.SettleTime || item.SettledDate) >= new Date(fromDate) &&
                        new Date(item.Date || item.SettleTime || item.SettledDate) <= new Date(toDate).setHours(23, 59, 59, 999)
                    ) && (searchTerm === '' || displayedContent.toLowerCase().includes(searchTerm.toLowerCase()));
                });
                break;
            default:
                // Handle default case
                break;
        }

        setData(filteredData);
        setFilterClicked(true);
    };


    // No empty dependency array, effect will run continuously
    const handleEvent = (eventId) => {
        navigate(`/matchDetailList/${eventId}`);

        console.log("Clicked Event Id : " + eventId)
    }



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
                                            checked={selectedOption === 'Statement'}
                                            type="radio"
                                            onClick={() => getCheckBox('Statement')}
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
                                            // checked={selectedOption === 'FreeChips' ? true : false}
                                            onClick={() => getCheckBox('FreeChips')}

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
                                            // checked={selectedOption === 'PL'}
                                            onClick={() => getCheckBox('PL')}
                                            id="PL"
                                        />
                                        <label htmlFor="PL">
                                            <span>P/L Statement</span>
                                        </label>
                                    </div>
                                    {/* <div className="form-group">
                                        <input
                                            name="fltrselct"
                                            defaultValue={0}
                                            type="radio"
                                            // checked={selectedOption === 'CPL'}
                                            onClick={() => getCheckBox('CPL')}

                                            id="CPL"
                                        />
                                        <label htmlFor="CPL">
                                            <span>Casino P/L Statement</span>
                                        </label>
                                    </div> */}
                                    <div className="form-group">
                                        <input
                                            name="fltrselct"
                                            defaultValue={2}
                                            type="radio"
                                            // checked={selectedOption === 'Settlement' }
                                            onClick={() => getCheckBox('Settlement')}
                                            id="Settlement"
                                        />
                                        <label htmlFor="Settlement">
                                            <span>Settlement</span>
                                        </label>
                                    </div>
                                    {/* <div className="form-group">
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
                                        </div> */}
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
                                <div className="block_2">
                                    <input
                                        type="search"
                                        name="searchTerm"
                                        id="searchTerm"
                                        className="form-control"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        maxLength={100}
                                        size={50}
                                        autoComplete="off"
                                    />
                                </div>
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
                                            <th className="lightgreencolor rrig text-right">Commission</th>
                                            <th className="darkpurplecolor rrig text-right">Balance</th>
                                            <th className="lightgreencolor rrig text-right">Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody id="statments">
                                        {data.length > 0 && data.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td className=" ">{Moment(new Date(item.Date || item.SettleTime || item.SettledDate)).format('DD/MM/YYYY hh:mm:ss a')}</td>
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
                                                                (item.SettlementType === "Diya Hai" ? item.Amount : 0)))}
                                                </td>
                                                <td className="red text-right">{item.source === 'accountstatement' ? item.Withdraw : item.ResultAmount > 0 ? item.ResultAmount : item.SettlementType === "Liya Hai" ? item.Amount * (-1) : 0}</td>
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
            {/* </div> */}


        </>


    )
}

export default AccountStatement;