import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Cookies from 'js-cookie'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function CloseUser() {



    const navigate = useNavigate();
    const { Id } = useParams();
    const { roleId } = useParams();
    const roleIdNumber = parseInt(roleId, 10) + 1;

    const userId = Cookies.get('id')
    const LoggedInroleId = Cookies.get('roleId')
    const LoggedInuserName = Cookies.get('userName').replace(/['"]+/g, '');
    const childRoleId = parseInt(LoggedInroleId, 10) + 1;

    console.log("Child Role Id : " + childRoleId)
    console.log("logged In user Id : " + userId)
    console.log("logged In Role Id : " + LoggedInroleId)
    console.log("Params Id  : " + Id)
    console.log("Params role ID  : " + roleId)

    const [usersData, setUsersData] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        fetchUserData();

        // fetchUserChild()

    }, [roleId]) 


    const fetchUserData = async () => {
        try {
            const fetched = await fetch('http://localhost:5000/closeUsers');
            const response = await fetched.json();
            console.log("Get Users Api : " + JSON.stringify(response.data));


            // setData(response.data)




            const clikedRoleId = roleId
            console.log("Cliked Role Id : " + clikedRoleId)

            if (clikedRoleId - 1 == LoggedInroleId) {
                console.log("cliked role ID is 7 and loggedIn user RoleId is : " + LoggedInroleId)
                if (response.data && Array.isArray(response.data)) {
                    // Combine the three arrays into a single array
                    const filteredData = response.data.filter((item) => item.RoleId == roleId && item.ParentId == userId);

                    // roleId 
                    console.log("filteredData Child after condition : " + JSON.stringify(filteredData));
                    const filterCloseUser = filteredData.filter(item => item.CloseUser == 1 || item.CloseUserParent == 1)

                    console.log("Filter Close User : " + JSON.stringify(filterCloseUser))
                    setData(filteredData)
                }
            } else {
                console.log("we fetch from loggedIn user's roleId if not - 1: " + LoggedInroleId)


                if (response.data && Array.isArray(response.data)) {
                    // Combine the three arrays into a single array
                    const filteredData = response.data.filter((item) => item.RoleId == parseInt(LoggedInroleId) + 1 && item.ParentId == userId);

                    // roleId 
                    console.log("filteredData Child after condition 1 : " + JSON.stringify(filteredData));

                    // again check

                    if ((clikedRoleId - 1) == (filteredData[0].RoleId)) {
                        // Combine the three arrays into a single array
                        const filteredData1 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData.some(child2 => child2.Id == item.ParentId));

                        // roleId 
                        console.log("filteredData Child after condition 2: " + JSON.stringify(filteredData1));
                        console.log("For If Lenght 1: " + filteredData1.length)
                        setData(filteredData1)

                    } else {

                        // Combine the three arrays into a single array
                        const filteredData1 = response.data.filter((item) => item.RoleId == filteredData[0].RoleId + 1 && filteredData.some(child2 => child2.Id == item.ParentId));

                        // console.log("Condition 2 else : " + filteredData1[0].RoleId + " " + (clikedRoleId - 1))
                        console.log("Lenght 1: " + filteredData1.length)

                        if ((clikedRoleId - 1) == filteredData1[0].RoleId) {
                            // Combine the three arrays into a single array
                            const filteredData2 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData1.some(child2 => child2.Id == item.ParentId));

                            // roleId 
                            console.log("filteredData Child after condition 3: " + JSON.stringify(filteredData2))
                            setData(filteredData2)
                        } else {
                            // Combine the three arrays into a single array
                            const filteredData2 = response.data.filter((item) => item.RoleId == filteredData1[0].RoleId + 1 && filteredData1.some(child2 => child2.Id == item.ParentId));

                            // console.log("Condition 2 else : " + filteredData1[0].RoleId + " " + (clikedRoleId - 1))
                            console.log("Lenght 2: " + filteredData2.length)


                            if (filteredData1.length > 0 && (clikedRoleId - 1) == filteredData1[0]?.RoleId) {
                                // Combine the three arrays into a single array
                                const filteredData2 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData1.some(child2 => child2.Id == item.ParentId));

                                // roleId 
                                console.log("filteredData Child after condition 3: " + JSON.stringify(filteredData2))
                                setData(filteredData2)
                            } else {
                                // Combine the three arrays into a single array
                                const filteredData3 = response.data.filter((item) => item.RoleId == filteredData2[0].RoleId + 1 && filteredData2.some(child2 => child2.Id == item.ParentId));

                                // console.log("Condition 2 else : " + filteredData1[0].RoleId + " " + (clikedRoleId - 1))
                                console.log("Lenght 3: " + filteredData3.length)

                                if (filteredData2.length > 0 && (clikedRoleId - 1) == filteredData2[0]?.RoleId) {
                                    // Combine the three arrays into a single array
                                    const filteredData3 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData2.some(child2 => child2.Id == item.ParentId));

                                    // roleId 
                                    console.log("filteredData Child after condition 4: " + JSON.stringify(filteredData3))
                                    setData(filteredData3)
                                } else {
                                    // Combine the three arrays into a single array
                                    const filteredData4 = response.data.filter((item) => item.RoleId == filteredData3[0].RoleId + 1 && filteredData3.some(child2 => child2.Id == item.ParentId));

                                    // console.log("Condition 2 else : " + filteredData1[0].RoleId + " " + (clikedRoleId - 1))
                                    console.log("Lenght 4: " + filteredData4.length)

                                    if (filteredData3.length > 0 && (clikedRoleId - 1) == filteredData3[0]?.RoleId) {
                                        // Combine the three arrays into a single array
                                        const filteredData4 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData3.some(child2 => child2.Id == item.ParentId));

                                        // roleId 
                                        console.log("filteredData Child after condition 5: " + JSON.stringify(filteredData4))
                                        setData(filteredData4)
                                    }
                                    else {
                                        // Combine the three arrays into a single array
                                        const filteredData5 = response.data.filter((item) => item.RoleId == filteredData4[0].RoleId + 1 && filteredData4.some(child2 => child2.Id == item.ParentId));

                                        // console.log("Condition 2 else : " + filteredData1[0].RoleId + " " + (clikedRoleId - 1))
                                        console.log("Lenght 5: " + filteredData5.length)

                                        if (filteredData4.length > 0 && (clikedRoleId - 1) == filteredData4[0]?.RoleId) {
                                            // Combine the three arrays into a single array
                                            const filteredData5 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData4.some(child2 => child2.Id == item.ParentId));

                                            // roleId 
                                            console.log("filteredData Child after condition 6: " + JSON.stringify(filteredData5))
                                            console.log("For If Lenght6 : " + filteredData5.length)
                                            setData(filteredData5)
                                        }
                                        else {
                                            // Combine the three arrays into a single array
                                            const filteredData6 = response.data.filter((item) => item.RoleId == filteredData5[0].RoleId + 1 && filteredData5.some(child2 => child2.Id == item.ParentId));

                                            // console.log("Condition 2 else : " + filteredData1[0].RoleId + " " + (clikedRoleId - 1))
                                            console.log("Lenght6 : " + filteredData6.length)

                                            if (filteredData5.length > 0 && (clikedRoleId - 1) == filteredData5[0]?.RoleId) {
                                                // Combine the three arrays into a single array
                                                const filteredData6 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData5.some(child2 => child2.Id == item.ParentId));

                                                // roleId 
                                                console.log("filteredData Child after condition 7: " + JSON.stringify(filteredData6))
                                                setData(filteredData6)
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


        catch (error) {
            console.error("Error fetching Users api " + error);
        }

    }


    const handleChild = (roleId, Id) => {
        // navigate(`/closeUser/${roleId}/${Id}`);

        console.log("Role Id is : ", roleId, "User Id : ", Id)
        let selectedUserData = {
            userId: [Id],
            roleId: [roleId],
            betOption: "",
            userOption: "",
            closeUser: 0,
        };

        if (selectedUserData.userId != 0) {

            console.log("Selected user option data : " + JSON.stringify(selectedUserData))
            Swal.fire({
                title: "Conformation",
                text: "Are you sure",
                icon: "warning",
                confirmButtonText: "Yes",
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        // Send selectedUserData to backend using fetch or any other method
                        const response = await fetch('http://localhost:5000/updateUser', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(selectedUserData),
                        });

                        // const responseData = await response.text();
                        const responseData = await response.json();

                        console.log("Response data : ", responseData)
                        if (responseData.update == 'Ok') {

                            console.log("Response message after click : ", responseData.message)

                            console.log("Response selected users are : " + JSON.stringify(responseData)); // Log response if needed
                            // Handle successful response from backend
                            Swal.fire({
                                position: "top-end",
                                icon: "Update Successful",
                                title: "Update Successful",
                                showConfirmButton: false,
                                timer: 1500
                            })


                            fetchUserData()
                            // // Deselect checkboxes
                            // const checkboxes = document.querySelectorAll('.select-users');
                            // checkboxes.forEach(checkbox => {
                            //     checkbox.checked = false;
                            // });
                            // // Reset selected option
                            // const userActionSelect = document.getElementById('useraction');
                            // userActionSelect.value = -1;

                        } else {
                            // Handle error response from backend
                            console.error('Error updating user:', response.statusText);

                            // const responseData = await response.text();
                            // console.log("Response selected users are : " + responseData); // Log response if needed
                            // Handle successful response from backend
                            Swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: responseData.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    } catch (error) {
                        console.error('Error updating user:', error);
                    }
                }
            });


        }
    }






    return (
        <>

            <div className="nav-md">
                <div className="container body">

                    <Header />

                    <div className="right_col" role="main" style={{ minHeight: 599 }}>
                        <div className="loader" style={{ display: "none" }} />
                        <div className="col-md-12" style={{}}>
                            <div className="title_new_at">
                                Closed Users
                                <form className="usersech user-mobile" id="userListForm">
                                    <input
                                        type="search"
                                        name="mstruserid"
                                        id="myInput"
                                        placeholder="Search here"
                                        defaultValue=""
                                    />
                                    <button className="fa fa-search" aria-hidden="true" />
                                </form>
                            </div>
                        </div>
                        <div className="clearfix" />
                        <div className="">
                            <div className="popup_col_12">
                                <div className="tab_bets get-mchlist">
                                    <ul id="betsalltab" className="nav nav-pills">
                                        {/**/}
                                        {/**/}
                                        <li
                                            id="supersuperli"
                                            className={roleId <= "2" ? "active" : ""}
                                            style={{ display: LoggedInroleId == "1" ? "block" : "none" }}
                                        >
                                            <a href='/closeUser/2/0'>Tech Admin</a>
                                        </li>
                                        {/**/}
                                        <li id="supermasterli" className={roleId == "3" ? "active" : ""} style={{ display: LoggedInroleId <= "2" ? "block" : "none" }}>
                                            <a href='/closeUser/3/0'>Super Admin</a>
                                        </li>
                                        {/**/}
                                        <li id="supermasterli" className={roleId == "4" ? "active" : ""} style={{ display: LoggedInroleId <= "3" ? "block" : "none" }}>
                                            <a href='/closeUser/4/0'>Sub Admin</a>
                                        </li>
                                        {/**/}
                                        <li id="supermasterli" className={roleId == "5" ? "active" : ""} style={{ display: LoggedInroleId <= "4" ? "block" : "none" }}>
                                            <a href='/closeUser/5/0'>Super Super</a>
                                        </li>
                                        {/**/}
                                        <li id="supermasterli" className={roleId == "6" ? "active" : ""} style={{ display: LoggedInroleId <= "5" ? "block" : "none" }}>
                                            <a href='/closeUser/6/0'>Super</a>
                                        </li>
                                        {/**/}
                                        <li id="masterli" className={roleId == "7" ? "active" : ""} style={{ display: LoggedInroleId <= "6" ? "block" : "none" }}>
                                            <a href='/closeUser/7/0'>Master</a>
                                        </li>
                                        {/**/}
                                        <li id="userli" className={roleId == "8" ? "active" : ""} style={{ display: LoggedInroleId <= "7" ? "block" : "none" }}>
                                            <a href='/closeUser/8/0'>Users</a>
                                        </li>
                                        {/**/}
                                    </ul>
                                    {/**/}
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="x_panel userwidth1">
                                    <div className="row detailtop deskaction" style={{ margin: 0 }}>
                                        <div className="lastdetail">
                                            <span className="detailinfo">
                                                <b>S</b> : Statement
                                            </span>
                                            <span className="detailinfo">
                                                <b>PL</b> : Profit Loss
                                            </span>
                                            <span className="detailinfo">
                                                <b>P-R</b> : Partnerhsip
                                            </span>
                                            <span className="detailinfo">
                                                <b>P</b> : Change Password
                                            </span>
                                            <span className="detailinfo">
                                                <b>D-W</b> : Free Chip In Out
                                            </span>
                                            <span className="detailinfo">
                                                <b>O</b> : Open Account
                                            </span>
                                        </div>
                                    </div>
                                    <div id="divLoading" />
                                    {/*Loading class */}
                                    <div className="x_content">
                                        <div className="table-responsive" id="contentreplace">
                                            <table
                                                className="table table-striped jambo_table bulk_action"
                                                id="datatabless"
                                            >
                                                <thead>
                                                    <tr className="headings">
                                                        <th className="darkpurplecolor">S.No.</th>
                                                        <th className="lightgreencolor">User ID</th>
                                                        {/* <th className="darkpurplecolor">Website</th> */}
                                                        <th className="lightgreencolor">User Name</th>
                                                        <th className="darkpurplecolor">Parent</th>
                                                        <th className="lightgreencolor">Balance</th>
                                                        <td className="darkpurplecolor">Action</td>
                                                    </tr>
                                                </thead>
                                                <tbody id="ssttable">
                                                    {data.filter(item => item.CloseUser == 1 || item.CloseUserParent == 1).map((item, index) => (

                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td className=" " style={{ paddingBottom: 0 }}>
                                                                {item.UserName}
                                                                <span className="m-bg">
                                                                    <i
                                                                        className="fa fa-user fa_custom"
                                                                        aria-hidden="true"
                                                                        style={{ color: "red" }}
                                                                    />
                                                                </span>
                                                            </td>
                                                            {/* <td>4bets.in</td> */}
                                                            <td>{item.FullName}</td>
                                                            <td>{item.ParentName}</td>
                                                            <td className=" ">{item.ResultAmountU != null ? item.ResultAmountU : 0}</td>
                                                            <td className="last">
                                                                <div className="">
                                                                    <a
                                                                        className="btn btn-danger btn-xs"
                                                                        href="/statementByUser/golu0001/3"
                                                                    >
                                                                        <span>S</span>{" "}
                                                                    </a>{" "}
                                                                    <a
                                                                        className="btn btn-primary btn-xs"
                                                                        href="/downlineprofitloss/golu0001/10/1/0/0/All"
                                                                    >
                                                                        {" "}
                                                                        <span> PL </span>{" "}
                                                                    </a>{" "}
                                                                    <a
                                                                        className="btn btn-primary btn-xs"
                                                                        data-toggle="modal"
                                                                        data-target="#userpartnershipModal"
                                                                        onclick="getParentDetails('655987f34c06139d84eea50b','3')"
                                                                        title="Partnership"
                                                                    >
                                                                        <span>P-R</span>
                                                                    </a>{" "}
                                                                    <a
                                                                        className="btn btn-danger btn-xs"
                                                                        data-toggle="modal"
                                                                        data-target="#cngpwd"
                                                                        onclick="setPasswordId('golu0001')"
                                                                        href=""
                                                                        title="Change Password"
                                                                    >
                                                                        <span>P</span>
                                                                    </a>{" "}
                                                                    <a
                                                                        className="btn btn-warning btn-xs"
                                                                        href=""
                                                                        data-toggle="modal"
                                                                        data-target="#depositchippopup"
                                                                        onclick="preDepo('655090ae4c0613daebf5f0d8','Golu','golu0001','0')"
                                                                        title="Free Chip In Out"
                                                                    >
                                                                        <span>D</span>
                                                                    </a>{" "}
                                                                    <a
                                                                        className="btn btn-warning btn-xs"
                                                                        href=""
                                                                        data-toggle="modal"
                                                                        data-target="#withdrawlchippopup"
                                                                        title="Free Chip In Out"
                                                                        onclick="preWith('655090ae4c0613daebf5f0d8','Golu','golu0001','0')"
                                                                    >
                                                                        <span>W</span>
                                                                    </a>{" "}
                                                                    <a
                                                                        className="btn btn-primary btn-xs"
                                                                        title="Open Account"
                                                                        onClick={(e) => { e.preventDefault(); handleChild(item.RoleId, item.Id) }}
                                                                    >
                                                                        {" "}
                                                                        <span> O </span>{" "}
                                                                    </a>{" "}
                                                                </div>
                                                            </td>
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
                                                Showing 1 to 8 of Entries 8
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
                            </div>
                        </div>
                        <div
                            id="withdrawlchippopup"
                            className="modal fade"
                            role="dialog"
                            style={{ display: "none" }}
                        >
                            {/* Change Password */}
                            <div className=" " id="" role="main">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        {/* dialog body */}
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">
                                                ×
                                            </button>
                                            <h4 className="modal-title">
                                                <span id="title_w" />{" "}
                                            </h4>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div id="UpdateChipsMsg" />
                                                <form id="UpdateFreeChips" method="post">
                                                    <div className="col-md-6">
                                                        <input type="hidden" id="pname_w" />
                                                        <label> Free Chips : </label>
                                                        <input
                                                            type="number"
                                                            onkeypress="return isNumberKey(event)"
                                                            name="Chips"
                                                            onkeyup="calcWith()"
                                                            className="form-control"
                                                            id="ChipsValue_w"
                                                            required=""
                                                        />
                                                        <span
                                                            id="ChipsN_w"
                                                            style={{ color: "red" }}
                                                            className="errmsg"
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="tabel_content ">
                                                            <table className="table-bordered">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Parent Free Chips</td>
                                                                        <td className="font-bold" id="pbalw">
                                                                            2.6622839E7{" "}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>User Balance </td>
                                                                        <td className="font-bold" id="ubalw">
                                                                            {" "}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Parent New Free Chips</td>
                                                                        <td>
                                                                            <span id="ParantNewFreeChips_w" />{" "}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>User New Free Chips</td>
                                                                        <td>
                                                                            <span id="myNewFreeChips_w" />{" "}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 modal-footer">
                                                        <input
                                                            type="hidden"
                                                            className="form-control"
                                                            id="action"
                                                            defaultValue="W"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            className="form-control"
                                                            id="FreeChip"
                                                            defaultValue={200000.0}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="red_button pull-right chip-inout-button"
                                                            id="withdrawChips"
                                                            style={{ background: "red", borderColor: "red" }}
                                                        >
                                                            withdrawal
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        {/* dialog buttons */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            id="depositchippopup"
                            className="modal fade"
                            role="dialog"
                            style={{ display: "none" }}
                        >
                            {/* Change Password */}
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    {/* dialog body */}
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal">
                                            ×
                                        </button>
                                        <h4 className="modal-title">
                                            <span id="title_d" />{" "}
                                        </h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div id="UpdateChipsMsg" />
                                            <form id="UpdateFreeChips" method="post">
                                                <div className="col-md-6">
                                                    <input type="hidden" id="pname_d" />
                                                    <label> Free Chips : </label>
                                                    <input
                                                        type="number"
                                                        onkeypress="return isNumberKey(event)"
                                                        name="Chips"
                                                        onkeyup="calcDepo()"
                                                        className="form-control"
                                                        id="ChipsValue_d"
                                                        required=""
                                                    />
                                                    <span
                                                        id="ChipsN_d"
                                                        style={{ color: "red" }}
                                                        className="errmsg"
                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="tabel_content ">
                                                        <table className="table-bordered">
                                                            <tbody>
                                                                <tr>
                                                                    <td>Parent Free Chips</td>
                                                                    <td className="font-bold" id="pbald">
                                                                        2.6622839E7
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>User Balance </td>
                                                                    <td className="font-bold" id="ubald">
                                                                        {" "}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Parent New Free Chips</td>
                                                                    <td>
                                                                        <span id="ParantNewFreeChips" />{" "}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>User New Free Chips</td>
                                                                    <td>
                                                                        <span id="myNewFreeChips" />{" "}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 modal-footer">
                                                    <input
                                                        type="hidden"
                                                        className="form-control"
                                                        id="action"
                                                        defaultValue="D"
                                                    />
                                                    <input
                                                        type="hidden"
                                                        className="form-control"
                                                        id="FreeChip"
                                                        defaultValue={200000.0}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-success pull-right chip-inout-button"
                                                        id="depositChips"
                                                    >
                                                        {/* onclick="save_admin();" */}Deposit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {/* dialog buttons */}
                                </div>
                            </div>
                        </div>
                        <div
                            id="cngpwd"
                            className="modal fade"
                            role="dialog"
                            style={{ display: "none" }}
                        >
                            {/* Change Password */}
                            <div className=" " id="changeUserPassword" role="main">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">
                                                ×
                                            </button>
                                            <input type="hidden" id="nwpassid" />
                                            <h4 className="modal-title">Change Password</h4>
                                        </div>
                                        <div className="modal-body">
                                            <div id="PassUserMsg">
                                                <span id="passerror" style={{ color: "red" }} />
                                            </div>
                                            <div className="">
                                                <form id="" method="post" autoComplete="off">
                                                    <div className="col-md-6 col-xs-6">
                                                        <label>New Password</label>
                                                        <input
                                                            type="password"
                                                            name="newPassword"
                                                            defaultValue=""
                                                            className="form-control"
                                                            id="newPassword"
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    <div className="col-md-6 col-xs-6">
                                                        <label>Confirm Password</label>
                                                        <input
                                                            type="password"
                                                            name="confirm_password"
                                                            defaultValue=""
                                                            className="form-control"
                                                            id="confirm_password"
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    <div className="col-md-12 col-xs-6 modal-footer">
                                                        <button
                                                            type="button"
                                                            onclick="changePassword()"
                                                            className="blue_button"
                                                            id="change_pass"
                                                        >
                                                            Change
                                                        </button>
                                                        <button
                                                            data-dismiss="modal"
                                                            type="button"
                                                            className="blue_button"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            id="userpartnershipModal"
                            className="modal fade"
                            role="dialog"
                            style={{ display: "none" }}
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal">
                                            ×
                                        </button>
                                        <h4 className="modal-title" id="tital_change">
                                            Partnership
                                        </h4>
                                    </div>
                                    <div className="modal-body">
                                        <div
                                            className="col-lg-12 col-xs-12"
                                            style={{ padding: 0, marginBottom: 10 }}
                                        >
                                            <div className="sub_heading">
                                                <span id="tital_change">Match partnership</span>{" "}
                                            </div>
                                            <div className="col-md-4">
                                                <label> Admin </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="admin_p"
                                                    defaultValue={0}
                                                    disabled=""
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label> Hyper </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="hyper_p"
                                                    defaultValue={0}
                                                    disabled=""
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label> Super Master </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="sm_p"
                                                    defaultValue={0}
                                                    disabled=""
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label> Master </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="m_p"
                                                    defaultValue={0}
                                                    disabled=""
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-12 col-xs-12"
                                            style={{ padding: 0, marginBottom: 10 }}
                                        >
                                            <div className="sub_heading">
                                                <span id="tital_change">Casino partnership</span>{" "}
                                            </div>
                                            <div className="col-md-4">
                                                <label> Admin </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="admin_pc"
                                                    defaultValue={0}
                                                    disabled=""
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label> Hyper </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="hyper_pc"
                                                    defaultValue={0}
                                                    disabled=""
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label> Super Master </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="sm_pc"
                                                    defaultValue={0}
                                                    disabled=""
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label> Master </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="m_pc"
                                                    defaultValue={0}
                                                    disabled=""
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-12 col-xs-12"
                                            style={{ padding: 0, marginBottom: 10 }}
                                        >
                                            <div className="sub_heading">
                                                <span id="tital_change">Teenpatti partnership</span>{" "}
                                            </div>
                                            <div className="col-md-4">
                                                <label> Admin </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="admin_pt"
                                                    defaultValue={0}
                                                    disabled=""
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label> Hyper </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="hyper_pt"
                                                    defaultValue={0}
                                                    disabled=""
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label> Super Master </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="sm_pt"
                                                    defaultValue={0}
                                                    disabled=""
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label> Master </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="m_pt"
                                                    defaultValue={0}
                                                    disabled=""
                                                />
                                            </div>
                                        </div>
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
            </div>

        </>

    )



}

export default CloseUser