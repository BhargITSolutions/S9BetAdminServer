import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';

function DeleteBetHistory() {

    const userId = Cookies.get('id')
    const LoggedInuserName = Cookies.get('userName').replace(/['"]+/g, '');

    const [data, setData] = useState([])

    useEffect(() => {

        fetchBetHistoryApi();
    }, [])


    const fetchBetHistoryApi = async () => {
        try {
            const fetched = await fetch(`http://localhost:5000/betHistory/${userId}`);
            const response = await fetched.json();
            console.log("Get BetHistory Api  : " + JSON.stringify(response.data));

            const filterDeleteBet = response.data.filter(item => item.IsDelete == 2)

            filterDeleteBet.sort((a, b) => new Date(b.DeleteTime) - new Date(a.DeleteTime));
            console.log("Formatted and Sorted Bet History data:", filterDeleteBet);


            setData(filterDeleteBet)

        } catch (error) {
            console.error("Error fetching Users api " + error);
        }
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
                        
                        fetchBetHistoryApi()
                        // filterBetUsers();
                        // handleFilter()
                        // setFilterClicked(true)
                        // setLoad(true)
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



    return (
        <>
            <div className="nav-md">
                <div className="container body">

                    <Header />
                    {/* page content */}
                    <div className="right_col" role="main" style={{ minHeight: 278 }}>
                        <div className="loader" style={{ display: "none" }} />
                        <div className="col-md-12">
                            <div className="title_new_at">
                                Delete Bet History
                                <div className="pull-right">
                                    <button className="btn_common">Back</button>{" "}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="filter_page  data-background">
                                {/*  <form method="post" id="formSubmit" style="color:#000;"><input type="hidden" name="compute" value=""> */}
                                {/* </form> */}
                            </div>
                        </div>
                        <div className="">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div id="divLoading" />
                                <div className="" id="restable">
                                    <table
                                        className="table table-striped jambo_table bulk_action"
                                        id="usr"
                                    >
                                        <thead>
                                            <tr className="headings">
                                                <th className="darkpurplecolor">S.No.</th>
                                                <th className="lightgreencolor">Placed Date</th>
                                                <th className="darkpurplecolor">Deleted Date</th>
                                                <th className="lightgreencolor">UserName</th>
                                                <th className="darkpurplecolor">Market</th>
                                                <th className="lightgreencolor">Deleted By</th>
                                                <th className="darkpurplecolor">Match Name</th>
                                                <th className="lightgreencolor">Selection Name </th>
                                                <th className="darkpurplecolor">Odds</th>
                                                <th className="lightgreencolor">Stack</th>
                                                <th className="darkpurplecolor">Ip Address</th>
                                                <th className="lightgreencolor">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="usetable">
                                            {data.length > 0 && data.map((item, index) =>(

                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.PlaceTime}</td>
                                                <td>{item.DeleteTime}</td>
                                                <td>{item.UserN}</td>
                                                <td>{item.Market}</td>
                                                <td>{item.DeletedBy}</td>
                                                <td>{item.EventName}</td>
                                                <td>{item.Selection}</td>
                                                <td>{item.OddsRequest}</td>
                                                <td>{item.AmountStake}</td>
                                                <td>{item.IpAddress}</td>
                                                <td><a href='#' className="btn btn-warning btn-xs" onClick={(e) => { e.preventDefault(); handleAciton(item.BetId, 0) }}> RollBack</a></td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="dataTables_wrapper no-footer">
                                    <div
                                        className="dataTables_info"
                                        id="datatable_info"
                                        role="status"
                                        aria-live="polite"
                                    >
                                        Showing 1 to 10 of Entries 10
                                    </div>
                                    <div
                                        className="dataTables_paginate paging_simple_numbers"
                                        id="datatable_paginate"
                                    >
                                        <a
                                            className="paginate_button previous disabled"
                                            aria-controls="datatable"
                                            data-dt-idx={0}
                                            tabIndex={0}
                                            id="datatable_previous"
                                        >
                                            Previous
                                        </a>
                                        <span id="pages_data">
                                            <a
                                                className="paginate_button current"
                                                aria-controls="datatable"
                                                data-dt-idx={1}
                                                tabIndex={0}
                                            >
                                                1
                                            </a>
                                        </span>
                                        <a
                                            className="paginate_button next disabled"
                                            aria-controls="datatable"
                                            data-dt-idx={3}
                                            tabIndex={0}
                                            id="datatable_next"
                                        >
                                            Next
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row " style={{ display: "none" }}>
                            <div className="col-md-12 col-xs-12 ">
                                <div className="title_new_at"> Users List</div>
                                <div className=" searchuser" style={{ marginBottom: 10 }}>
                                    <div
                                        className="dataTables_length"
                                        id="datatable_length"
                                        style={{ padding: 10 }}
                                    >
                                        <label>
                                            Show
                                            <select
                                                name="datatable_length"
                                                aria-controls="datatable"
                                                className=""
                                            >
                                                <option value={10}>10</option>
                                                <option value={25}>25</option>
                                                <option value={50}>50</option>
                                                <option value={100}>100</option>
                                            </select>{" "}
                                            entries
                                        </label>
                                    </div>
                                    <div
                                        className="col-md-6 col-xs-6"
                                        style={{ textAlign: "right", padding: 10, float: "right" }}
                                    >
                                        <form className="usersech block_5" id="userListForm">
                                            <input type="hidden" name="formSubmit" defaultValue={1} />
                                            <input
                                                type="hidden"
                                                name="perpage"
                                                id="perpage"
                                                defaultValue={10}
                                            />
                                            <div id="datatable_filter" className="dataTables_filter">
                                                <label>
                                                    <input
                                                        style={{ float: "right", width: "100% !important" }}
                                                        id=""
                                                        type="search"
                                                        className="sr"
                                                        placeholder="Search Here..."
                                                        aria-controls="datatable"
                                                    />
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12"></div>
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{ padding: 10 }}>
                                <div id="divLoading"> </div>
                                {/*Loading class */}
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

export default DeleteBetHistory