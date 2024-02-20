import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Header from './Header';
import Footer from './Footer';




export const MatchSetting = () => {

    const [data, setData] = useState([]);
    const [isActive, setIsActive] = useState(true);


    const [showActiveData, setShowActiveData] = useState("all");
    const [sportStatus, setSportStatus] = useState("all");
    const [searchWord, setSearchWord] = useState("");



    // Match setting data /- Min and Max of Odds , Bookmaker , Session

    // odds
    const [minOdds, setMinOdds] = useState(0);
    const [maxOdds, setMaxOdds] = useState(0);


    // bookmaker
    const [minBookmaker, setMinBookmaker] = useState(0);
    const [maxBookmaker, setMaxBookmaker] = useState(0);


    // session
    const [minSession, setMinSession] = useState(0);
    const [maxSession, setMaxSession] = useState(0);


    const [gameId, setGameId] = useState(0);





    // handling onChange event in odds,bookmaker,session
    const handleOnChange = (e) => {
        let inputValue = e.target.value;
        let dataName = e.target.name;

        if (dataName == "minOdds") {
            setMinOdds(inputValue);
        }

        if (dataName == "maxOdds") {
            setMaxOdds(inputValue);
        }

        if (dataName == "minBookmaker") {
            setMinBookmaker(inputValue);
        }

        if (dataName == "maxBookmaker") {
            setMaxBookmaker(inputValue);
        }

        if (dataName == "minSession") {
            setMinSession(inputValue);
        }

        if (dataName == "maxSession") {
            setMaxSession(inputValue);
        }

    }


    // function to preventing user to use -ve number
    const disableKey = (e) => {
        let key1 = "-";
        let key2 = "+";

        if (e.key.toLowerCase() == key1 || e.key.toLowerCase() == key2) {
            e.preventDefault();
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Value can't be negative !! use positive number",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }



    // function to set data of min and max of odds,bookmaker,session
    const fetchDataForMinAndMaxAmount = async (gameId, sportId) => {
        let res = await fetch(`http://localhost:5000/api/checkAndSendData/matchSettingPage/${gameId}/${sportId}`);
        let resData = await res.json();


        console.log(resData);
        setGameId(gameId);

        // setting data from api
        setMinOdds(resData[0].MinOddLimit);
        setMaxOdds(resData[0].MaxOddLimit);
        setMinBookmaker(resData[0].MinBookmakerLimit);
        setMaxBookmaker(resData[0].MaxBookmakerLimit);
        setMinSession(resData[0].MinFancyLimit);
        setMaxSession(resData[0].MaxFancyLimit);
    }


    // function to update the min max data of odds , bookmaker, session
    const updateDataForMinAndMaxAmount = async () => {


        try {

            let res = await fetch(`http://localhost:5000/api/checkAndUpdateData/matchSettingPage/${gameId}/${minOdds}/${maxOdds}/${minBookmaker}/${maxBookmaker}/${minSession}/${maxSession}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            })
            //   .then(()=>{

            //       window.location.reload();
            //   })

        }
        catch (error) {
            console.log("error in connecting the api");
        }


    }





    // function to update search word
    const handleSearchFunc = async (e) => {
        e.preventDefault();
        let res = await fetch(`http://localhost:5000/api/getdataBySearch?q=${searchWord}`);
        let resData = await res.json();
        setData(resData);

    }



    // function to fetch all data from backend
    const fetchData = async () => {
        let res = await fetch(`http://localhost:5000/api/getMatchEventData/${showActiveData}/${sportStatus}`);
        let resData = await res.json();
        //  console.log(resData);
        setData(resData);
    }





    const onChangeActiveHandler = (e) => {
        console.log(e.target.value);
        setShowActiveData(e.target.value);

    }

    const onChangeSportHandler = (e) => {
        console.log(e.target.value);
        setSportStatus(e.target.value);
    }


    const updateSportStatus = useCallback(async (event, id, whichToUpdate) => {
        event.preventDefault();
        // let uniId = id;      
        Swal.fire({
            title: "Conformation",
            text: "Do you want to change the status",
            icon: "warning",
            confirmButtonText: "Yes",
            showCancelButton: true,
        }).then(async (result) => {
            if (!result.value) return;

            let status;
            event.target.checked ? status = 0 : status = 1;
            // console.log(uniId);
            // setIsActive(Math.floor(Math.random()*25));
            setIsActive((prev => !prev));
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload();

            })

            try {
                let res = await fetch(`http://localhost:5000/api/updateMatchSettingData/${id}/${status}/${whichToUpdate}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

            } catch (error) {
                console.log("error in connecting the api");
            }

        })

    }, [isActive]);

    useEffect(() => {
        fetchData();
    }, [showActiveData, isActive, sportStatus, searchWord])

    return (
        <>
            <div className="nav-md">
                <div className="container body">

                    <Header />
                    <div className="right_col" role="main" style={{ minHeight: 278 }}>
                        <div className="loader" style={{ display: "none" }} />
                        <div className="col-md-12">
                            <div className="title_new_at">
                                Match Setting
                                <div className="pull-right">
                                    <button className="btn_common">Back</button>{" "}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="filter_page  data-background">
                                <div className="block_2">
                                    <select
                                        className="form-control"
                                        id="status"
                                        style={{ color: "black" }}
                                        value={showActiveData}
                                        onChange={onChangeActiveHandler}
                                    >
                                        <option value="all"  >Select Status</option>
                                        <option value="1" >Active</option>
                                        <option value="0" >Inactive</option>
                                    </select>
                                </div>
                                <div className="block_2">
                                    <select
                                        id="sports"
                                        className="form-control"
                                        style={{ color: "black" }}
                                        onChange={onChangeSportHandler}
                                        value={sportStatus}
                                    >
                                        <option value="all">Select Sport</option>
                                        <option value="4">Cricket</option>
                                        <option value="2">Tennis</option>
                                        <option value="1">Football</option>
                                    </select>
                                </div>
                                <div className="block_2">
                                    <input
                                        type="match"
                                        name="matchname"
                                        id="matchname"
                                        value={searchWord}
                                        onChange={(e) => { setSearchWord(e.target.value) }}
                                        className="form-control"
                                        placeholder="Match Name"
                                    // autoComplete="off"
                                    />
                                </div>
                                <div className="block_2 buttonacount">
                                    <button
                                        style={{ fontSize: 14 }}
                                        type="button"
                                        className="btn btn-success btn-xs"
                                        onClick={handleSearchFunc}
                                    >
                                        Search
                                    </button>

                                </div>

                            </div>
                        </div>
                        <div
                            id="settingmatch"
                            role="dialog"
                            className="modal fade"
                            style={{ display: "none" }}
                        >
                            <input type="hidden" id="settle_userid" />
                            <input type="hidden" id="settle_type" />
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="popup_form">
                                        <div className="title_popup">
                                            <span id="title_settle" className="ng-star-inserted">
                                                Match Setting
                                            </span>
                                            {/**/}
                                            <button
                                                type="button"
                                                data-dismiss="modal"
                                                className="close"
                                                style={{ color: "#fff !important" }}
                                            >
                                                <div className="close_new">
                                                    <i className="fa fa-times-circle" aria-hidden="true" />
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
                                                    <table
                                                        className="table table-striped jambo_table bulk_action"
                                                        id="usr"
                                                    >
                                                        <thead>
                                                            <tr className="headings">
                                                                <th
                                                                    className=""
                                                                    style={{ fontSize: 14, fontWeight: 700 }}
                                                                >
                                                                    <b />
                                                                    <center>
                                                                        <b> </b>
                                                                        <center>
                                                                            <b />
                                                                        </center>
                                                                    </center>
                                                                </th>
                                                                <th
                                                                    className=""
                                                                    style={{ fontSize: 14, fontWeight: 700 }}
                                                                >
                                                                    <b />
                                                                    <center>
                                                                        <b>Min</b>
                                                                        <center>
                                                                            <b />
                                                                        </center>
                                                                    </center>
                                                                </th>
                                                                <th
                                                                    className=""
                                                                    style={{ fontSize: 14, fontWeight: 700 }}
                                                                >
                                                                    <b />
                                                                    <center>
                                                                        <b>Max</b>
                                                                        <center>
                                                                            <b />
                                                                        </center>
                                                                    </center>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="usetable">
                                                            <tr>
                                                                <td>Odds</td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        min={0}
                                                                        name="minOdds"
                                                                        value={minOdds}
                                                                        onChange={handleOnChange}
                                                                        onKeyDown={disableKey}
                                                                        id="matchname"
                                                                        className="form-control"
                                                                        placeholder="Min"
                                                                        autoComplete="off"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        min={0}
                                                                        name="maxOdds"
                                                                        value={maxOdds}
                                                                        onChange={handleOnChange}
                                                                        onKeyDown={disableKey}
                                                                        id="matchname"
                                                                        className="form-control"
                                                                        placeholder="Max"
                                                                        autoComplete="off"
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Bookmaker</td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        min={0}
                                                                        name="minBookmaker"
                                                                        value={minBookmaker}
                                                                        onChange={handleOnChange}
                                                                        onKeyDown={disableKey}
                                                                        id="matchname"
                                                                        className="form-control"
                                                                        placeholder="Min"
                                                                        autoComplete="off"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        min={0}
                                                                        name="maxBookmaker"
                                                                        value={maxBookmaker}
                                                                        onChange={handleOnChange}
                                                                        onKeyDown={disableKey}
                                                                        id="matchname"
                                                                        className="form-control"
                                                                        placeholder="Max"
                                                                        autoComplete="off"
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Session</td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        min={0}
                                                                        name="minSession"
                                                                        value={minSession}
                                                                        onChange={handleOnChange}
                                                                        onKeyDown={disableKey}
                                                                        id="matchname"
                                                                        className="form-control"
                                                                        placeholder="Min"
                                                                        autoComplete="off"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        min={0}
                                                                        name="maxSession"
                                                                        value={maxSession}
                                                                        onChange={handleOnChange}
                                                                        onKeyDown={disableKey}
                                                                        id="matchname"
                                                                        className="form-control"
                                                                        placeholder="Max"
                                                                        autoComplete="off"
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={3}>
                                                                    <button
                                                                        style={{ fontSize: 14 }}
                                                                        type="button"
                                                                        className="btn btn-success btn-xs"
                                                                        aria-hidden="true"
                                                                        data-dismiss="modal"
                                                                    //  onClick={()=>{window.location.reload()}}
                                                                    >
                                                                        Cancle
                                                                    </button>
                                                                    <button
                                                                        style={{ fontSize: 14 }}
                                                                        type="button"
                                                                        data-dismiss="modal"
                                                                        className="btn btn-success btn-xs"
                                                                        onClick={updateDataForMinAndMaxAmount}
                                                                    >
                                                                        Update
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                <th className="lightgreencolor">Match Name</th>
                                                <th className="darkpurplecolor">Date</th>
                                                <th className="lightgreencolor">Setting</th>
                                                <th className="darkpurplecolor">Match ON/OFF</th>
                                                <th className="lightgreencolor">Bet Lock ON/OFF</th>
                                                <th className="darkpurplecolor">Match Odds ON/OFF</th>
                                                <th className="lightgreencolor">BookMaker ON/OFF</th>
                                                <th className="darkpurplecolor">Fancy ON/OFF</th>
                                            </tr>
                                        </thead>
                                        <tbody id="usetable">

                                            {data.map((game, index) => {
                                                return (
                                                    <tr key={game.gameId}>
                                                        <td>{index + 1}</td>
                                                        <td>{game.eventName}</td>
                                                        <td>{new Date(game.eventDate).toLocaleString()}</td>
                                                        <td>
                                                            <button
                                                                style={{ fontSize: 14 }}
                                                                type="button"
                                                                onClick={() => { fetchDataForMinAndMaxAmount(game.gameId, game.eid) }}
                                                                className="btn btn-success btn-xs"
                                                                data-toggle="modal"
                                                                data-target="#settingmatch"
                                                            >
                                                                <i
                                                                    className="fa fa-gear fa-spin"
                                                                    style={{ fontSize: "14px !important" }}
                                                                    aria-hidden="true"
                                                                />{" "}
                                                                Setting
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <label className="switch">
                                                                <input type="checkbox" checked={game.ActiveMatch} onClick={(e) => { updateSportStatus(e, game.gameId, "ActiveMatch") }} />
                                                                <span className="slider" />
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <label className="switch">
                                                                <input type="checkbox" checked={game.IsBetLock} onClick={(e) => { updateSportStatus(e, game.gameId, "IsBetLock") }} />
                                                                <span className="slider" />
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <label className="switch">
                                                                <input type="checkbox" checked={game.Matchodds} onClick={(e) => { updateSportStatus(e, game.gameId, "Matchodds") }} />
                                                                <span className="slider" />
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <label className="switch">
                                                                <input type="checkbox" checked={game.BookMaker} onClick={(e) => { updateSportStatus(e, game.gameId, "BookMaker") }} />
                                                                <span className="slider" />
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <label className="switch">
                                                                <input type="checkbox" checked={game.Fancy} onClick={(e) => { updateSportStatus(e, game.gameId, "Fancy") }} />
                                                                <span className="slider" />
                                                            </label>
                                                        </td>
                                                    </tr>
                                                )
                                            })}

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
