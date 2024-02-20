import React from 'react'
import Header from './Header'
import Footer from './Footer'

function UserList() {
    return (
        <>
            <div className="nav-md">
                <div className="container body">

                    <Header />
                    {/* page content */}
                    <div className="right_col" role="main" style={{ minHeight: 357 }}>
                        <div className="col-md-12">
                            <div className="title_new_at">
                                <span className="lable-user-name" id="header">
                                    User Listing
                                </span>
                                <select
                                    id="pages"
                                    className="user-select"
                                    style={{ color: "black", fontSize: 13 }}
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <div className="usersech user-mobile">
                                    <input
                                        type="search"
                                        name="mstruserid"
                                        id="myInput"
                                        placeholder="Search here"
                                        defaultValue=""
                                    />
                                    <button
                                        className="fa fa-search"
                                        id="submit_form_button"
                                        onclick="searchList()"
                                        data-attr="submit"
                                        aria-hidden="true"
                                    />
                                </div>
                                <select
                                    className="user-mobile custom-user-select"
                                    id="useraction"
                                    style={{ color: "black", fontSize: 13 }}
                                >
                                    <option value={-1}>Select Action</option>
                                    <option value="betlock">Lock Betting</option>
                                    <option value="betunlock">Open Betting</option>
                                    <option value="lock">Lock User</option>
                                    <option value="unlock">Unlock User</option>
                                    <option value="delete">Close User Account</option>
                                </select>
                                <button
                                    onclick="perfromAction()"
                                    className="btn btn-warning btn-xs"
                                    style={{ padding: "4px 5px" }}
                                >
                                    ACTION
                                </button>
                                <button
                                    id="addDUser"
                                    className="btn btn-warning btn-xs"
                                    style={{ padding: "4px 5px", display: "none" }}
                                    data-toggle="modal"
                                    onclick="addUser('1','658f01564c06135bb26f7ac0')"
                                    data-target="#userModal"
                                >
                                    ADD USER
                                </button>
                                <button
                                    className="btn btn-warning btn-xs"
                                    id="backbutton"
                                    style={{ padding: "4px 5px", display: "none" }}
                                    onclick="javascript:history.go(-1)"
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                        <div className="">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div id="divLoading" />
                                <div className="" id="restable">
                                    <table
                                        className="table table-striped jambo_table bulk_action"
                                        id="sst"
                                        style={{ display: "none" }}
                                    >
                                        <thead>
                                            <tr className="headings">
                                                <th className="darkpurplecolor">S.No.</th>
                                                <th className="lightgreencolor">User ID</th>
                                                <th className="lightgreencolor">User Name</th>
                                                <th className="darkpurplecolor">Website</th>
                                                <th className="lightgreencolor">Parent</th>
                                                <th className="darkpurplecolor">Credit Limit</th>
                                                <th className="lightgreencolor">Credit given</th>
                                                <th className="darkpurplecolor">Balance</th>
                                                <th className="lightgreencolor">Acc. Lock</th>
                                                <th className="darkpurplecolor">Bet Lock</th>
                                                <th className="lightgreencolor">Partnership</th>
                                                <th className="darkpurplecolor">Partnership Casino</th>
                                                <th className="lightgreencolor">Partnership TeenPatti</th>
                                                <th className="darkpurplecolor">M.comm</th>
                                                <th className="lightgreencolor">S.comm</th>
                                                <th className="darkpurplecolor">Depo. / With.</th>
                                                <th className="lightgreencolor">View More</th>
                                            </tr>
                                        </thead>
                                        <tbody id="ssttable" />
                                    </table>
                                    <table
                                        className="table table-striped jambo_table bulk_action"
                                        id="usr"
                                    >
                                        <thead>
                                            <tr className="headings">
                                                <th className="darkpurplecolor">S.No.</th>
                                                <th className="lightgreencolor">User ID</th>
                                                <th className="lightgreencolor">User Name</th>
                                                <th className="darkpurplecolor">Website</th>
                                                <th className="lightgreencolor">Parent</th>
                                                <th className="darkpurplecolor">Master</th>
                                                <th className="lightgreencolor">Winnings</th>
                                                <th className="darkpurplecolor">Credit Limits </th>
                                                <th className="lightgreencolor">Exposure </th>
                                                <th className="darkpurplecolor">Balance</th>
                                                <th className="lightgreencolor">Acc. Lock</th>
                                                <th className="darkpurplecolor">Bet Lock</th>
                                                <th className="lightgreencolor">M.comm</th>
                                                <th className="darkpurplecolor">S.comm</th>
                                                <th className="lightgreencolor">Depo. / With.</th>
                                                <th className="darkpurplecolor">View More</th>
                                            </tr>
                                        </thead>
                                        <tbody id="usetable">
                                            <tr>
                                                <td>
                                                    1{" "}
                                                    <input
                                                        type="checkbox"
                                                        onclick="addUserId('658f17e44c06135bb26f9574')"
                                                        defaultValue="bandul@"
                                                        className="select-users"
                                                    />
                                                </td>
                                                <td className="" style={{ paddingBottom: 0 }}>
                                                    <span className="m-bg">
                                                        bandul@{" "}
                                                        <i
                                                            className="fa fa-user fa_custom"
                                                            aria-hidden="true"
                                                            style={{ color: "red" }}
                                                        />
                                                    </span>
                                                </td>
                                                <td className=" ">Bhandul</td>
                                                <td>4bets.in</td>
                                                <td>Ajay(aja)</td>
                                                <td>0</td>
                                                <td className="red">-999974</td>
                                                <td className=" ">0.00</td>
                                                <td>
                                                    <a
                                                        style={{ width: 85 }}
                                                        href="/expobets/1/10/bandul@"
                                                        className="btn btn-success btn-xs"
                                                    >
                                                        {" "}
                                                        0.00
                                                    </a>
                                                </td>
                                                <td className=" ">18.00</td>
                                                <td>No</td>
                                                <td>No</td>
                                                <td className=" ">0%</td>
                                                <td className=" ">0%</td>
                                                <td className=" ">
                                                    <a
                                                        style={{ display: "inline" }}
                                                        className="btn btn-warning btn-xs"
                                                        href=""
                                                        data-toggle="modal"
                                                        data-target="#depositchippopup"
                                                        title="Chip In Out"
                                                        onclick="preDepo('658f02294c06135bb26f89f5','Bhandul','bandul@','18')"
                                                    >
                                                        <span>D</span>
                                                    </a>
                                                    <a
                                                        style={{ display: "inline" }}
                                                        className="btn btn-warning btn-xs"
                                                        href=""
                                                        data-toggle="modal"
                                                        title="Chip In Out"
                                                        data-target="#withdrawlchippopup"
                                                        onclick="preWith('658f02294c06135bb26f89f5','Bhandul','bandul@','18')"
                                                    >
                                                        <span>W</span>
                                                    </a>
                                                </td>
                                                <td className="last">
                                                    <span className="dropdown">
                                                        <a
                                                            href="#"
                                                            className="dropdown-toggle btn btn-xs btn-success"
                                                            data-toggle="dropdown"
                                                            role="button"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            View More <span className="caret" />
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                {" "}
                                                                <a className="" href="/statementByUser/bandul@/3">
                                                                    <span>Statement</span>{" "}
                                                                </a>
                                                            </li>
                                                            <li>
                                                                {" "}
                                                                <a className="" href="/loginReport/bandul@">
                                                                    <span>Login Report</span>{" "}
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className=""
                                                                    href="/downlineprofitloss/bandul@/10/1/0/0/All"
                                                                >
                                                                    <span>Profit Loss</span>{" "}
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className=""
                                                                    href=""
                                                                    data-toggle="modal"
                                                                    data-target="#userinfoModal"
                                                                    onclick="getInfo('1')"
                                                                    title="View Account Info"
                                                                >
                                                                    <span>View Info</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className=""
                                                                    href=""
                                                                    data-toggle="modal"
                                                                    data-target="#userpartnershipModal"
                                                                    onclick="getParentDetails('658f17e44c06135bb26f9574','3')"
                                                                    title="Update Partnership"
                                                                >
                                                                    <span>Partnerhsip</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                {" "}
                                                                <a
                                                                    className=""
                                                                    data-toggle="modal"
                                                                    data-target="#cngpwd"
                                                                    href=""
                                                                    onclick="setPasswordId('bandul@')"
                                                                    title="Change Password"
                                                                >
                                                                    <span>Change Password</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                {" "}
                                                                <a
                                                                    className=""
                                                                    href=""
                                                                    data-toggle="modal"
                                                                    data-target="#depositchippopup"
                                                                    title="Chip In Out"
                                                                    onclick="preDepo('658f02294c06135bb26f89f5','Bhandul','bandul@','18')"
                                                                >
                                                                    <span>Chip Deposit</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className=""
                                                                    href=""
                                                                    data-toggle="modal"
                                                                    data-target="#withdrawlchippopup"
                                                                    onclick="preWith('658f02294c06135bb26f89f5','Bhandul','bandul@','18')"
                                                                    title="Chip In Out"
                                                                >
                                                                    <span>Chip Withdrawal</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </span>
                                                </td>
                                            </tr>
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
                                        Showing 1 to 1 of Entries 1
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

                <div
                    id="withdrawlchippopup"
                    className="modal fade"
                    data-backdrop="static"
                    data-keyboard="false"
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
                                        <span id="title_w">Free Chips In/Out of Ajay</span>{" "}
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div id="UpdateChipsMsg" />
                                        <form id="UpdateFreeChips" method="post">
                                            <div className="col-md-6 col-xs-12">
                                                <input type="hidden" id="pname_w" />
                                                <label> Chips : </label>
                                                <input
                                                    type="number"
                                                    name="Chips"
                                                    onkeypress="return isNumberKey(event)"
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
                                            <div className="col-md-12 col-xs-12">
                                                <div className="tabel_content ">
                                                    <table className="table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>Parent Chips</td>
                                                                <td className="font-bold" id="pbalw">
                                                                    0
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>User Balance </td>
                                                                <td className="font-bold" id="ubalw">
                                                                    8
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Parent New Chips</td>
                                                                <td>
                                                                    <span id="ParantNewFreeChips_w" />{" "}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>User New Chips</td>
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
                    className="modal fade in"
                    data-backdrop="static"
                    data-keyboard="false"
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
                                    <span id="title_d">Free Chips In/Out of Ajay</span>{" "}
                                </h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div id="UpdateChipsMsg" />
                                    <form id="UpdateFreeChips" method="post">
                                        <div className="col-md-6 col-xs-12">
                                            <input type="hidden" id="pname_d" />
                                            <label> Chips : </label>
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
                                        <div className="col-md-12 col-xs-12">
                                            <div className="tabel_content ">
                                                <table className="table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>Parent Chips</td>
                                                            <td className="font-bold" id="pbald">
                                                                0
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>User Balance </td>
                                                            <td className="font-bold" id="ubald">
                                                                8
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Parent New Chips</td>
                                                            <td>
                                                                <span id="ParantNewFreeChips" />{" "}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>User New Chips</td>
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
                    id="userModal"
                    className="modal fade in"
                    data-backdrop="static"
                    data-keyboard="false"
                    role="dialog"
                    style={{ display: "none" }}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <form id="" method="post">
                                <div className="popup_form">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal">
                                            ×
                                        </button>
                                        <h4 className="modal-title">
                                            <span id="create_title">Add Master</span>
                                        </h4>
                                    </div>
                                    <div className="modal-body">
                                        <span
                                            id="error_msg"
                                            style={{ color: "red" }}
                                            className="errMsg pay-error"
                                        />
                                        <div className="row">
                                            <div
                                                className="col-md-4 col-xs-6"
                                                id="websdiv"
                                                style={{ display: "none", height: 65 }}
                                            >
                                                <label id="weblable"> Website Name</label>
                                                <select
                                                    id="webs"
                                                    className="user-select"
                                                    style={{ color: "black" }}
                                                >
                                                    <option value={-1}>Select Website</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4 col-xs-6" style={{ height: 65 }}>
                                                <label> Name</label>
                                                <input
                                                    type="text"
                                                    name="master_name"
                                                    className="form-control"
                                                    defaultValue=""
                                                    onkeyup="removeSpecial('left_master_name')"
                                                    id="left_master_name"
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div className="col-md-4 col-xs-6" style={{ height: 65 }}>
                                                <label> Registration Data </label>
                                                <input
                                                    type="text"
                                                    name="FromDate"
                                                    className="form-control"
                                                    id="reg_date"
                                                    autoComplete="off"
                                                    defaultValue=""
                                                    readOnly=""
                                                />
                                            </div>
                                            <div className="col-md-4 col-xs-6" style={{ height: 65 }}>
                                                <label>
                                                    {" "}
                                                    User ID{" "}
                                                    <span
                                                        style={{
                                                            display: "inline",
                                                            fontSize: 12,
                                                            color: "green"
                                                        }}
                                                        id="error_id"
                                                    />
                                                </label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form-control"
                                                    defaultValue=""
                                                    id="left_userid"
                                                    onkeyup="removeSpecialChar()"
                                                    onblur="validateUserId()"
                                                />
                                            </div>
                                            <div className="col-md-4 col-xs-6" style={{ height: 65 }}>
                                                <label> Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    defaultValue=""
                                                    id="left_password"
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div
                                                className="col-md-4 col-xs-6"
                                                id="div_mcom"
                                                style={{ display: "none", height: 65 }}
                                            >
                                                <label> Match Commission (Max 2 %)</label>
                                                <input
                                                    type="number"
                                                    name="commission"
                                                    className="form-control"
                                                    min={0}
                                                    oninput="this.value = Math.abs(this.value)"
                                                    defaultValue={0}
                                                    onkeyup="validateMatchCommission()"
                                                    id="left_mcomm"
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div
                                                className="col-md-4 col-xs-6"
                                                id="part_div"
                                                style={{ height: 65 }}
                                            >
                                                <label id="part_par_m">Partnership [0]</label>
                                                <input
                                                    type="number"
                                                    name="partner"
                                                    className="form-control"
                                                    min={0}
                                                    oninput="this.value = Math.abs(this.value)"
                                                    defaultValue={0}
                                                    id="parent_part"
                                                    onkeyup="validateMatchPartnership()"
                                                    max={100}
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div
                                                className="col-md-4 col-xs-6"
                                                id="partC_div"
                                                style={{ height: 65 }}
                                            >
                                                <label id="part_par_c">Partnership Casino [0]</label>
                                                <input
                                                    type="number"
                                                    name="partnershipCasino"
                                                    min={0}
                                                    oninput="this.value = Math.abs(this.value)"
                                                    className="form-control"
                                                    defaultValue={0}
                                                    id="parent_casino_part"
                                                    onkeyup="validateCasinoPartnership()"
                                                    max={100}
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div
                                                className="col-md-4 col-xs-6"
                                                id="partT_div"
                                                style={{ height: 65 }}
                                            >
                                                <label id="part_par_t" style={{ fontSize: 12 }}>
                                                    Partnership TeenPatti [0]
                                                </label>
                                                <input
                                                    type="number"
                                                    name="partnershipLiveTennPatti"
                                                    min={0}
                                                    oninput="this.value = Math.abs(this.value)"
                                                    defaultValue={0}
                                                    id="parent_3patti_part"
                                                    onkeyup="validateTeenPattiPartnership()"
                                                    className="form-control"
                                                    max={100}
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div className="col-md-12 col-xs-12 modal-footer">
                                                <button
                                                    type="button"
                                                    className="blue_button"
                                                    id="addUser"
                                                    onclick="createChild()"
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    data-dismiss="modal"
                                                    type="button"
                                                    className="blue_button"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>


    )
}

export default UserList