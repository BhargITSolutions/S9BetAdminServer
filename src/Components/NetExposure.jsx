import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

function NetExposure() {

    const navigate = useNavigate();

    const [data, setData] = useState([])

    useEffect(() => {
        fetchInPlay();
    }, [])


    const fetchInPlay = async () => {
        try {
            const fetched = await fetch('http://localhost:5000/getAllEvent');
            const response = await fetched.json()
            console.log("sports event api  : " + JSON.stringify(response))
            console.log("sports event length  : " + response.data.length)

            setData(response.data)
        } catch (error) {
            console.error("Error fetching Inplay api " + error)
        }

    }

    const handleEvent = (eid, gameId) => {
        navigate(`/cuttingExpo/${eid}/${gameId}`);
    }
    return (
        <>
            <div className="nav-md">
                <div className="container body">
                    <Header />


                    {/* page content */}
                    <div className="right_col" role="main" style={{ minHeight: 599 }}>
                        <div className="loader" style={{ display: "none" }} />
                        <div className="">
                            <div className="col-md-12">
                                <div className="title_new_at"> My Market</div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div id="divLoading"> </div>
                                {/*Loading class */}
                                <div className="table-responsive" id="filterdata">


                                    <table
                                        className="table table-striped jambo_table bulk_action"
                                        id="matchesData"
                                    >
                                        {data.length > 0 && data.map((item, index) => {
                                            return (
                                                <>
                                                    <thead>
                                                        <tr className="headings">
                                                            <th className="darkpurplecolor">S.No. </th>
                                                            <th className="lightgreencolor">Match Name </th>
                                                            <th className="darkpurplecolor">Date</th>
                                                            <th className="lightgreencolor">Sport Name</th>
                                                            <th className="darkpurplecolor">Match Status </th>
                                                            <th className="lightgreencolor">New Zealand</th>
                                                            <th className="darkpurplecolor">South Africa</th>
                                                            <th className="lightgreencolor">The Draw</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr id="user_row" onClick={(e) => { e.preventDefault(); handleEvent(item.eid, item.gameId) }}>
                                                            <td>{index + 1}</td>
                                                            <td className=" second_txt">
                                                                <a
                                                                    href={`/cuttingExpo/${item.eid}/${item.gameId}`}
                                                                    title="Match OODS"
                                                                    className="full_txt"
                                                                >
                                                                    {item.eventName}
                                                                </a>
                                                            </td>
                                                            <td>{item.eventDate}</td>
                                                            <td>{item.eid == 1 ? "Soccer" : item.eid == 2 ? "Tennis" : item.eid == 4 ? "Cricket" : ""}</td>
                                                            <td>OPEN</td>
                                                            <td className="green" id="book32982404448">
                                                                0.00
                                                            </td>
                                                            <td className="green" id="book32982404349">
                                                                0.00
                                                            </td>
                                                            <td className="green" id="book3298240460443">
                                                                0.00
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </>

                                            )
                                        })}


                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* top tiles */}
                        <div className="fullrow tile_count">
                            <div className="col-md-12 col-sm-12 col-xs-12" id="UpCommingData">
                                <div className=" " id="accountView" role="main">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div></div>
                                            <div className="modal-dialog-staff">
                                                <div className="modal-content">
                                                    <div className="modal-body">
                                                        <div
                                                            className="table table-striped jambo_table bulk_action"
                                                            id=""
                                                        >
                                                            <div className="clearfix" />
                                                            <div id="cricketProfit"></div>
                                                            <div className="clearfix" />
                                                            <div id="tennisProfit"></div>
                                                            <div className="clearfix" />
                                                            <div id="soccerProfit"></div>
                                                            <div className="clearfix" />
                                                        </div>
                                                    </div>
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

export default NetExposure