import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import Moment from 'moment-timezone';

function ShowBetCr() {

    const userId = Cookies.get('id')
    const roleId = Cookies.get('roleId')
    const { eid, marketNumber, marketSId } = useParams();
    const [betUser, setBetUser] = useState([])
    const [calcUsers, setCalcUsers] = useState([])
    const [totalAllUsersAmount, setTotalAllUsersAmount] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // const [load, setLoad] = useState(false)
    // const { eid } = useParams();
    // const { eid } = useParams();

    // /ShowBetCr/:eid/:marketNumber/:marketSId

    console.log(`Params eid : ${eid} marketNumber : ${marketNumber} marketSId : ${marketSId}`)

    var ParamsMarket;

    if (marketNumber == 1) {
        ParamsMarket = "Match Odds"
    } else if (marketNumber == 2) {
        ParamsMarket = "BookMaker";
    } else {
        ParamsMarket = "Fancy"
    }


    useEffect(() => {

        fetchBetHistoryApi();
        setCurrentPage(1);
        // filterParentChild()

    }, [])

    useEffect(() => {
        if (calcUsers.length === 0) {
            filterParentChild();
        }
    }, [calcUsers])

    const fetchBetHistoryApi = async () => {
        try {
            const fetched = await fetch(`http://localhost:5000/betHistory/${userId}`);
            const response = await fetched.json();
            // console.log("Get BetHistory Api  : " + JSON.stringify(response.data));

            if (Array.isArray(response.data)) {
                if (marketSId != 0) {
                    const filteredData = response.data.filter(item => item.EventId == eid && item.Market == "Fancy" && item.SelectionId == marketSId)


                    console.log("Filtered Data is : " + JSON.stringify(filteredData))
                    console.log("Filtered Data length is : " + filteredData.length)
                    setBetUser(filteredData)


                    const calculateResultAmount = (filteredData) => {
                        const resultAmountMap = {};

                        // Iterate over each item in the filteredData array
                        filteredData.forEach(item => {
                            const { UserN, ResultAmount } = item;

                            // Check if UserN exists in the resultAmountMap
                            if (resultAmountMap.hasOwnProperty(UserN)) {
                                // If UserN exists, add the ResultAmount to the existing value
                                resultAmountMap[UserN] += ResultAmount;
                            } else {
                                // If UserN does not exist, initialize it with the ResultAmount
                                resultAmountMap[UserN] = ResultAmount;
                            }
                        });

                        return resultAmountMap;
                    };

                    // Call the function and store the result
                    const resultAmountMap = calculateResultAmount(filteredData);

                    console.log("Total result amount : " + JSON.stringify(resultAmountMap));


                    const convertResultAmountToUsers = (resultAmountMap) => {
                        const calcUsers = [];

                        // Iterate over the keys of resultAmountMap
                        for (const userN in resultAmountMap) {
                            // Create an object with keys 'UserN' and 'amount'
                            const obj = { UserN: userN, amount: resultAmountMap[userN] };
                            // Push the object to the calcUsers array
                            calcUsers.push(obj);
                        }

                        return calcUsers;
                    };

                    // Call the function with the resultAmountMap
                    const calcUserss = convertResultAmountToUsers(resultAmountMap);

                    console.log("Total result amount Array : " + JSON.stringify(calcUserss));
                    // setCalcUsers(calcUserss)

                    const calculateTotalAmount = (calcUserss) => {
                        let totalAmount = 0;

                        // Iterate over the calcUserss array
                        calcUserss.forEach(item => {
                            // Add the amount to the totalAmount
                            totalAmount += item.amount;
                        });

                        return totalAmount;
                    };

                    // Call the function with the calcUserss array
                    const totalAmount = calculateTotalAmount(calcUserss);

                    console.log("Total amount of all UserN: " + totalAmount);

                    setTotalAllUsersAmount(totalAmount)


                } else {
                    const filteredData = response.data.filter(item => item.EventId == eid && item.Market == ParamsMarket)


                    console.log("Filtered Data is : " + JSON.stringify(filteredData))
                    console.log("Filtered Data length is : " + filteredData.length)
                    setBetUser(filteredData)

                    const calculateResultAmount = (filteredData) => {
                        const resultAmountMap = {};

                        // Iterate over each item in the filteredData array
                        filteredData.forEach(item => {
                            const { UserN, ResultAmount } = item;

                            // Check if UserN exists in the resultAmountMap
                            if (resultAmountMap.hasOwnProperty(UserN)) {
                                // If UserN exists, add the ResultAmount to the existing value
                                resultAmountMap[UserN] += ResultAmount;
                            } else {
                                // If UserN does not exist, initialize it with the ResultAmount
                                resultAmountMap[UserN] = ResultAmount;
                            }
                        });

                        return resultAmountMap;
                    };

                    // Call the function and store the result
                    const resultAmountMap = calculateResultAmount(filteredData);

                    console.log("Total result amount : " + JSON.stringify(resultAmountMap));
                    // setCalcUsers(resultAmountMap)

                    const convertResultAmountToUsers = (resultAmountMap) => {
                        const calcUsers = [];

                        // Iterate over the keys of resultAmountMap
                        for (const userN in resultAmountMap) {
                            // Create an object with keys 'UserN' and 'amount'
                            const obj = { UserN: userN, amount: resultAmountMap[userN] };
                            // Push the object to the calcUsers array
                            calcUsers.push(obj);
                        }

                        return calcUsers;
                    }

                    // Call the function with the resultAmountMap
                    const calcUserss = convertResultAmountToUsers(resultAmountMap);

                    console.log("Total result amount Array : " + calcUserss);
                    // setCalcUsers(calcUserss)

                    const calculateTotalAmount = (calcUserss) => {
                        let totalAmount = 0;

                        // Iterate over the calcUserss array
                        calcUserss.forEach(item => {
                            // Add the amount to the totalAmount
                            totalAmount += item.amount;
                        });

                        return totalAmount;
                    };

                    // Call the function with the calcUserss array
                    const totalAmount = calculateTotalAmount(calcUserss);

                    console.log("Total amount of all UserN: " + totalAmount);

                    setTotalAllUsersAmount(totalAmount);
                }
                console.log("Total state : " + totalAllUsersAmount)
            }



        } catch (error) {
            console.error("Error fetching Users api " + error);
        }
    };

    const filterParentChild = (id) => {

        console.log("ID is : " + id)


        const tableHeaders = document.querySelectorAll("#datatables th");

        console.log("table headers all : " + tableHeaders)

        if (id == undefined) {

            // Filter tableHeaders to include only elements with value={roleId + 1}
            const targetHeaders = Array.from(tableHeaders).filter(header => {
                return parseInt(header.getAttribute("value")) == parseInt(roleId) + 1;
            });
            const targetHeaders1 = Array.from(tableHeaders).filter(header => {
                return header.textContent == "P_L";
            });
            // Ensure we found the target header
            if (targetHeaders.length > 0) {
                console.log("Targetd th value is : ", targetHeaders);
                console.log("Targetd th value 1 is : ", targetHeaders1);


                // Get the index of the target header
                const targetIndex = Array.from(tableHeaders).indexOf(targetHeaders[0]);
                const targetIndexPL = Array.from(tableHeaders).indexOf(targetHeaders1[0]);

                // Select all table rows
                const tableRows = document.querySelectorAll("#datatables tbody tr");

                // Iterate over each row to get the content of the corresponding td in the target column
                const columnContent = [];

                tableRows.forEach(row => {
                    const cells = row.querySelectorAll("td");
                    const cellContent = cells[targetIndex].textContent;
                    const cellContentPL = parseFloat(cells[targetIndexPL].textContent);

                    // columnContent.push(cellContent);
                    // columnContentPL.push(cellContentPL);
                    columnContent.push({ content: cellContent, pl: cellContentPL })

                });

                console.log("Content of the target column:", columnContent);


                const contentToPL = {};

                // Iterate over each item in the columnContent array
                columnContent.forEach(item => {
                    const content = item.content;
                    const pl = item.pl;

                    // If content exists in contentToPL, add its P_L to the existing total
                    if (contentToPL.hasOwnProperty(content)) {
                        contentToPL[content] += pl;
                    } else {
                        // Otherwise, initialize the content with its P_L
                        contentToPL[content] = pl;
                    }
                });

                console.log("Content and their corresponding total P_L:", contentToPL);

                const calcUserss = [];

                // Iterate over the keys of resultAmountMap
                for (const userN in contentToPL) {
                    // Create an object with keys 'UserN' and 'amount'
                    const obj = { UserN: userN, amount: contentToPL[userN] };
                    // Push the object to the calcUsers array
                    calcUserss.push(obj);
                }

                // Call the function with the resultAmountMap
                console.log("Total result amount Array of content to pl : " + JSON.stringify(calcUserss));
                // setLoad(prev => !prev)
                setCalcUsers(calcUserss)
                // convertResultAmountToUsers(contentToPL);

            } else {
                console.log("Target header not found.");
            }
        } else {
            // Filter tableHeaders to include only elements with value={roleId + 1}
            const targetHeaders = Array.from(tableHeaders).filter(header => {
                return parseInt(header.getAttribute("value")) == parseInt(id) + 1;
            });
            const targetHeaders1 = Array.from(tableHeaders).filter(header => {
                return header.textContent == "P_L";
            });

            console.log("Target Headers : " + targetHeaders)
            console.log("Target Headers1 : " + targetHeaders1)
            // Ensure we found the target header
            if (targetHeaders.length > 0 && targetHeaders1.length > 0) {
                console.log("Targetd th value is : ", targetHeaders);
                console.log("Targetd th value 1 is : ", targetHeaders1);


                // Get the index of the target header
                const targetIndex = Array.from(tableHeaders).indexOf(targetHeaders[0]);
                const targetIndexPL = Array.from(tableHeaders).indexOf(targetHeaders1[0]);

                // Select all table rows
                const tableRows = document.querySelectorAll("#datatables tbody tr");

                // Iterate over each row to get the content of the corresponding td in the target column
                const columnContent = [];

                const cells = tableRows[0].querySelectorAll("td");
                const cellContent = cells[targetIndex].textContent;
                const cellContentPL = parseFloat(cells[targetIndexPL].textContent);
                columnContent.push({ content: cellContent, pl: cellContentPL })

                console.log("Content of the target column:", columnContent);


                const contentToPL = {};

                // Iterate over each item in the columnContent array
                columnContent.forEach(item => {
                    const content = item.content;
                    const pl = item.pl;

                    // If content exists in contentToPL, add its P_L to the existing total
                    if (contentToPL.hasOwnProperty(content)) {
                        contentToPL[content] += pl;
                    } else {
                        // Otherwise, initialize the content with its P_L
                        contentToPL[content] = pl;
                    }
                });

                console.log("Content and their corresponding total P_L:", contentToPL);

                const calcUserss = [];

                // Iterate over the keys of resultAmountMap
                for (const userN in contentToPL) {
                    // Create an object with keys 'UserN' and 'amount'
                    const obj = { UserN: userN, amount: contentToPL[userN] };
                    // Push the object to the calcUsers array
                    calcUserss.push(obj);
                }

                // Call the function with the resultAmountMap
                console.log("Total result amount Array of content to pl : " + JSON.stringify(calcUserss));
                setCalcUsers(calcUserss)
                // convertResultAmountToUsers(contentToPL);

            } else {
                console.log("Target header not found.");
            }
        }

    }


    const handlePerPageChange = (e) => {
        setPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to the first page when changing items per page
    };

    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = betUser.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);




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
                                <div className="title_new_at">Show Bet History</div>
                            </div>
                            <div className="clearfix" />
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{ padding: 0 }}>
                                <div className="clearfix data-background">
                                    <div id="divLoading" />
                                    {/*Loading class */}
                                    <div className="col-md-6 col-sm-6 col-xs-12 green_table">
                                        <div className="link">PLUS ACCOUNT (Dena He)</div>
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
                                                    </tr>
                                                </thead>
                                                {totalAllUsersAmount <= 0 ? <tbody id="denaHai">

                                                    {calcUsers.length > 0 && calcUsers.filter(item => item.amount >= 0).map((item, index) => {

                                                        let str = item.UserN
                                                        let newStr = str.split(" ")
                                                        let id = newStr[newStr.length - 1]
                                                        console.log("ID : " + id)


                                                        return <tr key={index}>
                                                            <td className=" ">{item.UserN}</td>
                                                            <td className="acco">
                                                                <a onClick={(e) => { e.preventDefault(); filterParentChild(id) }}>
                                                                    {item.UserN}
                                                                </a>
                                                            </td>
                                                            <td className=" ">{item.amount}</td>
                                                        </tr>

                                                    })}

                                                    <tr>
                                                        <td className=" ">Parent</td>
                                                        <td className="acco">
                                                            <a>Parent A/C</a>
                                                        </td>
                                                        <td className=" ">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" ">own</td>
                                                        <td className="acco">
                                                            <a>Own</a>
                                                        </td>
                                                        <td className=" ">{String(totalAllUsersAmount).replace(/^-/, '')}</td>
                                                    </tr>
                                                </tbody>
                                                    :
                                                    <tbody id="denaHai">
                                                        {calcUsers.length > 0 && calcUsers.filter(item => item.amount >= 0).map((item, index) => {

                                                            let str = item.UserN
                                                            let newStr = str.split(" ")
                                                            let id = newStr[newStr.length - 1]
                                                            console.log("ID : " + id)


                                                            return <tr key={index}>
                                                                <td className=" ">{item.UserN}</td>
                                                                <td className="acco">
                                                                    <a onClick={(e) => { e.preventDefault(); filterParentChild(id) }}>
                                                                        {item.UserN}
                                                                    </a>
                                                                </td>
                                                                <td className=" ">{item.amount}</td>
                                                            </tr>

                                                        })}
                                                    </tbody>}
                                                <tfoot>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td />
                                                        <td id="denaTotal">{totalAllUsersAmount}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-12 red_table">
                                        <div className="link minus">MINUS ACCOUNT (Lena He)</div>
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
                                                    </tr>
                                                </thead>
                                                {totalAllUsersAmount > 0 ? <tbody id="lenaHai">
                                                    {calcUsers.length > 0 && calcUsers.filter(item => item.amount < 0).map((item, index) => {


                                                        let str = item.UserN
                                                        let newStr = str.split(" ")
                                                        let id = newStr[newStr.length - 1]



                                                        return <tr key={index}>
                                                            <td className=" ">{item.UserN}</td>
                                                            <td className="acco">
                                                                <a onClick={(e) => { e.preventDefault(); filterParentChild(id) }}>
                                                                    {item.UserN}
                                                                </a>
                                                            </td>
                                                            <td className=" ">{item.amount}</td>
                                                        </tr>

                                                    })}


                                                    <tr>
                                                        <td className=" ">Parent</td>
                                                        <td className="acco">
                                                            <a>Parent A/C</a>
                                                        </td>
                                                        <td className=" ">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td className=" ">own</td>
                                                        <td className="acco">
                                                            <a>Own</a>
                                                        </td>
                                                        <td className=" ">{totalAllUsersAmount}</td>
                                                    </tr>
                                                </tbody> : <tbody id="lenaHai">
                                                    {calcUsers.length > 0 && calcUsers.filter(item => item.amount < 0).map((item, index) => {


                                                        let str = item.UserN
                                                        let newStr = str.split(" ")
                                                        let id = newStr[newStr.length - 1]



                                                        return <tr key={index}>
                                                            <td className=" ">{item.UserN}</td>
                                                            <td className="acco">
                                                                <a onClick={(e) => { e.preventDefault(); filterParentChild(id) }}>
                                                                    {item.UserN}
                                                                </a>
                                                            </td>
                                                            <td className=" ">{item.amount}</td>
                                                        </tr>

                                                    })}


                                                </tbody>}

                                                <tfoot>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td />
                                                        <td id="lenaTotal">{totalAllUsersAmount}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="title_new_at">
                                Show
                                <select style={{ color: "black" }} id="pages" onChange={handlePerPageChange}
                                    value={perPage}>
                                    <option value={10} selected="selected">
                                        10
                                    </option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                Enteries
                            </div>
                            {/*Loading class */}
                            <div className="custom-scroll table-responsive">
                                <table
                                    className="table table-bordered table-dark table_new_design jambo_table bulk_action dataTable"
                                    id="datatables"
                                >
                                    <thead>
                                        <tr className="headings">
                                            <th className="darkpurplecolor">S.No.</th>
                                            <th className="lightgreencolor" value={8}>Client</th>
                                            <th className="darkpurplecolor" value={2}>Tech Admin</th>
                                            <th className="lightgreencolor" value={3}>Super Admin</th>
                                            <th className="darkpurplecolor" value={4}>Sub Admin</th>
                                            <th className="lightgreencolor" value={5}>Super Super</th>
                                            <th className="darkpurplecolor" value={6}>Super</th>
                                            <th className="lightgreencolor" value={7}>Master</th>
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
                                        </tr>
                                    </thead>
                                    <tbody id="betlistdiv">
                                        {currentItems.length > 0 && currentItems.map((item, index) => (

                                            <tr className={item.Type == "back" ? "content_user_table mark-back odd" : "content_user_table mark-lay odd"} key={item.id}>
                                                <td>{(currentPage - 1) * perPage + index + 1}</td>
                                                <td>{item.UserN}</td>
                                                <td>{item.TechAdminN} <span className='roleID' style={{ display: 'none' }}>{item.TechAdminRoleId}</span></td>
                                                <td>{item.SuperAdminN} <span className='roleID' style={{ display: 'none' }}>{item.SuperAdminRoleId}</span></td>
                                                <td>{item.SubAdminN} <span className='roleID' style={{ display: 'none' }}>{item.SubAdminRoleId}</span></td>
                                                <td>{item.SuperSuperN} <span className='roleID' style={{ display: 'none' }}>{item.SuperSuperRoleId}</span></td>
                                                <td>{item.SuperN} <span className='roleID' style={{ display: 'none' }}>{item.SuperRoleId}</span></td>
                                                <td>{item.masterN} <span className='roleID' style={{ display: 'none' }}>{item.masterRoleId}</span></td>
                                                <td>{item.Market == "Fancy" ? item.EventName + "/" + item.Event : item.EventName}</td>
                                                <td>{item.Selection}</td>
                                                <td>{item.Market}</td>
                                                <td>{item.OddsRequest}</td>
                                                <td className="">{item.AmountStake}</td>
                                                <td>{Moment(new Date(item.MatchedTime)).tz("Asia/Calcutta").format('ddd MMM DD hh:mm:ss z YYYY')}</td>
                                                <td className={item.ResultAmount < 0 ? 'red' : 'green'}>{item.ResultAmount}</td>
                                                <td className="green">{item.Profit}</td>
                                                <td className="red">{item.Liability}</td>
                                                <td>{item.Type}</td>
                                                <td>{item.IsSettlement == 1 ? "SETTLED" : "OPEN"}</td>
                                                <td>{item.IpAddress}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p id="items">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, betUser.length)} of Entries {betUser.length}</p>
                                <div className="pagination-row dataTables_paginate paging_simple_numbers">
                                    {Array.from({ length: Math.ceil(betUser.length / perPage) }, (_, i) => (
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
            </div >



        </>

    )
}

export default ShowBetCr