import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';


function Dashboard() {


    const navigate = useNavigate();

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchInPlay();
    }, [])


    const fetchInPlay = async () => {
        setIsLoading(true)
        try {
            const fetched = await fetch('https://api.s2bet.in/getInPlay');
            const response = await fetched.json()
            console.log("Inplay Api : " + JSON.stringify(response))
            setData(response.data)
        } catch (error) {
            console.error("Error fetching Inplay api " + error)
        } finally {
            // Set loading state back to false after the request is completed
            setIsLoading(false);
        }

    }

    const handleEvent = (eid, gameId) => {
        navigate(`/cuttingExpo/${eid}/${gameId}`);
    }

    return (
        <>

            {isLoading && <div className="spinner" id="loader-1" style={{ display: 'block' }}></div>}
            {/* <Header /> */}


            {/* <div className="nav-md"> */}
            <div className="container body">

                <Header />
                {/* page content */}
                <div className="right_col" role="main" style={{ minHeight: 599 }}>
                    <div className="loader" style={{ display: "none" }} />
                    {/* top tiles */}
                    <div className="fullrow tile_count">
                        <div className="col-md-12 col-sm-12 col-xs-12" id="UpCommingData">
                            <div className=" " id="accountView" role="main">
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <div />
                                        <div className="modal-dialog-staff">
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <div
                                                        className="table table-striped jambo_table bulk_action"
                                                        id=""
                                                    >
                                                        <div className="clearfix" />
                                                        <div className="sports_box" id="matchesData">
                                                            <div className="tittle_sports">
                                                                <span className="item_sport">
                                                                    <img src="images/cricket-icon.png" />
                                                                </span>{" "}
                                                                Cricket
                                                            </div>
                                                            {data.map((item) => (
                                                                item.eid === '4' && (
                                                                    <div
                                                                        className="sport_row "
                                                                        onClick={(e) => { e.preventDefault(); handleEvent(item.eid, item.gameId) }}
                                                                        key={item.id} >
                                                                        <div className="sport_name">
                                                                            <a
                                                                            href={`/cuttingExpo/${item.eid}/${item.gameId}`}
                                                                            >

                                                                                {item.eventName}
                                                                            </a>
                                                                            <time className="desktop_time_match">
                                                                                <i
                                                                                    className="fa fa-clock-o"
                                                                                    aria-hidden="true"
                                                                                />
                                                                                {item.eventDate}
                                                                            </time>
                                                                        </div>
                                                                        <div className="match_status">
                                                                            <span className="blinking-inplay">In-play </span>
                                                                            <span
                                                                                _ngcontent-jxj-c59=""
                                                                                className="mobile_time_match"
                                                                            >
                                                                                {item.eventDate}
                                                                            </span>
                                                                        </div>
                                                                        <div className="match_odds_front">
                                                                            <span
                                                                                className="back-cell odds32853015"
                                                                                id="back328530155728253"
                                                                            >
                                                                                {item.back11}
                                                                            </span>
                                                                            <span
                                                                                className="lay-cell odds32853015"
                                                                                id="lay328530155728253"
                                                                            >
                                                                                {item.lay11}
                                                                            </span>
                                                                            <span className="back-cell">
                                                                                {item.back1}
                                                                            </span>
                                                                            <span className="lay-cell">
                                                                                {item.lay1}
                                                                            </span>
                                                                            <span
                                                                                className="back-cell odds32853015"
                                                                                id="back328530155728190"
                                                                            >
                                                                                {item.back12}
                                                                            </span>
                                                                            <span
                                                                                className="lay-cell odds32853015"
                                                                                id="lay328530155728190"
                                                                            >
                                                                                {item.lay12}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )))}
                                                            {/* <div
                                                                    className="sport_row "
                                                                    onclick="navigate('32853015','4');"
                                                                >
                                                                    <div className="sport_name">
                                                                        <a href="/cuttingExpo/4/32853015/32853015">
                                                                            England v Australia
                                                                        </a>
                                                                        <time className="desktop_time_match">
                                                                            <i
                                                                                className="fa fa-clock-o"
                                                                                aria-hidden="true"
                                                                            />
                                                                            19 November 05:30:00
                                                                        </time>
                                                                    </div>
                                                                    <div className="match_status">
                                                                        <span className="blinking-inplay">In-play </span>
                                                                        <span
                                                                            _ngcontent-jxj-c59=""
                                                                            className="mobile_time_match"
                                                                        >
                                                                            19 November 05:30:00
                                                                        </span>
                                                                    </div>
                                                                    <div className="match_odds_front">
                                                                        <span
                                                                            className="back-cell odds32853015"
                                                                            id="back328530155728253"
                                                                        >
                                                                            0
                                                                        </span>
                                                                        <span
                                                                            className="lay-cell odds32853015"
                                                                            id="lay328530155728253"
                                                                        >
                                                                            0
                                                                        </span>
                                                                        <span className="back-cell">
                                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        </span>
                                                                        <span className="lay-cell">
                                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        </span>
                                                                        <span
                                                                            className="back-cell odds32853015"
                                                                            id="back328530155728190"
                                                                        >
                                                                            0
                                                                        </span>
                                                                        <span
                                                                            className="lay-cell odds32853015"
                                                                            id="lay328530155728190"
                                                                        >
                                                                            0
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="sport_row "
                                                                    onclick="navigate('32853015','4');"
                                                                >
                                                                    <div className="sport_name">
                                                                        <a href="/cuttingExpo/4/32853015/32853015">
                                                                            Hobart Hurricanes WBBL v Brisbane Heat WBBL
                                                                        </a>
                                                                        <time className="desktop_time_match">
                                                                            <i
                                                                                className="fa fa-clock-o"
                                                                                aria-hidden="true"
                                                                            />
                                                                            19 November 05:30:00
                                                                        </time>
                                                                    </div>
                                                                    <div className="match_status">
                                                                        <span className="blinking-inplay">In-play </span>
                                                                        <span
                                                                            _ngcontent-jxj-c59=""
                                                                            className="mobile_time_match"
                                                                        >
                                                                            19 November 05:30:00
                                                                        </span>
                                                                    </div>
                                                                    <div className="match_odds_front">
                                                                        <span
                                                                            className="back-cell odds32853015"
                                                                            id="back328530155728253"
                                                                        >
                                                                            0
                                                                        </span>
                                                                        <span
                                                                            className="lay-cell odds32853015"
                                                                            id="lay328530155728253"
                                                                        >
                                                                            0
                                                                        </span>
                                                                        <span className="back-cell">
                                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        </span>
                                                                        <span className="lay-cell">
                                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        </span>
                                                                        <span
                                                                            className="back-cell odds32853015"
                                                                            id="back328530155728190"
                                                                        >
                                                                            0
                                                                        </span>
                                                                        <span
                                                                            className="lay-cell odds32853015"
                                                                            id="lay328530155728190"
                                                                        >
                                                                            0
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="sport_row "
                                                                    onclick="navigate('32853015','4');"
                                                                >
                                                                    <div className="sport_name">
                                                                        <a href="/cuttingExpo/4/32853015/32853015">
                                                                            New Zealand v Pakistan
                                                                        </a>
                                                                        <time className="desktop_time_match">
                                                                            <i
                                                                                className="fa fa-clock-o"
                                                                                aria-hidden="true"
                                                                            />
                                                                            19 November 05:30:00
                                                                        </time>
                                                                    </div>
                                                                    <div className="match_status">
                                                                        <span className="blinking-inplay">In-play </span>
                                                                        <span
                                                                            _ngcontent-jxj-c59=""
                                                                            className="mobile_time_match"
                                                                        >
                                                                            19 November 05:30:00
                                                                        </span>
                                                                    </div>
                                                                    <div className="match_odds_front">
                                                                        <span
                                                                            className="back-cell odds32853015"
                                                                            id="back328530155728253"
                                                                        >
                                                                            0
                                                                        </span>
                                                                        <span
                                                                            className="lay-cell odds32853015"
                                                                            id="lay328530155728253"
                                                                        >
                                                                            0
                                                                        </span>
                                                                        <span className="back-cell">
                                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        </span>
                                                                        <span className="lay-cell">
                                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        </span>
                                                                        <span
                                                                            className="back-cell odds32853015"
                                                                            id="back328530155728190"
                                                                        >
                                                                            0
                                                                        </span>
                                                                        <span
                                                                            className="lay-cell odds32853015"
                                                                            id="lay328530155728190"
                                                                        >
                                                                            0
                                                                        </span>
                                                                    </div>
                                                                </div> */}
                                                            <div className="tittle_sports">
                                                                <span className="item_sport">
                                                                    <img src="images/soccer-icon.png" />
                                                                </span>{" "}
                                                                Soccer
                                                            </div>
                                                            {data.map((item) => (
                                                                item.eid === '1' && (
                                                                    <div
                                                                        className="sport_row "
                                                                        onclick="navigate('32853015','4');"
                                                                        key={item.id} >
                                                                        <div className="sport_name">
                                                                            <a href="/cuttingExpo/4/32853015/32853015">
                                                                                {item.eventName}
                                                                            </a>
                                                                            <time className="desktop_time_match">
                                                                                <i
                                                                                    className="fa fa-clock-o"
                                                                                    aria-hidden="true"
                                                                                />
                                                                                {item.eventDate}
                                                                            </time>
                                                                        </div>
                                                                        <div className="match_status">
                                                                            <span className="blinking-inplay">In-play </span>
                                                                            <span
                                                                                _ngcontent-jxj-c59=""
                                                                                className="mobile_time_match"
                                                                            >
                                                                                {item.eventDate}
                                                                            </span>
                                                                        </div>
                                                                        <div className="match_odds_front">
                                                                            <span
                                                                                className="back-cell odds32853015"
                                                                                id="back328530155728253"
                                                                            >
                                                                                {item.back11}
                                                                            </span>
                                                                            <span
                                                                                className="lay-cell odds32853015"
                                                                                id="lay328530155728253"
                                                                            >
                                                                                {item.lay11}
                                                                            </span>
                                                                            <span className="back-cell">
                                                                                {item.back1}
                                                                            </span>
                                                                            <span className="lay-cell">
                                                                                {item.lay1}
                                                                            </span>
                                                                            <span
                                                                                className="back-cell odds32853015"
                                                                                id="back328530155728190"
                                                                            >
                                                                                {item.back12}
                                                                            </span>
                                                                            <span
                                                                                className="lay-cell odds32853015"
                                                                                id="lay328530155728190"
                                                                            >
                                                                                {item.lay12}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )))}

                                                            <div className="tittle_sports">
                                                                <span className="item_sport">
                                                                    <img src="images/tenish-icon.png" />
                                                                </span>{" "}
                                                                Tennis
                                                            </div>

                                                            {data.map((item) => (
                                                                item.eid === '2' && (
                                                                    <div
                                                                        className="sport_row "
                                                                        onclick="navigate('32853015','4');"
                                                                        key={item.id} >
                                                                        <div className="sport_name">
                                                                            <a href="/cuttingExpo/4/32853015/32853015">
                                                                                {item.eventName}
                                                                            </a>
                                                                            <time className="desktop_time_match">
                                                                                <i
                                                                                    className="fa fa-clock-o"
                                                                                    aria-hidden="true"
                                                                                />
                                                                                {item.eventDate}
                                                                            </time>
                                                                        </div>
                                                                        <div className="match_status">
                                                                            <span className="blinking-inplay">In-play </span>
                                                                            <span
                                                                                _ngcontent-jxj-c59=""
                                                                                className="mobile_time_match"
                                                                            >
                                                                                {item.eventDate}
                                                                            </span>
                                                                        </div>
                                                                        <div className="match_odds_front">
                                                                            <span
                                                                                className="back-cell odds32853015"
                                                                                id="back328530155728253"
                                                                            >
                                                                                {item.back11}
                                                                            </span>
                                                                            <span
                                                                                className="lay-cell odds32853015"
                                                                                id="lay328530155728253"
                                                                            >
                                                                                {item.lay11}
                                                                            </span>
                                                                            <span className="back-cell">
                                                                                {item.back1}
                                                                            </span>
                                                                            <span className="lay-cell">
                                                                                {item.lay1}
                                                                            </span>
                                                                            <span
                                                                                className="back-cell odds32853015"
                                                                                id="back328530155728190"
                                                                            >
                                                                                {item.back12}
                                                                            </span>
                                                                            <span
                                                                                className="lay-cell odds32853015"
                                                                                id="lay328530155728190"
                                                                            >
                                                                                {item.lay12}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )))}
                                                        </div>
                                                        <div id="cricketProfit" />
                                                        <div className="clearfix" />
                                                        <div id="tennisProfit" />
                                                        <div className="clearfix" />
                                                        <div id="soccerProfit" />
                                                        <div className="clearfix" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-12 col-xs-12" id="MatchOddInfo" />
                        {/*button style="float:right" class="btn btn-primary btn-xs" onclick="getBets(28589706,1.140242752)">Bets</button*/}
                        <div className="col-md-5 col-sm-12 col-xs-12 matchBox">
                            <div className="overlay_mobile in" />
                            <div className="betSlipBox" style={{ display: "none" }}>
                                <div className="modal-header mod-header">
                                    <span id="tital_change">Bet Slip</span>
                                    <i
                                        className="fa fa-television"
                                        style={{ fontSize: 24 }}
                                        onclick='window.open("https://www.goldan1.com/", "name", "width=600,height=400")'
                                        aria-hidden="true"
                                    />
                                    <a
                                        href="javascript:;"
                                        id="UserChipData"
                                        data-toggle="modal"
                                        data-target="#addUser"
                                        data-backdrop="static"
                                        data-keyboard="false"
                                        className="btn btn-primary btn-xs"
                                        style={{ float: "right" }}
                                    >
                                        Edit Stake
                                    </a>
                                </div>
                                <div className="betBox" style={{ display: "none" }}>
                                    <div className="block_box">
                                        <span id="msg_error" />
                                        <span id="errmsg" />
                                        <div className="loader" style={{ display: "none" }} />
                                        <form method="POST" id="placeBetSilp">
                                            <div className="">
                                                <label className="control-label m-t-xs BetFor">
                                                    {" "}
                                                    Yet (Bet For)
                                                </label>
                                                <div className="liabilityprofit" id=" ">
                                                    <span className="stake_label">Profit</span>
                                                    <div className="stack_input_field">
                                                        <span
                                                            id="profitData"
                                                            style={{
                                                                color: "rgb(0, 124, 14)",
                                                                fontWeight: "bold"
                                                            }}
                                                        >
                                                            {" "}
                                                            0.00
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="liabilityprofit" id=" ">
                                                    <span className="stake_label">Loss</span>
                                                    <div className="stack_input_field">
                                                        <span
                                                            id="LossData"
                                                            style={{
                                                                color: "rgb(255, 0, 0)",
                                                                fontWeight: "bold"
                                                            }}
                                                        >
                                                            {" "}
                                                            0.00
                                                        </span>
                                                    </div>
                                                </div>
                                                <div id="ShowRunnderName" className="match_runner_name" />
                                            </div>
                                            <div className="full_row  ">
                                                <div className="form-group full_rowOdd">
                                                    <span className="stake_label">Odd</span>
                                                    <div className="stack_input_field numbers-row">
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            id="ShowBetPrice"
                                                            className="calProfitLoss odds-input form-control  CommanBtn"
                                                        />
                                                        <div className="inc plus_btn">
                                                            + <img src="/images/plus_img.png" />
                                                        </div>
                                                        <div className="dec plus_btn">
                                                            - <img src="/images/minus_img.png" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group" id=" ">
                                                    <span className="stake_label">Stake</span>
                                                    <div className="stack_input_field numbers-row">
                                                        <input
                                                            type="number"
                                                            pattern="[0-9]*"
                                                            step={1}
                                                            id="stakeValue"
                                                            className="calProfitLoss stake-input form-control  CommanBtn"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="userId"
                                                            id="userId"
                                                            className="form-control"
                                                            defaultValue={35733}
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="ParantId"
                                                            id="ParantId"
                                                            className="form-control"
                                                            defaultValue=""
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="loginId"
                                                            id="loginId"
                                                            className="form-control"
                                                            defaultValue={35733}
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="selectionId"
                                                            id="selectionId"
                                                            defaultValue=" "
                                                            className="form-control"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="matchId"
                                                            id="matchId"
                                                            defaultValue=""
                                                            className="form-control"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="isback"
                                                            id="isback"
                                                            defaultValue=" "
                                                            className="form-control"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="MarketId"
                                                            id="MarketId"
                                                            defaultValue=""
                                                            className="form-control"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="placeName"
                                                            id="placeName"
                                                            defaultValue=""
                                                            className="form-control"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="text"
                                                            id="stackcount"
                                                            defaultValue={0}
                                                            className="form-control"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="text"
                                                            id="mfancyid"
                                                            defaultValue={0}
                                                            className="form-control"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="text"
                                                            id="pointDiff"
                                                            defaultValue={0}
                                                            className="form-control"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="text"
                                                            id="isfancy"
                                                            defaultValue={0}
                                                            className="form-control"
                                                        />
                                                        <div className="inc plus_btn">
                                                            + <img src="/images/plus_img.png" />
                                                        </div>
                                                        <div className="dec plus_btn">
                                                            - <img src="/images/minus_img.png" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="betPriceBox">
                                                <button
                                                    className="btn  btn-success CommanBtn chipName1"
                                                    type="button"
                                                    value={2}
                                                    onclick="StaKeAmount(this);"
                                                >
                                                    02
                                                </button>
                                                <button
                                                    className="btn  btn-success CommanBtn chipName2"
                                                    type="button"
                                                    value={5}
                                                    onclick="StaKeAmount(this);"
                                                >
                                                    5
                                                </button>
                                                <button
                                                    className="btn  btn-success CommanBtn chipName3"
                                                    type="button"
                                                    value={10}
                                                    onclick="StaKeAmount(this);"
                                                >
                                                    10
                                                </button>
                                                <button
                                                    className="btn  btn-success CommanBtn chipName4"
                                                    type="button"
                                                    value={50}
                                                    onclick="StaKeAmount(this);"
                                                >
                                                    50
                                                </button>
                                                <button
                                                    className="btn  btn-success CommanBtn chipName5"
                                                    type="button"
                                                    value={100}
                                                    onclick="StaKeAmount(this);"
                                                >
                                                    100
                                                </button>
                                                <button
                                                    className="btn  btn-success CommanBtn chipName6"
                                                    type="button"
                                                    value={250}
                                                    onclick="StaKeAmount(this);"
                                                >
                                                    250
                                                </button>
                                                <button
                                                    className="btn  btn-success CommanBtn chipName7"
                                                    type="button"
                                                    value={500}
                                                    onclick="StaKeAmount(this);"
                                                >
                                                    500
                                                </button>
                                                <button
                                                    className="btn  btn-success CommanBtn "
                                                    type="button"
                                                    onclick="ClearStack( );"
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                            <div className="betFooter">
                                                <button
                                                    className="btn btn-danger CommanBtn"
                                                    type="button"
                                                    onclick="ClearAllSelection();"
                                                >
                                                    Clear All Selection
                                                </button>
                                                <button
                                                    className="btn btn-success  CommanBtn placebet"
                                                    type="button"
                                                    onclick="PlaceBet();"
                                                >
                                                    Place Bet
                                                </button>
                                                <button
                                                    className="btn btn-success CommanBtn placefancy"
                                                    type="button"
                                                    onclick="PlaceFancy();"
                                                    style={{ display: "none" }}
                                                >
                                                    Place Bet
                                                </button>
                                            </div>
                                        </form>
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
            {/* </div> */}
        </>



    )
}

export default Dashboard