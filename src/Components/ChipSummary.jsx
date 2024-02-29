import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';

function ChipSummary() {

    const userId = Cookies.get('id')
    const roleId = Cookies.get('roleId')
    let loggedInUserName = Cookies.get('userName')
    // Remove double quotes if present
    loggedInUserName = loggedInUserName.replace(/^"(.*)"$/, '$1');


    const [betHistoryByUserId, setBetHistoryByUserId] = useState([])
    const [usersChild, setUserChild] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [parent, setParent] = useState('Parent A/C')
    const [parentAmount, setParentAmount] = useState(0)
    const [parentUserId, setParentUserId] = useState('')
    const [settleParent, setSttleParent] = useState('')
    const [settleParentId, setSettleParentId] = useState('')
    const [settleUserId, setSettleUserId] = useState('')
    const [settleUser, setSettleUser] = useState('')
    const [settleAmount, setSettleAmount0] = useState(0)
    const [prevSettleAmount, setPrevSettleAmount] = useState(0)
    const [tableName, setTableName] = useState('')
    const [settleRemark, setSettleRemark] = useState('')
    const [settleDueAmount, setSettleDueAmount] = useState(0)


    // const levelRoleId =  

    useEffect(() => {
        fetchBetHistoryApi();

    }, [])


    const fetchBetHistoryApi = async (id, clickedRoleId, clickedUserName, clickedAmount) => {
        console.log('clicked user Id : ', id, " clicked Role id : ", clickedRoleId, " clicked user Name : ", clickedUserName, " clicked user Amount : ", clickedAmount)


        try {
            const fetchedBet = await fetch(`http://localhost:5000/betHistory/${userId}`);
            const responseBet = await fetchedBet.json();

            const fetchUser = await fetch(`http://localhost:5000/getUserByParentId/${userId}`)

            const fetchSettlementUser = await fetch(`http://localhost:5000/getSettlement/${userId}`)

            const responseUser = await fetchUser.json();

            const responseSettlement = await fetchSettlementUser.json();

            // console.log("Get BetHistory Api  : " + JSON.stringify(response.data));
            console.log("Get BetHistory Api length : " + responseBet.data.length);
            console.log("Get Users Api  : " + JSON.stringify(responseUser.data));
            console.log("Get Users Api length : " + responseUser.data.length);
            console.log("Get Settlement Users : " + JSON.stringify(responseSettlement.data));

            console.log("Get Settlement Users Api length : " + responseSettlement.data.length);




            const FilterData = responseBet.data.filter(item => item.IsSettlement == 1 && item.IsDelete == 0)

            console.log("Filtered BEt Data : " + JSON.stringify(FilterData))
            console.log("Filtered BEt Data length : " + FilterData.length)
            setBetHistoryByUserId(FilterData)


            if (id == undefined) {



                const FilterUser = responseUser.data.filter(item => item.RoleId == parseInt(roleId) + 1)


                console.log("filter user length : " + FilterUser.length)
                console.log("filter user   : " + JSON.stringify(FilterUser))

                const FilteredUsers = FilterData.filter(user => responseSettlement.data.some(settlement =>
                    user.Id == settlement.ChildId
                )
                );

                console.log("Filtered Users via BET: ", FilteredUsers);
                console.log("Filtered Users via BET length: ", FilteredUsers.length);




                const filterByTime = FilterData.filter(bet => FilterUser.some(item => bet.SettleTime > item.LastSettledDate))
                console.log("Filtere by time length : " + JSON.stringify(filterByTime.length))

                const mapUsersArray = FilterUser.map(item => item.Id);
                console.log("Mapped User ID as Array:", mapUsersArray);
                console.log("Mapped User ID Array type:", typeof mapUsersArray);


                if (Array.isArray(mapUsersArray)) {
                    // Initialize an array to store filtered data, ResultAmount, and UserName for each ID
                    const filteredDataByUserId = [];



                    // Iterate over each ID in mapUsersArray
                    mapUsersArray.forEach(id => {
                        // Filter FilterData for each ID
                        const filterChild = FilterData.filter(item => {
                            // Check if the item's DomainI or other properties match the current ID
                            return id === item.DomainI || id === item.TechAdminI || id === item.SuperAdminI || id === item.SubAdminI || id === item.SuperSuperI || id === item.SuperI || id === item.masterI || id === item.UserI;
                        });

                        // Filter responseSettlement.data for the current ID
                        const filterSettleed = responseSettlement.data.filter(item => {
                            return id === item.ChildId;
                        });


                        let filteredSettlledChild;

                        let resultAmount;
                        let dueAmount;

                        if (filterSettleed.length > 0) {

                            console.log("If block ... ");

                            filteredSettlledChild = filterChild.filter(child => {
                                return filterSettleed.some(settlement => {
                                    dueAmount = settlement.DueAmount
                                    return child.SettleTime > settlement.SettledDate;
                                });
                            });

                            console.log("Due amount of childId = ", id, " : ", dueAmount)


                            resultAmount = filteredSettlledChild.reduce((total, currentItem) => {
                                return total + currentItem.ResultAmount;
                            }, 0);

                            resultAmount = resultAmount + dueAmount;

                            console.log("Total result after calcualting dueAmount : ", resultAmount)
                            console.log("Clauclutiong result : ", resultAmount + dueAmount)


                        } else {

                            console.log("else block ... ");
                            filteredSettlledChild = filterChild.filter(child => {
                                const d = new Date();
                                return child.SettleTime > d.setFullYear(2021, 0, 1);
                            });

                            console.log("Due amount of childId = ", id, " : ", dueAmount)
                            // Calculate the ResultAmount for the current user
                            resultAmount = filterChild.reduce((total, currentItem) => {
                                return total + currentItem.ResultAmount;
                            }, 0);
                        }




                        // if (filterSettleed.length > 0) {



                        // } else {


                        // }


                        const resultAmount1 = filteredSettlledChild.reduce((total, currentItem) => {
                            return total + currentItem.ResultAmount;
                        }, 0);

                        console.log("Filter Child : ", filterChild)
                        console.log("Filter Settlement : ", filterSettleed)
                        console.log("Filter Settlement length : ", filterSettleed.length)

                        console.log("Filter Settlement Child : ", filteredSettlledChild)

                        const filterSameId = filterChild.filter(item => filteredSettlledChild.some(settle => item.Id == settle.Id))

                        console.log("Filter by Id : ", filterSameId)



                        // Find the corresponding user object in FilterUser array
                        const userObject = FilterUser.find(user => user.Id === id);

                        // Get the UserName of the current user
                        const userName = userObject ? userObject.UserName : "";
                        const userRoleId = userObject ? userObject.RoleId : "";







                        // Push an object containing the userId, UserName, filtered data, and ResultAmount for the current ID into the array
                        filteredDataByUserId.push({
                            userId: id,
                            RoleId: userRoleId,
                            userName: userName,
                            filteredData: filterChild,
                            resultAmount: resultAmount,
                            resultAmount1: resultAmount1,
                        });


                        console.log("Next row ...")
                    });

                    console.log("Filtered Data and ResultAmount by User ID: ", filteredDataByUserId);

                    setUserChild(filteredDataByUserId)

                    const totalResultAmount = filteredDataByUserId.length > 0 && filteredDataByUserId.filter(item => item.filteredData.length > 0).reduce((total, item) => total + item.resultAmount, 0)

                    console.log("Calc result amount : " + totalResultAmount)
                    setTotalAmount(totalResultAmount)
                }

            } else {


                if (clickedRoleId < 8) {

                    console.log("Clicked roleId : " + clickedRoleId)
                    setParent(clickedUserName)
                    setParentUserId(id)
                    if (clickedAmount < 0) {
                        setParentAmount(clickedAmount * (-1))
                    } else {
                        setParentAmount(clickedAmount * (-1))
                    }
                    // setParentAmount(clickedAmount)

                    const FilterUser = responseUser.data.filter(item => item.ParentId == id)

                    console.log("filter user length : " + FilterUser.length)
                    console.log("filter user Id  : " + JSON.stringify(FilterUser[5]))




                    const mapUsersArray = FilterUser.map(item => item.id);
                    console.log("Mapped User ID as Array:", mapUsersArray);
                    console.log("Mapped User ID Array type:", typeof mapUsersArray);


                    if (Array.isArray(mapUsersArray)) {
                        // Initialize an array to store filtered data, ResultAmount, and UserName for each ID
                        const filteredDataByUserId = [];

                        // Iterate over each ID in mapUsersArray
                        mapUsersArray.forEach(id => {
                            // Filter FilterData for each ID
                            const filterChild = FilterData.filter(item => {
                                // Check if the item's DomainI or other properties match the current ID
                                return id === item.DomainI || id === item.TechAdminI || id === item.SuperAdminI || id === item.SubAdminI || id === item.SuperSuperI || id === item.SuperI || id === item.masterI || id === item.UserI;
                            });

                            // Find the corresponding user object in FilterUser array
                            const userObject = FilterUser.find(user => user.id === id);

                            // Get the UserName of the current user
                            const userName = userObject ? userObject.UserName : "";
                            const userRoleId = userObject ? userObject.RoleId : "";

                            // Calculate the ResultAmount for the current user
                            const resultAmount = filterChild.reduce((total, currentItem) => {
                                return total + currentItem.ResultAmount;
                            }, 0);

                            // Push an object containing the userId, UserName, filtered data, and ResultAmount for the current ID into the array
                            filteredDataByUserId.push({
                                userId: id,
                                RoleId: userRoleId,
                                userName: userName,
                                filteredData: filterChild,
                                resultAmount: resultAmount
                            });
                        });

                        console.log("Filtered Data and ResultAmount by User ID: ", filteredDataByUserId);

                        setUserChild(filteredDataByUserId)

                        const totalResultAmount = filteredDataByUserId.length > 0 && filteredDataByUserId.filter(item => item.filteredData.length > 0).reduce((total, item) => total + item.resultAmount, 0)

                        console.log("Calc result amount : " + totalResultAmount)
                        setTotalAmount(totalResultAmount)
                    }
                }



            }




        } catch (error) {
            console.error("Error fetching Users api " + error);
        }
    };

    const handleSettlement = (settleId, settleU, settleA, table) => {

        console.log("Settelment user Id : " + settleId, "Settelment user name : " + settleU, " settle user amount : ", settleA)
        setSettleUserId(settleId)
        setSettleUser(settleU)
        setPrevSettleAmount(settleA)
        setTableName(table)
        setSettleParentId(userId)
        setSttleParent(loggedInUserName)


        if (parseInt(settleA) < 0) {
            const pstv = parseInt(settleA) * (-1);

            setSettleAmount0(pstv)
        } else {
            setSettleAmount0(settleA)
            setPrevSettleAmount(settleA)
        }



    }

    // Function to handle amount change
    const handleAmountChange = (e) => {
        console.log("Eeeee : " + e.target.value)

        // Access input values directly
        const chipAmount = document.getElementById('amount_settle').value;
        const remark = document.getElementById('note_settle').value;

        console.log("Chip Amount : ", chipAmount, " remark is : ", remark)

        // setSettleRemark(remark)

        if (parent == "Parent A/C") {
            console.log("Parent Id : ", userId)
            console.log("Parent Name : ", loggedInUserName)
            setSettleParentId(userId)
            setSttleParent(loggedInUserName)
        } else {
            console.log("Parent Id : ", parentUserId)
            console.log("Parent Name ", parent)
            setSettleParentId(parentUserId)
            setSttleParent(parent)
        }
        // const chipAmount = e.target.value;
        // console.log("Chip Amount : ", chipAmount);

        // const chipAmountInput = document.getElementById('amount_settle')
        // chipAmountInput.value = chipAmount


        if (tableName == "Liya Hai") {
            // Calculate the total amount here by adding chipAmount and settleAmount
            const totalAmount = parseFloat(chipAmount) + parseFloat(prevSettleAmount);
            setSettleDueAmount(totalAmount)
            // console.log("Total Amount : ", totalAmount);

            console.log("Child UserId : ", settleUserId)
            console.log("Child name : ", settleUser)
            console.log("Actual amount : ", prevSettleAmount)
            console.log("due amount after calculation : ", totalAmount)
            console.log("Remark : ", remark)
            console.log("Sttlement Table : ", tableName)

        } else {
            // Calculate the total amount here by adding chipAmount and settleAmount
            const totalAmount = parseFloat(prevSettleAmount) - parseFloat(chipAmount);
            setSettleDueAmount(totalAmount)
            // console.log("Total Amount : ", totalAmount);
            console.log("Child UserId : ", settleUserId)
            console.log("Child name : ", settleUser)
            console.log("Actual amount : ", prevSettleAmount)
            console.log("due amount after calculation : ", totalAmount)
            console.log("Remark : ", remark)
            console.log("Sttlement Table : ", tableName)

        }


    };

    const handleSave = async () => {

        console.log("data is : ", { settleParentId, settleParent, settleUserId, settleUser, settleAmount, settleDueAmount, settleRemark, tableName, loggedInUserName })


        try {
            const postSettlement = await fetch(`http://localhost:5000/updateSettlement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ parentId: settleParentId, parentName: settleParent, childId: settleUserId, childName: settleUser, amount: settleAmount, dueAmount: settleDueAmount, remark: settleRemark, tableName: tableName, doneBy: loggedInUserName }),
            })

            if (postSettlement.ok) {

                console.log("successfull...")

                // const responseData = await postSettlement.json();
                // console.log("Response is : ", JSON.stringify(responseData.data));
                const btn = document.getElementById("settlementpopup");
                btn.setAttribute('data-dismiss', 'modal');
                btn.click();

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Amount Settled ",
                    showConfirmButton: false,
                    timer: 1500
                });
                btn.removeAttribute('data-dismiss', 'modal');
                fetchBetHistoryApi();

            } else {

                console.log("Data not sent .. ")
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            }



        } catch (err) {
            console.error("Error during settlement : ", err)
        }


    }



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

                                                {totalAmount < 0 ?
                                                    <>
                                                        <tbody id="denaHai">
                                                            {usersChild.filter(item => item.filteredData.length > 0 && item.resultAmount >= 0).map((item) => (
                                                                <tr key={item.id}>
                                                                    <td className=" ">{item.userName}</td>
                                                                    <td className="acco">
                                                                        <a onClick={(e) => { e.preventDefault(); fetchBetHistoryApi(item.userId, item.RoleId, item.userName, item.resultAmount) }}>{item.userName}</a>
                                                                    </td>
                                                                    <td className=" green">{item.resultAmount}</td>
                                                                    <td className=" ">
                                                                        <a
                                                                            className="btn btn-xs btn-primary"
                                                                            href={`/ledger/${item.userId}`}
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
                                                                            onClick={(e) => { e.preventDefault(); handleSettlement(item.userId, item.userName, item.resultAmount, "Diya Hai") }}
                                                                        >
                                                                            <i aria-hidden="true">Settlement</i>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            <tr>
                                                                <td className=" ">Parent</td>
                                                                <td className="green">{parent}</td>
                                                                <td className=" green">{parent == "Parent A/C" ? 0 : parentAmount}</td>
                                                                <td className=" ">
                                                                    <a
                                                                        className="btn btn-xs btn-primary"
                                                                        href={parent == "Parent A/C" ? '/chipSummary' : `/ledger/${parentUserId}`}
                                                                    >
                                                                        <i aria-hidden="true">Ledger</i>
                                                                    </a>{" "}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className=" ">{loggedInUserName}</td>
                                                                <td className="acco">Own</td>
                                                                <td className=" green">{parent == "Parent A/C" ? String(totalAmount).replace(/^-/, '') : 0}</td>
                                                                <td className=" ">
                                                                    <a
                                                                        className="btn btn-xs btn-primary"
                                                                    // href="/ledger2/manis12/P"
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
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td>Total</td>
                                                                <td />
                                                                <td id="denaTotal">{usersChild.length > 0 && usersChild.filter(item => item.filteredData.length > 0 && item.resultAmount >= 0)
                                                                    .reduce((total, item) => total + item.resultAmount, 0) + parentAmount}</td>
                                                                <td />
                                                            </tr>
                                                        </tfoot>

                                                    </>
                                                    : <>
                                                        <tbody id="denaHai">
                                                            {usersChild.filter(item => item.filteredData.length > 0 && item.resultAmount >= 0).map((item) => (
                                                                <tr key={item.id}>
                                                                    <td className=" ">{item.userName}</td>
                                                                    <td className="acco">
                                                                        <a onClick={(e) => { e.preventDefault(); fetchBetHistoryApi(item.userId, item.RoleId, item.userName, item.resultAmount) }}>{item.userName}</a>
                                                                    </td>
                                                                    <td className=" green">{item.resultAmount}</td>
                                                                    <td className=" ">
                                                                        <a
                                                                            className="btn btn-xs btn-primary"
                                                                            href={`/ledger/${item.userId}`}
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
                                                                            onClick={(e) => { e.preventDefault(); handleSettlement(item.userId, item.userName, item.resultAmount, "Diya Hai") }}
                                                                        >
                                                                            <i aria-hidden="true">Settlement</i>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td>Total</td>
                                                                <td />
                                                                <td id="denaTotal">{usersChild.length > 0 && usersChild.filter(item => item.filteredData.length > 0 && item.resultAmount >= 0)
                                                                    .reduce((total, item) => total + item.resultAmount, 0)}</td>
                                                                <td />
                                                            </tr>
                                                        </tfoot>
                                                    </>}


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
                                                {totalAmount >= 0
                                                    ?
                                                    <>
                                                        <tbody id="lenaHai">


                                                            {usersChild.length > 0 && usersChild.filter(item => item.filteredData.length > 0 && item.resultAmount < 0).map((item) => (
                                                                <tr key={item.id}>
                                                                    <td className=" ">{item.userName}</td>
                                                                    <td className="acco">
                                                                        <a onClick={(e) => { e.preventDefault(); fetchBetHistoryApi(item.userId, item.RoleId, item.userName, item.resultAmount) }}>{item.userName}</a>
                                                                    </td>
                                                                    <td className=" red">{item.resultAmount}</td>
                                                                    <td className=" ">
                                                                        <a className="btn btn-xs btn-primary" href={`/ledger/${item.userId}`}>
                                                                            <i aria-hidden="true">Ledger</i>
                                                                        </a>{" "}
                                                                        <a
                                                                            onclick="getSettleInfo('std@30','-7287.00','Lena')"
                                                                            className="btn btn-xs btn-success"
                                                                            href=""
                                                                            data-toggle="modal"
                                                                            data-target="#settlementpopup"
                                                                            title="Settlement"
                                                                            onClick={(e) => { e.preventDefault(); handleSettlement(item.userId, item.userName, item.resultAmount, "Liya Hai") }}
                                                                        >
                                                                            <i aria-hidden="true">Settlement</i>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            <tr>
                                                                <td className=" ">Parent</td>
                                                                <td className="red">{parent}</td>
                                                                <td className=" red">{parent == "Parent A/C" ? 0 : parentAmount}</td>
                                                                <td className=" ">
                                                                    <a
                                                                        className="btn btn-xs btn-primary"
                                                                        href={parent == "Parent A/C" ? '/chipSummary' : `/ledger/${parentUserId}`}
                                                                    >
                                                                        <i aria-hidden="true">Ledger</i>
                                                                    </a>{" "}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className=" ">{loggedInUserName}</td>
                                                                <td className="acco">Own</td>
                                                                <td className=" red">{totalAmount}</td>
                                                                <td className=" ">
                                                                    <a
                                                                        className="btn btn-xs btn-primary"
                                                                    // href=""
                                                                    >
                                                                        <i aria-hidden="true">Ledger</i>
                                                                    </a>{" "}
                                                                    <a
                                                                        onclick="getOwnInfo('manis12','63000.09','Lena')"
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
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td>Total</td>
                                                                <td />
                                                                <td id="lenaTotal">{usersChild.length > 0 && usersChild.filter(item => item.filteredData.length > 0 && item.resultAmount < 0)
                                                                    .reduce((total, item) => total + item.resultAmount, 0) + parentAmount}</td>
                                                                <td />
                                                            </tr>
                                                        </tfoot>
                                                    </>

                                                    :
                                                    <>
                                                        <tbody id="lenaHai">
                                                            {usersChild.length > 0 && usersChild.filter(item => item.filteredData.length > 0 && item.resultAmount < 0).map((item) => (
                                                                <tr key={item.id}>
                                                                    <td className=" ">{item.userName}</td>
                                                                    <td className="acco">
                                                                        <a onClick={(e) => { e.preventDefault(); fetchBetHistoryApi(item.userId, item.RoleId, item.userName, item.resultAmount) }}>{item.userName}</a>
                                                                    </td>
                                                                    <td className=" red">{item.resultAmount}</td>
                                                                    <td className=" ">
                                                                        <a className="btn btn-xs btn-primary" href={`/ledger/${item.userId}`}>
                                                                            <i aria-hidden="true">Ledger</i>
                                                                        </a>{" "}
                                                                        <a
                                                                            className="btn btn-xs btn-success"
                                                                            href=""
                                                                            data-toggle="modal"
                                                                            data-target="#settlementpopup"
                                                                            title="Settlement"
                                                                            onClick={(e) => { e.preventDefault(); handleSettlement(item.userId, item.userName, item.resultAmount, "Liya Hai") }}
                                                                        >
                                                                            <i aria-hidden="true">Settlement</i>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td>Total</td>
                                                                <td />
                                                                <td id="lenaTotal">{usersChild.length > 0 && usersChild.filter(item => item.filteredData.length > 0 && item.resultAmount < 0)
                                                                    .reduce((total, item) => total + item.resultAmount, 0)}</td>
                                                                <td />
                                                            </tr>
                                                        </tfoot>
                                                    </>


                                                }


                                            </table>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-6 col-sm-6 col-xs-12 red_table float-right"
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

                                id="settlementpopup"
                                role="dialog"
                                className="modal fade in"
                                style={{ display: "none" }}
                            >
                                <input type="hidden" id="settle_userid" defaultValue="santosh15" />
                                <input type="hidden" id="settle_type" defaultValue="recieve" />
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="popup_form">
                                            <div className="title_popup">
                                                <span

                                                    id="title_settle"
                                                    className="ng-star-inserted"
                                                >
                                                    User Name {settleUser} A/c || {prevSettleAmount}
                                                </span>
                                                {/**/}
                                                <button

                                                    type="button"
                                                    data-dismiss="modal"
                                                    className="close"
                                                    style={{ color: "#fff !important" }}
                                                    onClick={() => {
                                                        setTableName('')
                                                        setSettleAmount0(0)
                                                        setPrevSettleAmount(0)
                                                        setSettleRemark('')
                                                        document.getElementById('note_settle').value = ('')
                                                    }}
                                                >
                                                    <div className="close_new">
                                                        <i

                                                            className="fa fa-times-circle"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="content_popup">
                                                <div className="popup_form_row">
                                                    <form
                                                        style={{ padding: 5 }}

                                                        noValidate=""
                                                        className="ng-untouched ng-pristine ng-valid"
                                                    >
                                                        <div className="popup_col_6">
                                                            <label htmlFor="email">
                                                                Chips :
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="Name1"
                                                                id="amount_settle"
                                                                value={settleAmount}
                                                                onChange={(e) => setSettleAmount0(e.target.value)}
                                                                onBlur={(e) => handleAmountChange(e)}
                                                                formControlName="amount"
                                                                className="form-control ng-untouched ng-pristine ng-valid"

                                                            />
                                                            {/**/}
                                                        </div>
                                                        <div className="popup_col_6">
                                                            <label htmlFor="pwd">
                                                                Remark:
                                                            </label>
                                                            <input

                                                                type="text"
                                                                name="Value1"
                                                                id="note_settle"
                                                                formcontrolname="remarks"
                                                                className="form-control ng-untouched ng-pristine ng-valid"
                                                                onChange={(e) => setSettleRemark(e.target.value)}
                                                                onBlur={(e) => handleAmountChange(e)}
                                                            />
                                                            {/**/}
                                                        </div>
                                                        <div className="popup_col_12">
                                                            <button

                                                                type="button"
                                                                onClick={handleSave}
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