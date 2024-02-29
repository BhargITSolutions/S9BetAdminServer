import React from 'react'
import Header from './Header'
import Footer from './Footer'

function CuttingExpo() {
    return (

        <>

            <div className="nav-md">
                <div className="container body">
                    <Header />

                    {/* page content */}
                    <div className="right_col" role="main" style={{ minHeight: 132 }}>
                        {/* top tiles */}
                        <div className="tile_count">
                            <div
                                className="col-md-12 col-sm-12 col-xs-12"
                                id="UpCommingData"
                                style={{ display: "none" }}
                            />
                            <div
                                className="col-md-8 col-sm-12 col-xs-12"
                                id="MatchOddInfo"
                                style={{ lineHeight: 9, padding: 0 }}
                            >
                                <div
                                    className="fullrow col-md-12 col-sm-12 col-xs-12 matchBoxMain matchBox_29526625 matchBoxs_1163621754"
                                    style={{}}
                                >
                                    <div className="modal-dialog-staff">
                                        {/* dialog body */}
                                        <div className="modal-header mod-header" style={{}}>
                                            <div className="block_box">
                                                <span id="tital_change" style={{}}>
                                                    {" "}
                                                    <span id="fav29526625">
                                                        <i className="fas fa-star" aria-hidden="true" />
                                                    </span>{" "}
                                                    <span id="matchnameid">New Zealand v South Africa</span>
                                                </span>
                                                {/* <div id="liveCommentary">Teen patti launched</div> */}
                                                <div className="block_box_btn" style={{ margin: "0px 5px" }}>
                                                    <div
                                                        className="btn-group hidden-nav-xs"
                                                        style={{ float: "right" }}
                                                    >
                                                        <button
                                                            style={{
                                                                backgroundColor: "#b351c7 !important",
                                                                border: "none",
                                                                fontSize: 14
                                                            }}
                                                            type="button"
                                                            className="btn btn-sm btn-primary dropdown-toggle"
                                                            data-toggle="modal"
                                                            data-target="#listmatch"
                                                            onclick="getMyProfit()"
                                                        >
                                                            <i
                                                                className="fa fa-gear fa-spin"
                                                                style={{ fontSize: "14px !important" }}
                                                                aria-hidden="true"
                                                            />{" "}
                                                            Matches
                                                        </button>
                                                    </div>
                                                    <div className="dropdown" style={{ display: "inline" }}>
                                                        <button
                                                            style={{
                                                                fontSize: 14,
                                                                padding: 3,
                                                                border: "none",
                                                                background: "#12717c",
                                                                color: "#fff",
                                                                marginRight: "2%"
                                                            }}
                                                            className="btn btn-primary btn-xs"
                                                            type="button"
                                                            id="cheatBetButton"
                                                        >
                                                            <a style={{ color: "#fff" }} href="/cheatBunch/32982404">
                                                                Cheat Bets
                                                            </a>
                                                        </button>
                                                        <button
                                                            style={{
                                                                fontSize: 14,
                                                                padding: 3,
                                                                border: "none",
                                                                background:
                                                                    "linear-gradient(to bottom, #76c7ce 0%, #12717c 100%)",
                                                                color: "#fff",
                                                                marginRight: "2%"
                                                            }}
                                                            className="btn btn-primary btn-xs"
                                                            type="button"
                                                        >
                                                            <a href="/monitorUser" style={{ color: "#fff !important" }}>
                                                                Monitoring
                                                            </a>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="score_area">
                                            <iframe
                                                id="animscore"
                                                src="https://score1.365cric.com/#/score1/32982404"
                                                className="iframestyle"
                                                title="Match Score"
                                                style={{ display: "none" }}
                                            />
                                            <iframe
                                                id="cricketScore"
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    background: "url(/user/images/score-bg.png)no-repeat"
                                                }}
                                                className="iframestyle"
                                                title="Match Score"
                                                src="https://score.newbsf.com/#/score1/32982404?v=510938"
                                            />
                                        </div>
                                        <div className="score_area" style={{ display: "none" }}>
                                            <span className="matchScore" id=" ">
                                                <div className="score_area srt">
                                                    <div className="mt" style={{ background: "#000" }}>
                                                        <div
                                                            className="col-md-4 col-xs-4 tms"
                                                            style={{
                                                                textAlign: "left",
                                                                lineHeight: 20,
                                                                borderRight: "none"
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    marginLeft: "1%",
                                                                    color: "#8EEA29",
                                                                    fontWeight: "bold"
                                                                }}
                                                                id="scorename"
                                                            />{" "}
                                                            <span style={{ color: "#8EEA29" }} id="scorehead" />
                                                        </div>
                                                        <div
                                                            className="col-md-4 col-xs-4 tms"
                                                            style={{
                                                                borderRight: "1px solid #c9c9c9",
                                                                lineHeight: 35,
                                                                padding: 0,
                                                                overflowY: "scroll",
                                                                borderLeft: "1px solid #c9c9c9"
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: "#fff",
                                                                    fontWeight: "bold",
                                                                    fontSize: 25
                                                                }}
                                                                id="statusball"
                                                            />
                                                        </div>
                                                        <div
                                                            className="col-md-4 col-xs-4 tms rrt"
                                                            style={{ lineHeight: 20 }}
                                                        >
                                                            <span
                                                                style={{ color: "#8EEA29", fontWeight: "bold" }}
                                                                id="target"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-md-8 col-xs-8 tms"
                                                        style={{
                                                            display: "none",
                                                            height: 40,
                                                            backgroundImage:
                                                                "linear-gradient(-180deg, #315195 0%, #14213D 100%)"
                                                        }}
                                                    >
                                                        <span style={{ color: "#fff" }} id="" />
                                                    </div>
                                                    <div
                                                        className="col-md-4 col-xs-4 tms rrt"
                                                        style={{
                                                            display: "none",
                                                            height: 40,
                                                            backgroundImage:
                                                                "linear-gradient(-180deg, #315195 0%, #14213D 100%)"
                                                        }}
                                                    >
                                                        <span style={{ color: "#fff" }} id="" />
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                        <div className="modal-body">
                                            <div
                                                className="matchClosedBox_1163621754"
                                                style={{ display: "none" }}
                                            >
                                                <div className="fullrow fullrownew">
                                                    <div className="pre-text">
                                                        Match Odds <br />{" "}
                                                        <span className="match-colsed"> Closed</span>
                                                    </div>
                                                    <div className="matchTime" />
                                                </div>
                                                <div>
                                                    <div className="closedBox">
                                                        <h1>Closed</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mainboxborder">
                                                <div className="match-odds-sec">
                                                    <div
                                                        className="item match-status"
                                                        style={{
                                                            fontWeight: "bold",
                                                            textAlign: "left",
                                                            marginLeft: "1%",
                                                            color: "#000"
                                                        }}
                                                    >
                                                        MATCHED -
                                                        <span style={{ fontWeight: "bold" }} id="tmval">
                                                            8161630.02
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="item match-shedule"
                                                        id="demo_30183211"
                                                        style={{
                                                            padding: "5px 0px",
                                                            textAlign: "right",
                                                            marginRight: "1%"
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                fontWeight: "bold",
                                                                marginRight: "2%",
                                                                color: "blue"
                                                            }}
                                                            id="valumeText"
                                                        >
                                                            HIGH VOL.
                                                        </span>
                                                        <span>
                                                            <a
                                                                href="/announcementmgmt/1/10"
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <span style={{ color: "red", fontWeight: 700 }}>
                                                                    <i
                                                                        className="fa fa-bullhorn"
                                                                        style={{ fontSize: 15, marginRight: "3%" }}
                                                                        aria-hidden="true"
                                                                    />{" "}
                                                                </span>
                                                            </a>
                                                        </span>
                                                        <span className="click-tv" id="tvvv">
                                                            <img
                                                                style={{ float: "none" }}
                                                                className="tv-icons tvformobile"
                                                                onclick="checkIframe()"
                                                                src="/user/images/tv-screen.png"
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="col-lg-12 col-xs-12 tvformobilediv"
                                                    style={{ display: "none", padding: 0 }}
                                                >
                                                    <iframe
                                                        id="tvFrame"
                                                        style={{ width: "100%", height: 250 }}
                                                        src="https://ss247.life/api/97bef780da2b6a17ace2e366225eeb3b962fe743/Nstreamapi.php?chid=1034"
                                                    />
                                                </div>
                                                <div
                                                    className="fullrow MatchIndentB"
                                                    style={{ position: "relative" }}
                                                >
                                                    <table
                                                        id="OddsDiv"
                                                        className="table table-striped  bulk_actions matchTable1176776199"
                                                    >
                                                        <tbody>
                                                            <tr className="headings mobile_heading">
                                                                <th className="fix_heading color_red" />
                                                                <th />
                                                                <th />
                                                                <th className="back_heading_color">Back</th>
                                                                <th className="lay_heading_color">Lay</th>
                                                                <th />
                                                                <th />
                                                            </tr>
                                                            <tr
                                                                id="user_row0"
                                                                className="back_lay_color runner-row-36912034"
                                                            >
                                                                <td>
                                                                    <p className="runner_text" id="runnderName0">
                                                                        New Zealand
                                                                    </p>{" "}
                                                                    <span
                                                                        className="runner_amount"
                                                                        style={{ color: "rgb(60, 210, 71)" }}
                                                                        id="withBet448"
                                                                    >
                                                                        36.00
                                                                    </span>{" "}
                                                                    <input
                                                                        type="hidden"
                                                                        className="position_1176776199"
                                                                        id="selection_0"
                                                                        data-id={36912034}
                                                                        defaultValue="-390349.92"
                                                                    />
                                                                </td>
                                                                <td className="36912034_0availableToBack2_price_1176776199"></td>
                                                                <td className="36912034_0availableToBack1_price_1176776199"></td>
                                                                <td className="mark-back back-cell 36912034_0availableToBack0_price_1176776199 ">
                                                                    <span id="team1back1448">1.06</span>{" "}
                                                                    <span id="team1backprice1448">1525.4</span>
                                                                </td>
                                                                {/*- availableToLay */}
                                                                <td className="mark-lay lay-cell 36912034_0availableToLay0_price_1176776199">
                                                                    <span id="team1lay1448">1.07</span>{" "}
                                                                    <span id="team1layprice1448">79206.96</span>
                                                                </td>
                                                                <td className="36912034_0availableToLay1_price_1176776199"></td>
                                                                <td className="36912034_0availableToLay2_price_1176776199"></td>
                                                            </tr>
                                                            {/*- TD FOR RUNNER VALUE ONE --*/}
                                                            <tr
                                                                id="user_row1"
                                                                className="back_lay_color runner-row-36846149"
                                                            >
                                                                <td>
                                                                    <p className="runner_text" id="runnderName1">
                                                                        South Africa
                                                                    </p>{" "}
                                                                    <span
                                                                        className="runner_amount"
                                                                        style={{ color: "rgb(255, 99, 71)" }}
                                                                        id="withBet349"
                                                                    >
                                                                        -90.00
                                                                    </span>{" "}
                                                                    <input
                                                                        type="hidden"
                                                                        className="position_1176776199"
                                                                        id="selection_0"
                                                                        data-id={36846149}
                                                                        defaultValue="244244.56"
                                                                    />
                                                                </td>
                                                                <td className="36846149_0availableToBack2_price_1176776199"></td>
                                                                <td className="36846149_0availableToBack1_price_1176776199"></td>
                                                                <td className="mark-back back-cell 36846149_0availableToBack0_price_1176776199">
                                                                    <span id="team1back1349">150</span>{" "}
                                                                    <span id="team1backprice1349">13.85</span>
                                                                </td>
                                                                {/*- availableToLay */}
                                                                <td className="mark-lay lay-cell 36846149_0availableToLay0_price_117677619">
                                                                    <span id="team1lay1349">170</span>{" "}
                                                                    <span id="team1layprice1349">100</span>
                                                                </td>
                                                                <td className="36846149_0availableToLay1_price_1176776199"></td>
                                                                <td className="36846149_0availableToLay2_price_1176776199"></td>
                                                            </tr>
                                                            <tr
                                                                id="user_row1"
                                                                className="back_lay_color runner-row-36846149"
                                                            >
                                                                <td>
                                                                    <p className="runner_text" id="runnderName1">
                                                                        The Draw
                                                                    </p>{" "}
                                                                    <span
                                                                        className="runner_amount"
                                                                        style={{ color: "rgb(255, 99, 71)" }}
                                                                        id="withBet60443"
                                                                    >
                                                                        -90.00
                                                                    </span>{" "}
                                                                    <input
                                                                        type="hidden"
                                                                        className="position_1176776199"
                                                                        id="selection_0"
                                                                        data-id={36846149}
                                                                        defaultValue="244244.56"
                                                                    />
                                                                </td>
                                                                <td className="36846149_0availableToBack2_price_1176776199"></td>
                                                                <td className="36846149_0availableToBack1_price_1176776199"></td>
                                                                <td className="mark-back 36846149_0availableToBack0_price_1176776199 yello">
                                                                    <span id="team1back160443">19</span>{" "}
                                                                    <span id="team1backprice160443">9.64</span>
                                                                </td>
                                                                {/*- availableToLay */}
                                                                <td className="mark-lay 36846149_0availableToLay0_price_1176776199 yello">
                                                                    <span id="team1lay160443">20</span>{" "}
                                                                    <span id="team1layprice160443">79.69</span>
                                                                </td>
                                                                <td className="36846149_0availableToLay1_price_1176776199"></td>
                                                                <td className="36846149_0availableToLay2_price_1176776199"></td>
                                                            </tr>
                                                            {/*- TD FOR RUNNER VALUE ONE --*/}
                                                        </tbody>
                                                    </table>
                                                    <br />
                                                    <table
                                                        className="table table-striped  bulk_actions matchTable1176776199"
                                                        id="bookmaker"
                                                    >
                                                        <tbody>
                                                            <tr className="headings mobile_heading">
                                                                <th className="fix_heading color_red" />
                                                                <th />
                                                                <th />
                                                                <th className="back_heading_color">Back</th>
                                                                <th className="lay_heading_color">Lay</th>
                                                                <th />
                                                                <th />
                                                            </tr>
                                                            <tr
                                                                id="user_row0"
                                                                className="back_lay_color runner-row-36912034"
                                                            >
                                                                <td>
                                                                    <p className="runner_text" id="runnderName0">
                                                                        New Zealand
                                                                    </p>{" "}
                                                                    <span
                                                                        className="runner_amount"
                                                                        style={{ color: "rgb(60, 210, 71)" }}
                                                                        id="bookMaker448"
                                                                    >
                                                                        0.00
                                                                    </span>{" "}
                                                                    <input
                                                                        type="hidden"
                                                                        className="position_1176776199"
                                                                        id="selection_0"
                                                                        data-id={36912034}
                                                                        defaultValue="-390349.92"
                                                                    />
                                                                </td>
                                                                <td className="36912034_0availableToBack2_price_1176776199"></td>
                                                                <td className="36912034_0availableToBack1_price_1176776199"></td>
                                                                <td className="mark-back back-cell 36912034_0availableToBack0_price_1176776199 ">
                                                                    <span id="bookMakerback448">6.00</span>{" "}
                                                                    <span id="bookMakerbackPrice448">50000.00</span>
                                                                </td>
                                                                {/*- availableToLay */}
                                                                <td className="mark-lay lay-cell 36912034_0availableToLay0_price_1176776199">
                                                                    <span id="bookMakerlay448">7.00</span>{" "}
                                                                    <span id="bookMakerlayPrice448">50000.00</span>
                                                                </td>
                                                                <td className="36912034_0availableToLay1_price_1176776199"></td>
                                                                <td className="36912034_0availableToLay2_price_1176776199"></td>
                                                            </tr>
                                                            {/*- TD FOR RUNNER VALUE ONE --*/}
                                                            <tr
                                                                id="user_row1"
                                                                className="back_lay_color runner-row-36846149"
                                                            >
                                                                <td>
                                                                    <p className="runner_text" id="runnderName349">
                                                                        South Africa
                                                                    </p>
                                                                    <span
                                                                        className="runner_amount"
                                                                        style={{ color: "rgb(60, 210, 71)" }}
                                                                        id="bookMaker349"
                                                                    >
                                                                        0.00
                                                                    </span>
                                                                    <input
                                                                        type="hidden"
                                                                        className="position_1176776199"
                                                                        id="selection_0"
                                                                        data-id={36846149}
                                                                        defaultValue="244244.56"
                                                                    />
                                                                </td>
                                                                <td className="36846149_0availableToBack2_price_1176776199"></td>
                                                                <td className="36846149_0availableToBack1_price_1176776199"></td>
                                                                <td className="mark-back back-cell 36846149_0availableToBack0_price_1176776199">
                                                                    <span id="bookMakerback349">0.00</span>{" "}
                                                                    <span id="bookMakerbackPrice349">0.00</span>
                                                                </td>
                                                                {/*- availableToLay */}
                                                                <td className="mark-lay lay-cell 36846149_0availableToLay0_price_117677619">
                                                                    <span id="bookMakerlay349">0.00</span>{" "}
                                                                    <span id="bookMakerlayPrice349">0.00</span>
                                                                </td>
                                                                <td className="36846149_0availableToLay1_price_1176776199"></td>
                                                                <td className="36846149_0availableToLay2_price_1176776199"></td>
                                                            </tr>
                                                            <tr
                                                                id="user_row1"
                                                                className="back_lay_color runner-row-36846149"
                                                            >
                                                                <td>
                                                                    <p className="runner_text" id="runnderName60443">
                                                                        The Draw
                                                                    </p>
                                                                    <span
                                                                        className="runner_amount"
                                                                        style={{ color: "rgb(60, 210, 71)" }}
                                                                        id="bookMaker60443"
                                                                    >
                                                                        0.00
                                                                    </span>
                                                                    <input
                                                                        type="hidden"
                                                                        className="position_1176776199"
                                                                        id="selection_0"
                                                                        data-id={36846149}
                                                                        defaultValue="244244.56"
                                                                    />
                                                                </td>
                                                                <td className="36846149_0availableToBack2_price_1176776199"></td>
                                                                <td className="36846149_0availableToBack1_price_1176776199"></td>
                                                                <td className="mark-back 36846149_0availableToBack0_price_1176776199 yello">
                                                                    <span id="bookMakerback60443">0.00</span>{" "}
                                                                    <span id="bookMakerbackPrice60443">0.00</span>
                                                                </td>
                                                                {/*- availableToLay */}
                                                                <td className="mark-lay 36846149_0availableToLay0_price_1176776199 yello">
                                                                    <span id="bookMakerlay60443">0.00</span>{" "}
                                                                    <span id="bookMakerlayPrice60443">0.00</span>
                                                                </td>
                                                                <td className="36846149_0availableToLay1_price_1176776199"></td>
                                                                <td className="36846149_0availableToLay2_price_1176776199"></td>
                                                            </tr>
                                                            {/*- TD FOR RUNNER VALUE ONE --*/}
                                                        </tbody>
                                                    </table>
                                                    <div className="fullrow" style={{ position: "relative" }} id="">
                                                        <table
                                                            className="table table-striped bulk_actions"
                                                            id="inner-fancy-toss"
                                                            style={{ marginTop: "1%" }}
                                                        ></table>
                                                    </div>
                                                </div>
                                                <div
                                                    className="fullrow fullrownew"
                                                    style={{
                                                        display: "none",
                                                        background: "#000",
                                                        color: "#fff",
                                                        padding: 0,
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    <div className="pre-text col-lg-7 col-xs-7">
                                                        <input
                                                            type="checkbox"
                                                            data-id={29526625}
                                                            className="hide inply  "
                                                        />
                                                        <div
                                                            className="col-lg-12 col-xs-12"
                                                            style={{
                                                                padding: 0,
                                                                textAlign: "left",
                                                                marginLeft: "1%",
                                                                height: 36
                                                            }}
                                                        >
                                                            <span id="tital_change" style={{ fontSize: 14 }}>
                                                                <i
                                                                    onclick=""
                                                                    className="fa fa-star-o"
                                                                    aria-hidden="true"
                                                                />
                                                                Match Odds{" "}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-lg-5 col-xs-5"
                                                        style={{ padding: 0, height: 36 }}
                                                    >
                                                        <button
                                                            className="btn btn-primary btn-xs"
                                                            style={{
                                                                height: 36,
                                                                borderRadius: 0,
                                                                width: "49.5%",
                                                                border: "1px solid #fff",
                                                                background: "#dc143c !important",
                                                                color: "#fff",
                                                                marginRight: 0,
                                                                float: "right"
                                                            }}
                                                            id=""
                                                            onclick="openCheatUser()"
                                                        >
                                                            Cheat Bets
                                                        </button>
                                                        <button
                                                            className="btn btn-primary btn-xs"
                                                            style={{
                                                                height: 36,
                                                                width: "49.5%",
                                                                border: "1px solid #fff",
                                                                borderRadius: "inherit",
                                                                background: "#000 !important",
                                                                color: "#fff",
                                                                marginRight: 0,
                                                                float: "right"
                                                            }}
                                                            id="userBook"
                                                            onclick="userBook()"
                                                        >
                                                            User Book
                                                        </button>
                                                    </div>
                                                </div>
                                                <div
                                                    className="fullrow"
                                                    style={{ position: "relative", display: "none !important" }}
                                                    id="inner-marke  tOdds"
                                                >
                                                    <table
                                                        className="table table-striped bulk_actions"
                                                        id=" "
                                                        style={{ marginBottom: 0 }}
                                                    >
                                                        <tbody>
                                                            <tr className="headings mobile_heading">
                                                                <td className="fix_heading color_red">
                                                                    <span className="stakebb"></span>
                                                                </td>
                                                                <td
                                                                    className="back_heading_color"
                                                                    style={{ fontWeight: "bold" }}
                                                                >
                                                                    LGAI
                                                                </td>
                                                                <td
                                                                    className="lay_heading_color"
                                                                    style={{ fontWeight: "bold" }}
                                                                >
                                                                    KHAI
                                                                </td>
                                                            </tr>
                                                            <tr id="user_row " className="back_lay_color">
                                                                <td>
                                                                    <p
                                                                        className="runner_text"
                                                                        id=""
                                                                        runner=""
                                                                        selectionid=""
                                                                    >
                                                                        New Zealand
                                                                    </p>
                                                                    <span
                                                                        className="runner_amount"
                                                                        style={{
                                                                            color: "rgb(255, 99, 71)",
                                                                            fontSize: 12,
                                                                            fontWeight: "bold"
                                                                        }}
                                                                        id="withBet448"
                                                                    />
                                                                </td>
                                                                <td
                                                                    className="mark-back"
                                                                    style={{ verticalAlign: "middle !important" }}
                                                                >
                                                                    <span
                                                                        id="team1back1448"
                                                                        style={{ fontWeight: "bold", fontSize: 13 }}
                                                                    />{" "}
                                                                    <span id="team1backsize448" />
                                                                </td>
                                                                <td
                                                                    className="mark-lay"
                                                                    style={{ verticalAlign: "middle !important" }}
                                                                >
                                                                    <span
                                                                        id="team1lay1448"
                                                                        style={{ fontWeight: "bold", fontSize: 13 }}
                                                                    />{" "}
                                                                    <span id="team1laysize448" />
                                                                </td>
                                                            </tr>
                                                            <tr id="user_row " className="back_lay_color">
                                                                <td>
                                                                    <p
                                                                        className="runner_text"
                                                                        id=""
                                                                        runner=""
                                                                        selectionid=""
                                                                    >
                                                                        South Africa
                                                                    </p>
                                                                    <span
                                                                        className="runner_amount"
                                                                        style={{
                                                                            color: "rgb(255, 99, 71)",
                                                                            fontSize: 12,
                                                                            fontWeight: "bold"
                                                                        }}
                                                                        id="withBet349"
                                                                    />
                                                                </td>
                                                                <td
                                                                    className="mark-back"
                                                                    style={{ verticalAlign: "middle !important" }}
                                                                >
                                                                    <span
                                                                        id="team1back1349"
                                                                        style={{ fontWeight: "bold", fontSize: 13 }}
                                                                    />{" "}
                                                                    <span id="team1backsize349" />
                                                                </td>
                                                                <td
                                                                    className="mark-lay"
                                                                    style={{ verticalAlign: "middle !important" }}
                                                                >
                                                                    <span
                                                                        id="team1lay1349"
                                                                        style={{ fontWeight: "bold", fontSize: 13 }}
                                                                    />{" "}
                                                                    <span id="team1laysize349" />
                                                                </td>
                                                            </tr>
                                                            <tr id="user_row " className="back_lay_color">
                                                                <td>
                                                                    <p
                                                                        className="runner_text"
                                                                        id=""
                                                                        runner=""
                                                                        selectionid=""
                                                                    >
                                                                        The Draw
                                                                    </p>
                                                                    <span
                                                                        className="runner_amount"
                                                                        style={{
                                                                            color: "rgb(255, 99, 71)",
                                                                            fontSize: 12,
                                                                            fontWeight: "bold"
                                                                        }}
                                                                        id="withBet60443"
                                                                    />
                                                                </td>
                                                                <td
                                                                    className="mark-back"
                                                                    style={{ verticalAlign: "middle !important" }}
                                                                >
                                                                    <span
                                                                        id="team1back160443"
                                                                        style={{ fontWeight: "bold", fontSize: 13 }}
                                                                    />{" "}
                                                                    <span id="team1backsize60443" />
                                                                </td>
                                                                <td
                                                                    className="mark-lay"
                                                                    style={{ verticalAlign: "middle !important" }}
                                                                >
                                                                    <span
                                                                        id="team1lay160443"
                                                                        style={{ fontWeight: "bold", fontSize: 13 }}
                                                                    />{" "}
                                                                    <span id="team1laysize60443" />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="match_score_box" style={{ display: "none" }}>
                                                    <div className="modal-header mod-header">
                                                        <div className="block_box">
                                                            <span id="tital_change">
                                                                {" "}
                                                                <span id="matchnameid">
                                                                    <i
                                                                        onclick=""
                                                                        className="fa fa-star-o"
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                                New Zealand v South Africa
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="fullrow"
                                                    style={{ position: "relative", display: "none !important" }}
                                                    id="inner-marketO  ddsown"
                                                >
                                                    <table
                                                        className="table table-striped bulk_actions"
                                                        id=" "
                                                        style={{ marginBottom: 0 }}
                                                    >
                                                        <tbody>
                                                            <tr className="headings mobile_heading">
                                                                <td className="fix_heading color_red">
                                                                    <span className="" style={{ fontSize: 11 }}>
                                                                        {" "}
                                                                        BOOKIE BHAV WITH / COMM.{" "}
                                                                    </span>
                                                                </td>
                                                                <td
                                                                    className="back_heading_color"
                                                                    style={{ fontWeight: "bold" }}
                                                                >
                                                                    LGAI
                                                                </td>
                                                                <td
                                                                    className="lay_heading_color"
                                                                    style={{ fontWeight: "bold" }}
                                                                >
                                                                    KHAI
                                                                </td>
                                                            </tr>
                                                            <tr id="user_row " className="back_lay_color">
                                                                <td>
                                                                    <p
                                                                        className="runner_text"
                                                                        id=""
                                                                        runner=""
                                                                        selectionid=""
                                                                    >
                                                                        New Zealand
                                                                    </p>
                                                                    <span
                                                                        className="runner_amount"
                                                                        style={{
                                                                            color: "rgb(60, 210, 71)",
                                                                            fontSize: 12,
                                                                            fontWeight: "bold"
                                                                        }}
                                                                        id="withBetown448"
                                                                    >
                                                                        36.00
                                                                    </span>
                                                                </td>
                                                                <td
                                                                    className="mark-back"
                                                                    style={{ verticalAlign: "middle !important" }}
                                                                >
                                                                    <span
                                                                        id="team1back1own448"
                                                                        style={{ fontWeight: "bold", fontSize: 13 }}
                                                                    />
                                                                </td>
                                                                <td
                                                                    className="mark-lay"
                                                                    style={{ verticalAlign: "middle !important" }}
                                                                >
                                                                    <span
                                                                        id="team1lay1own448"
                                                                        style={{ fontWeight: "bold", fontSize: 13 }}
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr id="user_row " className="back_lay_color">
                                                                <td>
                                                                    <p
                                                                        className="runner_text"
                                                                        id=""
                                                                        runner=""
                                                                        selectionid=""
                                                                    >
                                                                        South Africa
                                                                    </p>
                                                                    <span
                                                                        className="runner_amount"
                                                                        style={{
                                                                            color: "rgb(255, 99, 71)",
                                                                            fontSize: 12,
                                                                            fontWeight: "bold"
                                                                        }}
                                                                        id="withBetown349"
                                                                    >
                                                                        -90.00
                                                                    </span>
                                                                </td>
                                                                <td
                                                                    className="mark-back"
                                                                    style={{ verticalAlign: "middle !important" }}
                                                                >
                                                                    <span
                                                                        id="team1back1own349"
                                                                        style={{ fontWeight: "bold", fontSize: 13 }}
                                                                    />
                                                                </td>
                                                                <td
                                                                    className="mark-lay"
                                                                    style={{ verticalAlign: "middle !important" }}
                                                                >
                                                                    <span
                                                                        id="team1lay1own349"
                                                                        style={{ fontWeight: "bold", fontSize: 13 }}
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr id="user_row " className="back_lay_color">
                                                                <td>
                                                                    <p
                                                                        className="runner_text"
                                                                        id=""
                                                                        runner=""
                                                                        selectionid=""
                                                                    >
                                                                        The Draw
                                                                    </p>
                                                                    <span
                                                                        className="runner_amount"
                                                                        style={{
                                                                            color: "rgb(255, 99, 71)",
                                                                            fontSize: 12,
                                                                            fontWeight: "bold"
                                                                        }}
                                                                        id="withBetown60443"
                                                                    >
                                                                        -90.00
                                                                    </span>
                                                                </td>
                                                                <td
                                                                    className="mark-back"
                                                                    style={{ verticalAlign: "middle !important" }}
                                                                >
                                                                    <span
                                                                        id="team1back1own60443"
                                                                        style={{ fontWeight: "bold", fontSize: 13 }}
                                                                    />
                                                                </td>
                                                                <td
                                                                    className="mark-lay"
                                                                    style={{ verticalAlign: "middle !important" }}
                                                                >
                                                                    <span
                                                                        id="team1lay1own60443"
                                                                        style={{ fontWeight: "bold", fontSize: 13 }}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="match_score_box" style={{ display: "none" }}>
                                                <div className="modal-header mod-header">
                                                    <div className="block_box">
                                                        <span id="tital_change">
                                                            {" "}
                                                            <span id="matchnameid">
                                                                <i
                                                                    onclick=""
                                                                    className="fa fa-star-o"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                            Fancy
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="fullrow margin_bottom fancybox  "
                                                id="inner-fancy_own"
                                                style={{
                                                    lineHeight: 1,
                                                    border: "solid 1px #dbdbdb",
                                                    marginTop: "1%"
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <style
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            "\n            button.btn.btn-primary.btn-xs.yellow1 {\n              background: yellow;\n              color: #000000;\n            }\n\n            .match_bets table tbody tr td {\n              padding: 5px 5px;\n            }\n\n            .wspace {\n              white-space: nowrap;\n            }\n          "
                                    }}
                                />
                            </div>
                            <div className="modal fade" id="myModal" role="dialog">
                                <div className="modal-dialog">
                                    {/* Modal content*/}
                                    <div className="modal-content">
                                        <div
                                            className="modal-body"
                                            style={{
                                                height: 500,
                                                overflowY: "scroll",
                                                padding: "0 !important"
                                            }}
                                        >
                                            <table
                                                className="table common-table master-list-table"
                                                style={{
                                                    marginBottom: 0,
                                                    background: "#fff",
                                                    height: 500,
                                                    overflowY: "scroll"
                                                }}
                                                id="userTable"
                                            >
                                                <thead>
                                                    <tr style={{ background: "#654062" }}>
                                                        <th style={{ color: "#fff" }}>Fancy Book</th>
                                                        <th />
                                                    </tr>
                                                    <tr style={{ background: "#654062" }}>
                                                        <th style={{ color: "#fff" }}>Rates</th>
                                                        <th style={{ color: "#fff" }}>P&amp;L</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="fancyBook" style={{ background: "#fff" }}></tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*button style="float:right" class="btn btn-primary btn-xs" >Bets</button*/}
                            <div className="col-md-4 col-xs-12 matchBox">
                                <div className="betSlipBox" style={{}}>
                                    <div>
                                        <div className="tab_bets">
                                            <ul
                                                className="nav nav-tabs nav-pills mb-3"
                                                id="pills-tab"
                                                role="tablist"
                                            >
                                                <li className="nav-item betdata active-all active" id="aabet">
                                                    <a
                                                        data-toggle="tab"
                                                        href="#allbetss"
                                                        className="allbet"
                                                        id="allbet"
                                                    >
                                                        {" "}
                                                        <span className="bet-label" style={{ color: "#fff" }}>
                                                            All Bet
                                                        </span>{" "}
                                                        <span>
                                                            (
                                                            <span id="matched-betsCount" style={{ color: "#fff" }}>
                                                                1
                                                            </span>
                                                            )
                                                        </span>
                                                    </a>
                                                </li>
                                                <li className="nav-item betdata" id="ffbet">
                                                    <a data-toggle="tab" href="#fbets" className="unmatchbet">
                                                        {" "}
                                                        <span className="bet-label">Fancy Bet</span>{" "}
                                                        <span>
                                                            (<span id="fancy-betsCount">0</span>)
                                                        </span>
                                                    </a>
                                                </li>
                                                <li className="nav-item active-position" id="ccpos">
                                                    <a
                                                        className="currentposition hidden-xs"
                                                        data-toggle="tab"
                                                        href="#cposition"
                                                    >
                                                        Current Position
                                                    </a>{" "}
                                                    <a
                                                        className="currentposition hidden-lg hidden-md hidden-sm"
                                                        data-toggle="tab"
                                                        href="#cposition"
                                                    >
                                                        Curr Pos
                                                    </a>
                                                </li>
                                                <li
                                                    className="nav-item active-position"
                                                    style={{ float: "right", cursor: "pointer" }}
                                                >
                                                    <a style={{ padding: "9px 5px" }} className="">
                                                        <i className="fa fa-refresh" aria-hidden="true" />
                                                    </a>
                                                </li>
                                                <li
                                                    className="nav-item active-position"
                                                    style={{ float: "right", cursor: "pointer" }}
                                                >
                                                    <a style={{ padding: "9px 5px" }} id="togdiv">
                                                        <span>
                                                            &nbsp;
                                                            <i className="fas fa-caret-down" aria-hidden="true" />
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/*- Match UnMatch data -*/}
                                <div className="tab-content" id="">
                                    <div className="border-box" id="accountView" role="main">
                                        <div className="fullrow">
                                            <div className="modal-dialog-staff">
                                                <div className="modal-content">
                                                    <div className="modal-body" id="maindivbets" style={{}}>
                                                        <div
                                                            className="match_bets MachShowHide tab-pane fade in active"
                                                            id="allbetss"
                                                        >
                                                            <input
                                                                style={{ margin: 3, borderRadius: 5 }}
                                                                id="matchBetSearch"
                                                                type="search"
                                                                className="sr"
                                                                placeholder="Search Here..."
                                                                aria-controls="datatable"
                                                            />
                                                            <table className="table table-striped jambo_table bulk_action wspace auto-index">
                                                                <thead>
                                                                    <tr className="headings">
                                                                        <th>No.</th>
                                                                        <th>Runner</th>
                                                                        <th>Client</th>
                                                                        <th>Odds</th>
                                                                        <th>Stack</th>
                                                                        <th style={{ width: "10%" }}>Bet Type</th>
                                                                        <th>Placed Time</th>
                                                                        <th style={{ width: "15%" }}>Matched Time</th>
                                                                        <th>T</th>
                                                                        <th>IP</th>
                                                                        <th>Master</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="match-bet">
                                                                    <tr
                                                                        id="user_row_3993199"
                                                                        className="mark-lay content_user_table"
                                                                    >
                                                                        <td className="mark-lay" />
                                                                        <td className="mark-lay">New Zealand</td>
                                                                        <td className="mark-lay">ravi6666</td>
                                                                        <td className="mark-lay">0.4</td>
                                                                        <td className="mark-lay">100</td>
                                                                        <td className="mark-lay">Lay</td>
                                                                        <td className="mark-lay">
                                                                            Sun Feb 04 09:35:06 IST 2024
                                                                        </td>
                                                                        <td className="mark-lay">
                                                                            Sun Feb 04 09:35:11 IST 2024
                                                                        </td>
                                                                        <td className="mark-lay">M</td>
                                                                        <td className="mark-lay">106.203.142.18</td>
                                                                        <td className="mark-lay">std@30</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div
                                                            className="match_bets MachShowHide tab-pane fade"
                                                            id="fbets"
                                                        >
                                                            <input
                                                                style={{ margin: 3, borderRadius: 5 }}
                                                                id="fancyBetSearch"
                                                                type="search"
                                                                className="sr"
                                                                placeholder="Search Here..."
                                                                aria-controls="datatable"
                                                            />
                                                            <table className="table table-striped jambo_table bulk_action wspace auto-index">
                                                                <thead>
                                                                    <tr className="headings">
                                                                        <th>No.</th>
                                                                        <th>Runner</th>
                                                                        <th style={{ width: "10%" }}>Bet Type</th>
                                                                        <th>Client</th>
                                                                        <th>Odds</th>
                                                                        <th>Stack</th>
                                                                        <th style={{ width: "15%" }}>Placed Time</th>
                                                                        <th style={{ width: "15%" }}>Matched Time</th>
                                                                        <th>IP</th>
                                                                        <th>Master</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="fancy-bet"></tbody>
                                                            </table>
                                                        </div>
                                                        <div
                                                            className="match_bets MachShowHide tab-pane fade"
                                                            id="cposition"
                                                        >
                                                            <div className="pull-right">
                                                                <a onclick="openParentPosition()">Back</a>
                                                            </div>
                                                            <table
                                                                className="table table-striped jambo_table bulk_action"
                                                                style={{ width: "100%" }}
                                                            >
                                                                <thead>
                                                                    <tr className="headings">
                                                                        <th>Account</th>
                                                                        <th>New Zealand</th>
                                                                        <th>South Africa</th>
                                                                        <th>The Draw</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="userProitList">
                                                                    <tr id="" className="mark-lay content_user_table">
                                                                        <td>
                                                                            <a
                                                                                style={{ fontWeight: 700, marginLeft: 5 }}
                                                                                href="javascript:;"
                                                                                onclick="Userpnlhtml('std@30')"
                                                                            >
                                                                                std@30
                                                                            </a>
                                                                        </td>
                                                                        <td className="cell-selection-1">
                                                                            <span style={{ marginLeft: 5 }} className="red">
                                                                                0.00
                                                                            </span>
                                                                        </td>
                                                                        <td className="cell-selection-1">
                                                                            <span style={{ marginLeft: 5 }} className="red">
                                                                                0.00
                                                                            </span>
                                                                        </td>
                                                                        <td className="cell-selection-1">
                                                                            <span style={{ marginLeft: 5 }} className="red">
                                                                                0.00
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr id="" className="mark-lay content_user_table">
                                                                        <td onclick="showMyCurrentPos()">
                                                                            <a style={{ fontWeight: 700, marginLeft: 5 }}>
                                                                                Own
                                                                            </a>
                                                                        </td>
                                                                        <td className="cell-selection-1">
                                                                            <span style={{ marginLeft: 5 }} className="green">
                                                                                36.00
                                                                            </span>
                                                                        </td>
                                                                        <td className="cell-selection-1">
                                                                            <span style={{ marginLeft: 5 }} className="red">
                                                                                -90.00
                                                                            </span>
                                                                        </td>
                                                                        <td className="cell-selection-1">
                                                                            <span style={{ marginLeft: 5 }} className="red">
                                                                                -90.00
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr id="" className="mark-lay content_user_table">
                                                                        <td>
                                                                            <a style={{ fontWeight: 700, marginLeft: 5 }}>
                                                                                Parent
                                                                            </a>
                                                                        </td>
                                                                        <td className="cell-selection-1">
                                                                            <span style={{ marginLeft: 5 }} className="green">
                                                                                4.00
                                                                            </span>
                                                                        </td>
                                                                        <td className="cell-selection-1">
                                                                            <span style={{ marginLeft: 5 }} className="red">
                                                                                -10.00
                                                                            </span>
                                                                        </td>
                                                                        <td className="cell-selection-1">
                                                                            <span style={{ marginLeft: 5 }} className="red">
                                                                                -10.00
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr id="" className="mark-lay content_user_table">
                                                                        <td>
                                                                            <a style={{ fontWeight: 700, marginLeft: 5 }}>
                                                                                Total
                                                                            </a>
                                                                        </td>
                                                                        <td className="cell-selection-1">
                                                                            <span style={{ marginLeft: 5 }} className="green">
                                                                                40.00
                                                                            </span>
                                                                        </td>
                                                                        <td className="cell-selection-1">
                                                                            <span style={{ marginLeft: 5 }} className="red">
                                                                                -100.00
                                                                            </span>
                                                                        </td>
                                                                        <td className="cell-selection-1">
                                                                            <span style={{ marginLeft: 5 }} className="red">
                                                                                -100.00
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="panel-heading bhead tab_bets"
                                            style={{ padding: "6px 15px" }}
                                        >
                                            <span style={{ color: "#fff" }} className="bal-tittle">
                                                Fancy Result
                                            </span>
                                            <a
                                                style={{ float: "right", color: "#fff" }}
                                                id="fancyresultshowarrow"
                                            >
                                                <i
                                                    className="fa fa-caret-down"
                                                    style={{ fontSize: 20 }}
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </div>
                                        <div
                                            className="table-responsive"
                                            id="fancyresultdiv"
                                            style={{
                                                marginTop: "1%",
                                                width: "100%",
                                                height: 380,
                                                overflowY: "scroll"
                                            }}
                                        >
                                            <table
                                                className="table table-striped jambo_table bulk_action no-footer dataTable"
                                                style={{
                                                    margin: "0 !important",
                                                    background: "#fff",
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                <thead>
                                                    <tr className="headings">
                                                        <th className="darkpurplecolor">S.No.</th>
                                                        <th className="lightgreencolor">Event Name</th>
                                                        <th className="lightgreencolor">ID</th>
                                                        <th className="darkpurplecolor">Market</th>
                                                        <th className="lightgreencolor">P_L</th>
                                                        <th className="darkpurplecolor">Commission</th>
                                                        <th className="lightgreencolor">Created On</th>
                                                        <th className="darkpurplecolor">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="betlistdiv">
                                                    <tr>
                                                        <td>1</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-583.FY</td>
                                                        <td>38 over run NZ 2</td>
                                                        <td className="checkColor red">-450.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 10:40:31</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c1bf474c06135f43dfa71e/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-582.FY</td>
                                                        <td>37 over run NZ 2</td>
                                                        <td className="checkColor green">1800.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 10:40:20</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c1bf3c4c06135f43dfa6cd/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-581.FY</td>
                                                        <td>36 over run NZ 2</td>
                                                        <td className="checkColor green">900.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 10:40:04</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c1bf2c4c06135f43dfa697/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-578.FY</td>
                                                        <td>33 over run NZ 2</td>
                                                        <td className="checkColor green">180.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 10:19:50</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c1ba6e4c06135f43df9c1b/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-577.FY</td>
                                                        <td>32 over run NZ 2</td>
                                                        <td className="checkColor red">-180.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 10:19:43</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c1ba674c06135f43df9bcf/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-576.FY</td>
                                                        <td>31 over run NZ 2</td>
                                                        <td className="checkColor green">900.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 10:09:44</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c1b8104c06135f43df9484/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-565.FY</td>
                                                        <td>30 over run NZ 2</td>
                                                        <td className="checkColor red">-1800.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 10:09:30</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c1b8024c06135f43df93cc/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-518.FY</td>
                                                        <td>Fall of 2nd wkt NZ 2</td>
                                                        <td className="checkColor red">-2430.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 10:00:28</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c1b5e44c06135f43df8e63/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>9</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-503.FY</td>
                                                        <td>10 over run NZ 2</td>
                                                        <td className="checkColor red">-90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 08:13:53</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c19ce94c06135f43df6065/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>10</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-507.FY</td>
                                                        <td>Only 6 over run NZ 2</td>
                                                        <td className="checkColor green">90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 07:53:57</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c1983d4c06135f43df5c5e/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>11</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-498.FY</td>
                                                        <td>5 over run NZ 2</td>
                                                        <td className="checkColor green">90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 07:53:08</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c1980c4c06135f43df5bbd/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>12</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-512.FY</td>
                                                        <td>Fall of 1st wkt NZ 2</td>
                                                        <td className="checkColor green">720.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 07:48:21</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c196ed4c06135f43df5acc/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>13</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-504.FY</td>
                                                        <td>Only 3 over run NZ 2</td>
                                                        <td className="checkColor red">-90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 07:37:13</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c194514c06135f43df5932/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>14</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-396.FY</td>
                                                        <td>1st Innings run SA</td>
                                                        <td className="checkColor red">-900.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 07:13:24</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c18ebc4c06135f43df54d7/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>15</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-459.FY</td>
                                                        <td>55 over run SA</td>
                                                        <td className="checkColor red">-585.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 05:35:57</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c177e54c06135f43df4a40/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>16</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-377.FY</td>
                                                        <td>Fall of 7th wkt SA</td>
                                                        <td className="checkColor red">-504.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 05:18:17</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c173c14c06135f43df4903/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>17</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-435.FY</td>
                                                        <td>41 over run SA</td>
                                                        <td className="checkColor green">450.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 04:36:24</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c169f04c06135f43df4524/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>18</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-375.FY</td>
                                                        <td>Fall of 5th wkt SA</td>
                                                        <td className="checkColor red">-720.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-06 03:54:54</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c160364c06135f43df40e2/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>19</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-359.FY</td>
                                                        <td>20 over run SA</td>
                                                        <td className="checkColor green">0.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 10:35:04</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c06c804c06135f43de0472/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>20</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-353.FY</td>
                                                        <td>Only 17 over run SA</td>
                                                        <td className="checkColor green">90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 10:15:28</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c067e84c06135f43ddfc31/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>21</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-358.FY</td>
                                                        <td>15 over run SA</td>
                                                        <td className="checkColor red">-450.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 10:07:54</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c066224c06135f43ddf999/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>22</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-351.FY</td>
                                                        <td>Only 15 over run SA</td>
                                                        <td className="checkColor red">-450.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 10:07:49</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c0661d4c06135f43ddf966/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>23</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-347.FY</td>
                                                        <td>Only 11 over run SA</td>
                                                        <td className="checkColor red">-90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 09:50:15</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c061fe4c06135f43ddf13f/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>24</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-296.FY</td>
                                                        <td>125 over run NZ</td>
                                                        <td className="checkColor red">-90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 07:19:38</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c03eb14c06135f43ddcfeb/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>25</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-252.FY</td>
                                                        <td>115 over run NZ</td>
                                                        <td className="checkColor green">540.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 07:13:53</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c03d594c06135f43ddcd0f/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>26</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-260.FY</td>
                                                        <td>113 over run NZ</td>
                                                        <td className="checkColor green">90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 05:36:01</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c026694c06135f43ddc828/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>27</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-251.FY</td>
                                                        <td>110 over run NZ</td>
                                                        <td className="checkColor red">-450.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 05:34:57</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c026294c06135f43ddc7bc/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>28</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-266.FY</td>
                                                        <td>Only 106 over run NZ</td>
                                                        <td className="checkColor green">90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 05:12:31</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c020e74c06135f43ddc712/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>29</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-223.FY</td>
                                                        <td>105 over run NZ</td>
                                                        <td className="checkColor red">-180.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 05:12:21</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c020dd4c06135f43ddc6db/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>30</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-232.FY</td>
                                                        <td>101 over run NZ</td>
                                                        <td className="checkColor green">90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 05:11:09</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c020954c06135f43ddc6c5/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>31</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-222.FY</td>
                                                        <td>100 over run NZ</td>
                                                        <td className="checkColor red">-450.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 04:35:27</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c018374c06135f43ddc619/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>32</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-243.FY</td>
                                                        <td>Only 98 over run NZ</td>
                                                        <td className="checkColor green">180.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 04:34:25</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c017f94c06135f43ddc602/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>33</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-229.FY</td>
                                                        <td>97 over run NZ</td>
                                                        <td className="checkColor green">180.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 04:34:15</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c017ef4c06135f43ddc5f2/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>34</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-220.FY</td>
                                                        <td>90 over run NZ</td>
                                                        <td className="checkColor green">90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-05 04:29:12</td>
                                                        <td>
                                                            <a href="/showBetsCR/65c016c04c06135f43ddc319/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>35</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-211.FY</td>
                                                        <td>81 over run NZ</td>
                                                        <td className="checkColor green">90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 10:38:58</td>
                                                        <td>
                                                            <a href="/showBetsCR/65bf1bea4c06135f43dad118/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>36</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-195.FY</td>
                                                        <td>75 over run NZ</td>
                                                        <td className="checkColor green">90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 10:11:47</td>
                                                        <td>
                                                            <a href="/showBetsCR/65bf158b4c06135f43dabed0/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>37</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-190.FY</td>
                                                        <td>70 over run NZ</td>
                                                        <td className="checkColor red">-180.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 09:45:20</td>
                                                        <td>
                                                            <a href="/showBetsCR/65bf0f584c06135f43daac27/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>38</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-131.FY</td>
                                                        <td>Only 51 over run NZ</td>
                                                        <td className="checkColor green">90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 08:18:42</td>
                                                        <td>
                                                            <a href="/showBetsCR/65befb0a4c06135f43da87d7/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>39</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-150.FY</td>
                                                        <td>50 over run NZ</td>
                                                        <td className="checkColor green">540.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 08:18:32</td>
                                                        <td>
                                                            <a href="/showBetsCR/65befb004c06135f43da8681/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>40</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-128.FY</td>
                                                        <td>Only 48 over run NZ</td>
                                                        <td className="checkColor red">-90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 07:57:32</td>
                                                        <td>
                                                            <a href="/showBetsCR/65bef6144c06135f43da830b/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>41</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-126.FY</td>
                                                        <td>Only 46 over run NZ</td>
                                                        <td className="checkColor red">-90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 07:49:56</td>
                                                        <td>
                                                            <a href="/showBetsCR/65bef44c4c06135f43da8158/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>42</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-145.FY</td>
                                                        <td>45 over run NZ</td>
                                                        <td className="checkColor red">-477.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 07:42:43</td>
                                                        <td>
                                                            <a href="/showBetsCR/65bef29b4c06135f43da7f34/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>43</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-123.FY</td>
                                                        <td>Only 43 over run NZ</td>
                                                        <td className="checkColor red">-90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 07:34:08</td>
                                                        <td>
                                                            <a href="/showBetsCR/65bef0984c06135f43da7daf/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>44</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-122.FY</td>
                                                        <td>Only 42 over run NZ</td>
                                                        <td className="checkColor green">180.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 07:31:29</td>
                                                        <td>
                                                            <a href="/showBetsCR/65beeff94c06135f43da7cff/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>45</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-120.FY</td>
                                                        <td>40 over run NZ</td>
                                                        <td className="checkColor red">-1080.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 07:24:22</td>
                                                        <td>
                                                            <a href="/showBetsCR/65beee4e4c06135f43da7ae9/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>46</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-98.FY</td>
                                                        <td>Only 38 over run NZ</td>
                                                        <td className="checkColor red">-450.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 07:10:48</td>
                                                        <td>
                                                            <a href="/showBetsCR/65beeb204c06135f43da7894/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>47</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-115.FY</td>
                                                        <td>35 over run NZ</td>
                                                        <td className="checkColor red">-630.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 06:57:17</td>
                                                        <td>
                                                            <a href="/showBetsCR/65bee7f54c06135f43da7649/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>48</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-95.FY</td>
                                                        <td>Only 35 over run NZ</td>
                                                        <td className="checkColor red">-450.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 06:57:11</td>
                                                        <td>
                                                            <a href="/showBetsCR/65bee7ef4c06135f43da7637/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>49</td>
                                                        <td>New Zealand v South Africa</td>
                                                        <td>32982404-110.FY</td>
                                                        <td>30 over run NZ</td>
                                                        <td className="checkColor green">90.00</td>
                                                        <td>0</td>
                                                        <td>2024-02-04 06:38:42</td>
                                                        <td>
                                                            <a href="/showBetsCR/65bee39a4c06135f43da736c/1/10/manis12">
                                                                Show Bets
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ background: "#e4e4e4", color: "red" }}>
                                                        <td colSpan={4} style={{ textAlign: "center" }}>
                                                            Total
                                                        </td>
                                                        <td className="checkColor red">-5886.00</td>
                                                        <td />
                                                        <td />
                                                        <td />
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/*- User Current Position  -*/}
                            </div>
                           
                            {/*- Chips Setting */}
                            {/* add player popup start */}
                        </div>
                    </div>

                    <div
                        id="listmatch"
                        className="modal fade"
                        role="dialog"
                        style={{ top: "11%", display: "none" }}
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            {/* Modal content*/}
                            <div className="modal-content">
                                <div className="modal-header" style={{ background: "#b351c7" }}>
                                    <button
                                        style={{ lineHeight: 10, color: "#fff", opacity: 1 }}
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                    >
                                        x
                                    </button>
                                </div>
                                <div className="modal-body" style={{ padding: 0 }}>
                                    <div
                                        className="table-responsive"
                                        style={{ textAlign: "center", margin: 0 }}
                                        id="matchlistdiv"
                                    >
                                        <table
                                            className="table table-bordered common-table"
                                            style={{ marginBottom: 0 }}
                                        >
                                            <tbody id="matchListBody">
                                                <tr style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/4/32994370/32994370"
                                                            >
                                                                Australia v West Indies
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/4/32995177/32995177"
                                                            >
                                                                Durdanto Dhaka v Rangpur Riders
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/4/32993445/32993445"
                                                            >
                                                                South Africa U19 v India U19
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/1/32992146/32992146"
                                                            >
                                                                Madura Utd v RANS Nusantara FC
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/1/32992135/32992135"
                                                            >
                                                                Dewa United FC v PS Barito Putera
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/2/32995022/32995022"
                                                            >
                                                                L Glushko v Hesse
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/2/32993051/32993051"
                                                            >
                                                                Ar Rodionova v Lamens
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/2/32993011/32993011"
                                                            >
                                                                Zakharova v Poli Kudermetova
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/2/32993071/32993071"
                                                            >
                                                                Car Monnet v Uchijima
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/2/32993040/32993040"
                                                            >
                                                                Tikhonova v T Zidansek
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/2/32995032/32995032"
                                                            >
                                                                Pean Plipuech v Bhosale
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr style={{ background: "#000" }}>
                                                    <td className="cell-market-title">
                                                        <span>
                                                            <a
                                                                className="event-name"
                                                                style={{ color: "#fff" }}
                                                                href="/cuttingExpo/2/32997400/32997400"
                                                            >
                                                                Sorribes Tormo v L Noskova
                                                            </a>{" "}
                                                            <span style={{ float: "right" }} />
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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

export default CuttingExpo