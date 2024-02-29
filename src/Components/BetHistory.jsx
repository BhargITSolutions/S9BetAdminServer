import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Cookies from 'js-cookie'
import Moment from 'moment-timezone';
import Swal from 'sweetalert2';

function BetHistory() {

    const userId = Cookies.get('id')
    const roleId = Cookies.get('roleId')
    const LoggedInuserName = Cookies.get('userName').replace(/['"]+/g, '');

    const [data, setData] = useState([])
    const [betUsers, setBetUsers] = useState([])
    const [selectedSportId, setSelectedSportId] = useState(5); // Default to All
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [fromDate, setFromDate] = useState(getDefaultFromDate());
    const [toDate, setToDate] = useState(getDefaultToDate());
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState(1); // Default to Settled
    const [filterClicked, setFilterClicked] = useState(false);
    const [load, setLoad] = useState(false)


    useEffect(() => {
        fetchBetHistoryApi();
        // filterBetUsers()
    }, [])

    useEffect(() => {
        if(load){
            fetchBetHistoryApi()
            filterBetUsers();
            setCurrentPage(1);
            setLoad(false)
        }

    }, [betUsers, load])

    
    useEffect(() => {

        if (filterClicked) {
            // fetchMyBalanceApi();
            filterBetUsers()
            setCurrentPage(1);
            setFilterClicked(false); // Reset the filterClicked state
        }
    }, [filterClicked]);



    const fetchBetHistoryApi = async () => {
        try {
            const fetched = await fetch(`http://localhost:5000/betHistory/${userId}`);
            const response = await fetched.json();
            console.log("Get BetHistory Api  : " + JSON.stringify(response.data));


            setBetUsers(response.data)

        } catch (error) {
            console.error("Error fetching Users api " + error);
        }
    };

    const filterBetUsers = () => {

        if (betUsers.length > 0 && Array.isArray(betUsers)) {



            // Filter by date and Status

            if (status == 3) {

                const filteredData = betUsers.filter(item =>
                    item.IsDelete == 1
                    &&
                    new Date(item.MatchedTime) >= new Date(fromDate) &&
                    new Date(item.MatchedTime) <= new Date(toDate).setHours(23, 59, 59, 999) && (searchTerm === '' || item.EventName.toLowerCase().includes(searchTerm.toLowerCase()))
                );

                console.log("From Date : " + fromDate)
                console.log("To Date : " + toDate)
                // Sort the data by the ISO date string
                filteredData.sort((a, b) => new Date(b.MatchedTime) - new Date(a.MatchedTime));
                console.log("Formatted and Sorted Bet History data:", filteredData);
                // // Sort the data by the ISO date string
                // formattedData.sort((a, b) => new Date(a.result.data.placeTime) - new Date(b.result.data.placeTime));

                // console.log("Formatted and Sorted Bet History data:", formattedData);

                // setUser(formattedUserName)
                setData(filteredData);
            } else {

                const filteredData = betUsers.filter(item =>
                    item.IsSettlement == parseInt(status) && item.IsDelete == 0 &&
                    new Date(item.MatchedTime) >= new Date(fromDate) &&
                    new Date(item.MatchedTime) <= new Date(toDate).setHours(23, 59, 59, 999) && (searchTerm === '' || item.EventName.toLowerCase().includes(searchTerm.toLowerCase()))
                );

                console.log("From Date : " + fromDate)
                console.log("To Date : " + toDate)
                // Sort the data by the ISO date string
                filteredData.sort((a, b) => new Date(b.MatchedTime) - new Date(a.MatchedTime));
                console.log("Formatted and Sorted Bet History data:", filteredData);
                // // Sort the data by the ISO date string
                // formattedData.sort((a, b) => new Date(a.result.data.placeTime) - new Date(b.result.data.placeTime));

                // console.log("Formatted and Sorted Bet History data:", formattedData);

                // setUser(formattedUserName)
                setData(filteredData);
            }


        } else {
            console.error('Invalid data format:', betUsers);
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

    const handleSportTabClick = (sportId) => {
        setSelectedSportId(sportId);
        setCurrentPage(1); // Reset to the first page when changing tabs
        console.log("Selected Sport Id : " + sportId)
    };

    const handlePerPageChange = (e) => {
        setPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to the first page when changing items per page
    };

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };

    const handleStatusChange = (e) => {

        setStatus(e.target.value);
        console.log("Status is : " + status)
        console.log(typeof (status))
    };


    const handleFilter = () => {
        // fetchMyBalanceApi(); // Trigger refetching with the updated filter criteria
        filterBetUsers()
        setCurrentPage(1);
        setFilterClicked(true);
    };


    const handleAciton = async (id, value) => {

        console.log("BET ID : " + id + " Value is : " + value)

        Swal.fire({
            title: "Conformation",
            text: "Are you sure",
            icon: "warning",
            confirmButtonText: "Yes",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    // Send login request with username, password, and userIP
                    const response = await fetch('http://localhost:5000/updateBetHistoryUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ betId: id, value, ParentUser: LoggedInuserName }),
                    });

                    const responseData = await response.json();
                    console.log("response from api : " + JSON.stringify(responseData))
                    if (responseData.isSuccess == true) {

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Update Successful..",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        console.log(JSON.stringify(responseData.message))
                        
                        // filterBetUsers();
                        // handleFilter()
                        // setFilterClicked(true)
                        setLoad(true)
                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'
                        });
                        console.log(JSON.stringify(responseData.message))
                    }
                } catch (err) {
                    console.error("error is handleAction POST api : " + err)
                }

            }
        })
    }




    const filteredData = selectedSportId == 5
        ? data
        : selectedSportId == 0 // Fancy
            ? data.filter(item => item.Market == 'Fancy')
            : data.filter(item => item.SportId == selectedSportId && item.Market != "Fancy");

    console.log("filtered data sport Id : " + JSON.stringify(filteredData))
    console.log("filtered data sport Id length: " + filteredData.length + " and sports Id is : " + selectedSportId)

    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



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
                                Bet History
                                <select style={{ color: "black" }} id="pages" onChange={handlePerPageChange}
                                    value={perPage}>
                                    <option value={10} selected="selected">
                                        10
                                    </option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12" />
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="clearfix data-background" style={{ paddingLeft: 0 }}>
                                <form
                                    method="post"
                                    id="formSubmit"
                                    className="form-horizontal form-label-left input_mask"
                                >
                                    <div className="popup_col_2">
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
                                    <div className="popup_col_2">
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
                                    <div className="popup_col_1">
                                        <input
                                            type="search"
                                            name="searchTerm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            id="searchBet"
                                            maxLength={100}
                                            size={50}
                                            className="form-control"
                                            placeholder="Search"
                                        />
                                    </div>
                                    <div className="popup_col_2">
                                        <select className="form-control" id="betStatus" onChange={handleStatusChange}>
                                            <option value={2}>Open</option>
                                            <option value={1} selected="selected">
                                                Settled
                                            </option>
                                            <option value={3} style={{ display: roleId == 1 || roleId == 2 ? "block" : "none" }}>
                                                Void
                                            </option>


                                        </select>
                                    </div>
                                    <div className="popup_col_3">
                                        <button
                                            type="button"
                                            onclick="filter()"
                                            name="submit"
                                            className="blue_button"
                                            id="submit_form_button"
                                            value="filter"
                                            data-attr="submit"
                                            onClick={handleFilter}
                                        >
                                            <i className="fa fa-filter" aria-hidden="true" /> Filter
                                        </button>
                                        <a href="" className="red_button">
                                            <i className="fa fa-eraser" aria-hidden="true" /> Clear
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div
                            className="col-md-12 col-sm-12 col-xs-12"
                            style={{ margin: "15px 0px" }}
                        >
                            <div className="tab_bets get-mchlist">
                                <ul id="betsalltab" className="nav nav-pills match-lists">
                                    <li className={selectedSportId === 5 ? 'col-lg-2 col-xs-3 active' : 'col-lg-2 col-xs-3'} id="All" style={{ padding: 0 }}>
                                        <a onClick={() => handleSportTabClick(5)} dat-attr={5}>
                                            All
                                        </a>
                                    </li>
                                    <li
                                        className={selectedSportId === 4 ? 'col-lg-2 col-xs-3 active' : 'col-lg-2 col-xs-3'}
                                        id="Cricket"
                                        style={{ padding: 0 }}
                                    >
                                        <a onClick={() => handleSportTabClick(4)} dat-attr={4}>
                                            Cricket
                                        </a>
                                    </li>
                                    <li className={selectedSportId === 2 ? 'col-lg-2 col-xs-3 active' : 'col-lg-2 col-xs-3'} id="Tennis" style={{ padding: 0 }}>
                                        <a onClick={() => handleSportTabClick(2)} dat-attr={2}>
                                            Tennis
                                        </a>
                                    </li>
                                    <li className={selectedSportId === 1 ? 'col-lg-2 col-xs-3 active' : 'col-lg-2 col-xs-3'} id="Soccer" style={{ padding: 0 }}>
                                        <a onClick={() => handleSportTabClick(1)} dat-attr={1}>
                                            Soccer
                                        </a>
                                    </li>
                                    <li id="Fancy" className={selectedSportId === 0 ? 'col-lg-2 col-xs-3 active' : 'col-lg-2 col-xs-3'} style={{ padding: 0 }}>
                                        <a onClick={() => handleSportTabClick(0)} dat-attr={0}>
                                            Fancy
                                        </a>
                                    </li>
                                    <li
                                        className="col-lg-2 col-xs-3"
                                        id="LiveCasino"
                                        style={{ padding: 0 }}
                                    >
                                        <a onclick="findbysport('LiveCasino')" dat-attr={0}>
                                            Casino
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div id="divLoading" />
                            {/*Loading class */}
                            <div className="custom-scroll table-responsive">
                                <table
                                    className="table table-striped jambo_table bulk_action"
                                    id="datatables"
                                >
                                    <thead>
                                        <tr className="headings">
                                            <th className="darkpurplecolor">S.No.</th>
                                            <th className="lightgreencolor">Client</th>
                                            <th className="darkpurplecolor">Tech Admin</th>
                                            <th className="lightgreencolor">Super Admin</th>
                                            <th className="darkpurplecolor">Sub Admin</th>
                                            <th className="lightgreencolor">Super Super</th>
                                            <th className="darkpurplecolor">Super</th>
                                            <th className="lightgreencolor">Master</th>
                                            <th className="darkpurplecolor">Description</th>
                                            <th className="lightgreencolor">Selection</th>
                                            <th className="darkpurplecolor">Market</th>
                                            <th className="lightgreencolor">Odds</th>
                                            <th className="darkpurplecolor">Stack</th>
                                            <th className="lightgreencolor">Date</th>
                                            <th className="darkpurplecolor">P_L</th>
                                            <th className="lightgreencolor">Profit</th>
                                            <th className="darkpurplecolor">Liability</th>
                                            <th className="lightgreencolor">Type</th>
                                            <th className="darkpurplecolor">Status</th>
                                            <th className="lightgreencolor">IP</th>
                                            <th className="darkpurplecolor" style={{ display: roleId == 1 || roleId == 2 ? "table-cell" : "none" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="betlistdiv">
                                        {currentItems.length > 0 && currentItems.map((item, index) => (

                                            <tr key={item.id}>
                                                <td>{(currentPage - 1) * perPage + index + 1}</td>
                                                <td>{item.UserN}</td>
                                                <td>{item.TechAdminN}</td>
                                                <td>{item.SuperAdminN}</td>
                                                <td>{item.SubAdminN}</td>
                                                <td>{item.SuperSuperN}</td>
                                                <td>{item.SuperN}</td>
                                                <td>{item.masterN}</td>
                                                <td>{item.Market == "Fancy" ? item.EventName + "/" + item.Event : item.EventName}</td>
                                                <td>{item.Selection}</td>
                                                <td>{item.Market}</td>
                                                <td>{item.OddsRequest}</td>
                                                <td className="">{item.AmountStake}</td>
                                                <td>{Moment(new Date(item.MatchedTime)).tz("Asia/Calcutta").format('ddd MMM DD hh:mm:ss z YYYY')}</td>
                                                <td className={item.ResultAmount < 0 ? 'green' : 'red'}>{item.ResultAmount * (-1)}</td>
                                                <td className="green">{item.Profit}</td>
                                                <td className="red">{item.Liability}</td>
                                                <td>{item.Type}</td>
                                                <td>{item.IsSettlement == 1 ? "SETTLED" : "OPEN"}</td>
                                                <td>{item.IpAddress}</td>
                                                <td style={{ display: roleId == 1 || roleId == 2 ? "block" : "none" }}>
                                                    <>
                                                        <a href='#' className="btn btn-danger btn-xs" style={{ display: item.IsDelete == 0 ? "block" : "none" }} onClick={(e) => { e.preventDefault(); handleAciton(item.BetId, 1) }}> VOID</a><a href='#' className="btn btn-warning btn-xs" style={{ display: item.IsDelete == 1 ? "block" : "none" }} onClick={(e) => { e.preventDefault(); handleAciton(item.BetId, 0) }}> RollBack</a><a href='#' className="btn btn-danger btn-xs" style={{ display: item.IsDelete == 1 ? "block" : "none" }} onClick={(e) => { e.preventDefault(); handleAciton(item.BetId, 2) }}> Delete</a>
                                                    </>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p id="items">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of Entries {filteredData.length}</p>
                                <div className="pagination-row dataTables_paginate paging_simple_numbers">
                                    {Array.from({ length: Math.ceil(filteredData.length / perPage) }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            className={`paginate_button ${currentPage === i + 1 ? 'current' : ''}`}
                                            onClick={() => paginate(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
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
            </div>


        </>



    )
}

export default BetHistory