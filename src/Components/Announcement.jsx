import React, { useEffect, useState } from 'react'
import Header from './Header';
import Footer from './Footer';

const Announcement = () => {


  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const month = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "Aug",
    "09": "Sept",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",

  }

  //  console.log(month);
  //  const monthe = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];




  // function for adding data in data from backend
  const fetchData = async () => {
    setIsLoading(true)
    try {

      let res = await fetch("https://api.s2bet.in/api/getdata/announcement");
      let resData = await res.json();
      console.log(resData);
      setData(resData);
    } catch (error) {
      console.error("Error fetching Users api " + error);
    } finally {
      // Set loading state back to false after the request is completed
      setIsLoading(false);
    }

  }


  useEffect(() => {
    fetchData();
  }, [])



  return (
    <>

      {isLoading && <div className="spinner" id="loader-1" style={{ display: 'block' }}></div>}

      {/* <div className="nav-md"> */}
      <div className="container body">

        <Header />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n      @media only screen and (max-width: 700px) {\n        .fsize {\n          font-size: 15px !important;\n        }\n      }\n\n      .margin0 {\n        margin: 0;\n      }\n\n      .box:nth-of-type(odd) {\n        background-color: #fffff3;\n      }\n\n      .box:nth-of-type(even) {\n        background-color: #fff;\n      }\n\n      div.box {\n        height: auto;\n      }\n    "
          }}
        />
        {/* page content */}
        <div className="right_col" role="main" style={{ minHeight: 371 }}>
          <div className="loader" style={{ display: "none" }} />
          <div id="page-wrapper">
            <div className="">
              <div className="col-md-12" style={{ background: "#fff" }}>
                <div className="title_new_at">
                  Announcement
                  <select id="pages" style={{ color: "black", fontSize: '13px' }}>
                    <option value={10} selected="selected">
                      10
                    </option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <div className="pull-right">
                    <button
                      className="btn_common"
                      onclick="javascript:history.go(-1)"
                    >
                      Back
                    </button>
                  </div>
                </div>

                {/* div in which the data will be map */}
                <div
                  className="col-md-12"
                  style={{ padding: 0, marginTop: 2 }}
                  id="data"
                >

                  {data.map((e) => {
                    return (

                      <div
                        className="row box"
                        style={{ marginBottom: "5px !important", margin: 0 }}
                        key={e.SrNo}
                      >
                        <div
                          className="col-lg-1 col-xs-2"
                          style={{
                            textAlign: "center",
                            padding: 0,
                            border: "1px solid #000"
                          }}
                        >
                          <p
                            className="margin0"
                            style={{ fontWeight: 700, fontSize: 25 }}
                          >

                            {e.NotificationDate.split('-')[2].split('T')[0]}
                          </p>
                          <p className="margin0">{month[e.NotificationDate.split('-')[1]]}</p>
                          <p className="margin0">{e.NotificationDate.split('-')[0]}</p>
                        </div>
                        <div className="col-lg-11 col-xs-10">
                          <span style={{ fontWeight: 700, fontSize: 20 }}>{e.tittle}</span>
                          <p className="fsize" style={{ fontSize: 17 }}>
                            {e.detail}
                          </p>
                        </div>
                      </div>

                    )
                  })}

                  {/* <div
                  className="row box"
                  style={{ marginBottom: "5px !important", margin: 0 }}
                >
                  <div
                    className="col-lg-1 col-xs-2"
                    style={{
                      textAlign: "center",
                      padding: 0,
                      border: "1px solid #000"
                    }}
                  >
                    <p
                      className="margin0"
                      style={{ fontWeight: 700, fontSize: 25 }}
                    >
                      24
                    </p>
                    <p className="margin0">Mar</p>
                    <p className="margin0">2022</p>
                  </div>
                  <div className="col-lg-11 col-xs-10">
                    <span style={{ fontWeight: 700, fontSize: 20 }}>IPL</span>
                    <p className="fsize" style={{ fontSize: 17 }}>
                      AAP SABKO AANE WALE IPL KI SHUBKAMNAYE
                    </p>
                  </div>
                </div> */}
                  {/* <div
                  className="row box"
                  style={{ marginBottom: "5px !important", margin: 0 }}
                >
                  <div
                    className="col-lg-1 col-xs-2"
                    style={{
                      textAlign: "center",
                      padding: 0,
                      border: "1px solid #000"
                    }}
                  >
                    <p
                      className="margin0"
                      style={{ fontWeight: 700, fontSize: 25 }}
                    >
                      07
                    </p>
                    <p className="margin0">Sep</p>
                    <p className="margin0">2021</p>
                  </div>
                  <div className="col-lg-11 col-xs-10">
                    <span style={{ fontWeight: 700, fontSize: 20 }}>
                      Old Data
                    </span>
                    <p className="fsize" style={{ fontSize: 17 }}>
                      PURANA DATA http://old4bet.dsbet.in/ PE JAKE DEKH SAKTE HAI
                    </p>
                  </div>
                </div> */}
                  {/* <div
                  className="row box"
                  style={{ marginBottom: "5px !important", margin: 0 }}
                >
                  <div
                    className="col-lg-1 col-xs-2"
                    style={{
                      textAlign: "center",
                      padding: 0,
                      border: "1px solid #000"
                    }}
                  >
                    <p
                      className="margin0"
                      style={{ fontWeight: 700, fontSize: 25 }}
                    >
                      07
                    </p>
                    <p className="margin0">Sep</p>
                    <p className="margin0">2021</p>
                  </div>
                  <div className="col-lg-11 col-xs-10">
                    <span style={{ fontWeight: 700, fontSize: 20 }}>
                      OLD DATA{" "}
                    </span>
                    <p className="fsize" style={{ fontSize: 17 }}>
                      PURANA DATA old4bet.dsbet.in. / PE JAKE DEKH SAKTE HAI
                      PURANA DATA 3 DIN K LIE RAHEGASAB LOG APNA PURANA SETTLEMENT
                      CLEAR KAR LE
                    </p>
                  </div>
                </div> */}
                </div>
                <div
                  className="dataTables_wrapper no-footer"
                  style={{ marginBottom: "5%" }}
                >
                  <div
                    className="dataTables_info"
                    id="datatable_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing 1 to 3 of Entries 3
                  </div>
                  <div
                    className="dataTables_paginate paging_full_numbers"
                    id="pages_data"
                  >
                    <a
                      className="paginate_button first disabled"
                      aria-controls="DataTables_Table_0"
                      data-dt-idx={0}
                      tabIndex={-1}
                      id="DataTables_Table_0_first"
                    >
                      First
                    </a>
                    <a
                      className="paginate_button previous disabled"
                      aria-controls="DataTables_Table_0"
                      data-dt-idx={1}
                      tabIndex={-1}
                      id="DataTables_Table_0_previous"
                    >
                      Previous
                    </a>
                    <span>
                      <a
                        className="paginate_button current"
                        aria-controls="DataTables_Table_0"
                        data-dt-idx={2}
                        tabIndex={0}
                      >
                        1
                      </a>
                    </span>
                    <a
                      className="paginate_button previous disabled"
                      aria-controls="DataTables_Table_0"
                      data-dt-idx={1}
                      tabIndex={-1}
                      id="DataTables_Table_0_previous"
                    >
                      Next
                    </a>
                    <a
                      className="paginate_button first disabled"
                      aria-controls="DataTables_Table_0"
                      data-dt-idx={0}
                      tabIndex={-1}
                      id="DataTables_Table_0_first"
                    >
                      Last
                    </a>
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
      <div className="sweet-container">
        <div className="sweet-overlay" tabIndex={-1} />
        <div className="sweet-alert" style={{ display: "none" }} tabIndex={-1}>
          <div className="sweet-icon sweet-error">
            <span className="x-mark">
              <span className="line left" />
              <span className="line right" />
            </span>
          </div>
          <div className="sweet-icon sweet-question">?</div>
          <div className="sweet-icon sweet-warning">!</div>
          <div className="sweet-icon sweet-info">i</div>
          <div className="sweet-icon sweet-success">
            {" "}
            <span className="line tip" /> <span className="line long" />
            <div className="placeholder" />
            <div className="fix" />
          </div>{" "}
          <img className="sweet-image" />
          <h2>Title</h2>
          <div className="sweet-content">Text</div>
          <hr className="sweet-spacer" />
          <button className="sweet-confirm">OK</button>
          <button className="sweet-cancel">Cancel</button>
        </div>
      </div>
      {/* </div> */}
    </>


  )
}

export default Announcement
