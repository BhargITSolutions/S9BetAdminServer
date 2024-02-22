import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Cookies from 'js-cookie'

function ChipSummary() {

    const userId = Cookies.get('id')
    const roleId = Cookies.get('roleId')


    const [betHistoryByUserId, setBetHistoryByUserId] = useState([])
    const [usersChild, setUserChild] = useState([])
    // const levelRoleId = 

    useEffect(() => {
        fetchBetHistoryApi();

    }, [])


    const fetchBetHistoryApi = async () => {

        let userLevel;


        if (parseInt(roleId) + 1 == 2) {
            userLevel = 'TechAdminI'
        } else if (parseInt(roleId) + 1 == 3) {
            userLevel = 'SuperAdminI'
        } else if (parseInt(roleId) + 1 == 4) {
            userLevel = 'SubAdminI'
        } else if (parseInt(roleId) + 1 == 5) {
            userLevel = 'SuperSuperI'
        } else if (parseInt(roleId) + 1 == 6) {
            userLevel = 'SuperI'
        } else if (parseInt(roleId) + 1 == 7) {
            userLevel = 'masterI'
        } else if (parseInt(roleId) + 1 == 8) {
            userLevel = 'UserI'
        }


        console.log("Role ID by level user : ", userLevel)



        try {
            const fetchedBet = await fetch(`http://localhost:5000/betHistory/${userId}`);
            const responseBet = await fetchedBet.json();

            const fetchUser = await fetch(`http://localhost:5000/getUserByParentId/${userId}`)

            const responseUser = await fetchUser.json();

            // console.log("Get BetHistory Api  : " + JSON.stringify(response.data));
            console.log("Get BetHistory Api length : " + responseBet.data.length);

            console.log("Get Users Api length : " + responseUser.data.length);



            const FilterData = responseBet.data.filter(item => item.IsSettlement == 1 && item.IsDelete == 0)

            console.log("Filtered Data : " + JSON.stringify(FilterData))
            console.log("Filtered Data length : " + FilterData.length)
            setBetHistoryByUserId(FilterData)




            const FilterUser = responseUser.data.filter(item => item.RoleId == parseInt(roleId) + 1)

            console.log("filter user length : " + FilterUser.length)
            // console.log("filter user Id  : " + FilterUser[0].id)




            const mapUsersArray = FilterUser.map(item => item.id);
            console.log("Mapped User ID as Array:", mapUsersArray);
            console.log("Mapped User ID Array type:", typeof mapUsersArray);


            if (Array.isArray(mapUsersArray)) {
                const filterChild = FilterData.filter(item => {
                    // Check if any element in mapUsersArray matches DomainI
                    return mapUsersArray.some(id => id === item.DomainI || id == item.TechAdminI || id == item.SuperAdminI || id == item.SubAdminI || id == item.SuperSuperI || id == item.SuperI || id == item.masterI || id == item.UserI );
                });

                console.log("Filtered Child DomainI: ", filterChild);
            }


            // const filteredParentId = FilterData.filter(item => item.)



        } catch (error) {
            console.error("Error fetching Users api " + error);
        }
    };



    return (


        <>
            <div className="nav-md">
                <div className="container body">
                    <Header />

                    {/* page content */}
                    <div className="right_col" role="main" style={{ minHeight: 599 }}>
                        <div className="loader" style={{ display: "none" }} />
                        <div id="chipData">
                            <div className="col-md-12">
                                <div className="title_new_at">Chip Summary</div>
                            </div>
                            <div className="clearfix" />
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="clearfix data-background">
                                    <div className="col-md-12 col-sm-12 col-xs-12" style={{ padding: 0 }}>
                                        <div className="popup_col_2" style={{ paddingLeft: 0 }}>
                                            <input
                                                type="text"
                                                name="searchTerm"
                                                id="searchTerm"
                                                className="form-control"
                                                placeholder="Search by Name"
                                                defaultValue=""
                                            />
                                        </div>
                                        <div className="popup_col_3">
                                            <button
                                                type="submit"
                                                name="submit"
                                                id="FilterData"
                                                className="blue_button"
                                            >
                                                Search
                                            </button>
                                            <button
                                                type="submit"
                                                name="submit"
                                                id="ClearFilterData"
                                                className="red_button"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                        <div className="popup_col_2" />
                                    </div>
                                    <div id="divLoading" />
                                    {/*Loading class */}
                                    <div
                                        className="col-md-6 col-sm-6 col-xs-12 green_table"
                                        style={{ paddingLeft: 0 }}
                                    >
                                        <div className="link">PLUS ACCOUNT (Dena Hai)</div>
                                        <div className="main_gre-red">
                                            <table
                                                className="table table-striped jambo_table bulk_action"
                                                id=""
                                            >
                                                <thead>
                                                    <tr className="headings">
                                                        <th className="">Name</th>
                                                        <th className="">Account</th>
                                                        <th className="">Chips</th>
                                                        <th className="" />
                                                    </tr>
                                                </thead>
                                                <tbody id="denaHai">
                                                    <tr>
                                                        <td className=" ">mohan18</td>
                                                        <td className="acco">
                                                            <a href="/chipsummary/mohan18">mohan18 A/C</a>
                                                        </td>
                                                        <td className=" green">0.00</td>
                                                        <td className=" ">
                                                            <a
                                                                className="btn btn-xs btn-primary"
                                                                href="/ledger/mohan18"
                                                            >
                                                                <i aria-hidden="true">Ledger</i>
                                                            </a>{" "}
                                                            <a
                                                                onclick="getSettleInfo('mohan18','0.00','Dena')"
                                                                className="btn btn-xs btn-success"
                                                                href=""
                                                                data-toggle="modal"
                                                                data-target="#settlementpopup"
                                                                title="Settlement"
                                                            >
                                                                <i aria-hidden="true">Settlement</i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" ">ankit@15</td>
                                                        <td className="acco">
                                                            <a href="/chipsummary/ankit@15">ankit@15 A/C</a>
                                                        </td>
                                                        <td className=" green">0.00</td>
                                                        <td className=" ">
                                                            <a
                                                                className="btn btn-xs btn-primary"
                                                                href="/ledger/ankit@15"
                                                            >
                                                                <i aria-hidden="true">Ledger</i>
                                                            </a>{" "}
                                                            <a
                                                                onclick="getSettleInfo('ankit@15','0.00','Dena')"
                                                                className="btn btn-xs btn-success"
                                                                href=""
                                                                data-toggle="modal"
                                                                data-target="#settlementpopup"
                                                                title="Settlement"
                                                            >
                                                                <i aria-hidden="true">Settlement</i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" ">manis12</td>
                                                        <td className="acco">Own</td>
                                                        <td className=" green">63000.09</td>
                                                        <td className=" ">
                                                            <a
                                                                className="btn btn-xs btn-primary"
                                                                href="/ledger2/manis12/P"
                                                            >
                                                                <i aria-hidden="true">Ledger</i>
                                                            </a>{" "}
                                                            <a
                                                                onclick="getOwnInfo('manis12','63000.09','Dena')"
                                                                className="btn btn-xs btn-success"
                                                                href=""
                                                                data-toggle="modal"
                                                                data-target="#ownSettleModal"
                                                                title="Settlement"
                                                            >
                                                                <i aria-hidden="true">Settlement</i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" ">admin</td>
                                                        <td className="green">Parent A/C</td>
                                                        <td className=" green">7170.41</td>
                                                        <td className=" ">
                                                            <a
                                                                className="btn btn-xs btn-primary"
                                                                href="/ledger/manis12"
                                                            >
                                                                <i aria-hidden="true">Ledger</i>
                                                            </a>{" "}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td />
                                                        <td id="denaTotal">70170.50</td>
                                                        <td />
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-6 col-sm-6 col-xs-12 red_table"
                                        style={{ paddingRight: 0 }}
                                    >
                                        <div className="link minus">MINUS ACCOUNT (Lena Hai)</div>
                                        <div className="main_gre-red">
                                            <table
                                                className="table table-striped jambo_table bulk_action"
                                                id=""
                                            >
                                                <thead>
                                                    <tr className="headings">
                                                        <th className="">Name</th>
                                                        <th className="">Account</th>
                                                        <th className="">Chips</th>
                                                        <th className="" />
                                                    </tr>
                                                </thead>
                                                <tbody id="lenaHai">
                                                    <tr>
                                                        <td className=" ">std@30</td>
                                                        <td className="acco">
                                                            <a href="/chipsummary/std@30">std@30 A/C</a>
                                                        </td>
                                                        <td className=" red">-7287.00</td>
                                                        <td className=" ">
                                                            <a
                                                                className="btn btn-xs btn-primary"
                                                                href="/ledger/std@30"
                                                            >
                                                                <i aria-hidden="true">Ledger</i>
                                                            </a>{" "}
                                                            <a
                                                                onclick="getSettleInfo('std@30','-7287.00','Lena')"
                                                                className="btn btn-xs btn-success"
                                                                href=""
                                                                data-toggle="modal"
                                                                data-target="#settlementpopup"
                                                                title="Settlement"
                                                            >
                                                                <i aria-hidden="true">Settlement</i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" ">santosh15</td>
                                                        <td className="acco">
                                                            <a href="/chipsummary/santosh15">santosh15 A/C</a>
                                                        </td>
                                                        <td className=" red">-62713.50</td>
                                                        <td className=" ">
                                                            <a
                                                                className="btn btn-xs btn-primary"
                                                                href="/ledger/santosh15"
                                                            >
                                                                <i aria-hidden="true">Ledger</i>
                                                            </a>{" "}
                                                            <a
                                                                onclick="getSettleInfo('santosh15','-62713.50','Lena')"
                                                                className="btn btn-xs btn-success"
                                                                href=""
                                                                data-toggle="modal"
                                                                data-target="#settlementpopup"
                                                                title="Settlement"
                                                            >
                                                                <i aria-hidden="true">Settlement</i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" ">manis12</td>
                                                        <td className="acco">Cash</td>
                                                        <td className=" red">-170.60</td>
                                                        <td className=" " />
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td />
                                                        <td id="lenaTotal">-70171.10</td>
                                                        <td />
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-6 col-sm-6 col-xs-12 red_table"
                                        style={{ paddingRight: 0 }}
                                    >
                                        <div className="link minus">Clear ACCOUNT (Clear Hai)</div>
                                        <div className="main_gre-red">
                                            <table
                                                className="table table-striped jambo_table bulk_action"
                                                id=""
                                            >
                                                <thead>
                                                    <tr className="headings">
                                                        <th className="">Name</th>
                                                        <th className="">Account</th>
                                                        <th className="">Chips</th>
                                                        <th className="" />
                                                    </tr>
                                                </thead>
                                                <tbody id="clearHai"></tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td />
                                                        <td id="clearTotal">0.00</td>
                                                        <td />
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                ngcontent-lsn-c81=""
                                id="settlementpopup"
                                role="dialog"
                                className="modal fade"
                                style={{ display: "none" }}
                            >
                                <input type="hidden" id="settle_userid" defaultValue="santosh15" />
                                <input type="hidden" id="settle_type" defaultValue="recieve" />
                                <div _ngcontent-lsn-c81="" className="modal-dialog">
                                    <div _ngcontent-lsn-c81="" className="modal-content">
                                        <div _ngcontent-lsn-c81="" className="popup_form">
                                            <div _ngcontent-lsn-c81="" className="title_popup">
                                                <span
                                                    _ngcontent-lsn-c81=""
                                                    id="title_settle"
                                                    className="ng-star-inserted"
                                                >
                                                    User Name Santosh15 A/c || 62713.5
                                                </span>
                                                {/**/}
                                                <button
                                                    _ngcontent-lsn-c81=""
                                                    type="button"
                                                    data-dismiss="modal"
                                                    className="close"
                                                    style={{ color: "#fff !important" }}
                                                >
                                                    <div _ngcontent-lsn-c81="" className="close_new">
                                                        <i
                                                            _ngcontent-lsn-c81=""
                                                            className="fa fa-times-circle"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                </button>
                                            </div>
                                            <div _ngcontent-lsn-c81="" className="content_popup">
                                                <div _ngcontent-lsn-c81="" className="popup_form_row">
                                                    <form
                                                        style={{ padding: 5 }}
                                                        _ngcontent-lsn-c81=""
                                                        noValidate=""
                                                        className="ng-untouched ng-pristine ng-valid"
                                                    >
                                                        <div _ngcontent-lsn-c81="" className="popup_col_6">
                                                            <label _ngcontent-lsn-c81="" htmlFor="email">
                                                                Chips :
                                                            </label>
                                                            <input
                                                                _ngcontent-lsn-c81=""
                                                                type="number"
                                                                name="Name1"
                                                                id="amount_settle"
                                                                onkeypress="return isNumberKey(event)"
                                                                formcontrolname="amount"
                                                                className="form-control ng-untouched ng-pristine ng-valid"
                                                            />
                                                            {/**/}
                                                        </div>
                                                        <div _ngcontent-lsn-c81="" className="popup_col_6">
                                                            <label _ngcontent-lsn-c81="" htmlFor="pwd">
                                                                Remark:
                                                            </label>
                                                            <input
                                                                _ngcontent-lsn-c81=""
                                                                type="text"
                                                                name="Value1"
                                                                id="note_settle"
                                                                formcontrolname="remarks"
                                                                className="form-control ng-untouched ng-pristine ng-valid"
                                                            />
                                                            {/**/}
                                                        </div>
                                                        <div _ngcontent-lsn-c81="" className="popup_col_12">
                                                            <button
                                                                _ngcontent-lsn-c81=""
                                                                type="button"
                                                                onclick="settelUser()"
                                                                className="btn btn-success"
                                                            >
                                                                Save{" "}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
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
            </div >
        </>



    )
}

export default ChipSummary