import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Footer from './Footer';
import Header from './Header';

const AnnouncementUpdating = () => {

  const [data, setData] = useState([]);
  let [tittle, setTittle] = useState("");
  let [detail, setDetail] = useState("");
  let [date, setDate] = useState();


  let [updatingTittle, setUpdatingTittle] = useState("");
  let [updatingDetail, setUpdatingDetail] = useState("");
  let [updatingDate, setUpdatingDate] = useState();

  let [currentId, setCurrentId] = useState(0);

  // for loading the fresh data
  let [load, setLoad] = useState(false);

  const month = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",

  }


  const fetchData = async () => {

    let res = await fetch("https://api.s2bet.in/api/getdata/announcement");
    let resData = await res.json();
    console.log(resData);
    setData(resData);


  }


  const addAnnoucement = async () => {

    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so we add 1
    const day = String(todayDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${Number(day) + 1}`;



    let body = {
      tittle: tittle,
      detail: detail,
      date: formattedDate
    };

    let res = await fetch("https://api.s2bet.in/api/addData/announcement", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(async (response) => {
      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {

          setLoad((prev) => !prev);
          console.log(load);
        })
      }
    });
  }






  // setting data after clicking on update button
  const setUpdatePreData = async (id) => {

    setCurrentId(id);
    let res = await fetch(`https://api.s2bet.in/api/setData/announcement/${id}`);
    let resData = await res.json();
    let date = resData[0].NotificationDate;
    const dateOnly = date.split('T')[0];
    setUpdatingDate(dateOnly);
    setUpdatingTittle(resData[0].tittle);
    setUpdatingDetail(resData[0].detail);
  }




  // updating data on announcement table for update btn
  const updateDatafunc = async () => {

    let body = {
      tittle: updatingTittle,
      detail: updatingDetail,
    };

    let res = await fetch(`https://api.s2bet.in/api/updateData/announcement/${currentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(async (response) => {
      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {

          setLoad((prev) => !prev);
          console.log(load);
        })
      }
    });


  }



  // delete btn function - to change the status of perticular announcement
  const deteleAnnouncement = async (id) => {

    Swal.fire({
      title: "Conformation",
      text: "Do you want to delete the announcement !!",
      icon: "question",
      confirmButtonText: "Yes",
      showCancelButton: true,
    })
      .then(async (result) => {

        if (!result.value) return;

        let res = await fetch(`https://api.s2bet.in/api/updateStatus/announcement/${id}`, {
          method: 'PUT'
        })
          .then(async (response) => {
            if (response.ok) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                setLoad((prev) => !prev);
                console.log(load);
              })
            }
          })
      })
  }



  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "tittle") {
      setTittle(value);
      return;
    }
    if (name === "detail") {
      setDetail(value);
    }
    if (name === "updatingTittle") {
      setUpdatingTittle(value);
    }
    if (name === "updatingDetail") {
      setUpdatingDetail(value);
    }
  }



  useEffect(() => {

    fetchData();
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so we add 1
    const day = String(todayDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    //console.log(formattedDate);
    setDate(formattedDate);


  }, [load])

  return (
    <>
      {/* <div className="nav-md"> */}
        <div className="container body">

          <Header />
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n            .mod-header {\n                background: #2a3f54;\n                color: white;\n            }\n\n            .close_new {\n                color: white;\n            }\n\n            #UpdateChipsMsg {\n                text-align: center;\n                margin: 10px 10px 15px;\n            }\n\n            .errmsg {\n                text-align: center;\n                color: red;\n            }\n\n            .succmsg {\n                text-align: center;\n                color: green;\n            }\n\n            .col-md-12.col-sm-12.col-xs-12.form-title {\n                border-bottom: 2px solid;\n                margin: 0 10px 15px;\n                font-size: 18px;\n                color: #2a3f54;\n            }\n\n            .top-margin {\n                margin: 10px 0px 15px;\n            }\n\n            .matchTime {\n                text-align: right;\n            }\n\n            .table-striped>tbody>tr:nth-of-type(odd) {\n                background-color: none;\n                color: #151313;\n            }\n\n            .table-striped>tbody>tr:nth-of-type(even) {\n                background-color: none;\n                color: #151313;\n            }\n\n            .inplay_txt blinking-inplay {\n                color: green;\n            }\n\n            .closedBox {\n                text-align: center;\n                color: #da881e;\n                font-size: 30px;\n                margin: 20px;\n            }\n\n            .yello {\n                background: #f5f511 !important;\n            }\n\n            .overlay-table {\n                position: absolute;\n                z-index: 999999;\n                background: rgba(0, 0, 0, 0.7);\n                width: 100%;\n                height: 100%;\n            }\n\n            .overlay-table span {\n                width: 100%;\n                font-size: 18px;\n                text-align: center;\n                display: inline-block;\n                color: #fff;\n                padding-top: 7%;\n            }\n\n            div#liveCommentary {\n                float: left;\n                text-align: center;\n                padding: 0 1%;\n                color: green;\n                font-weight: bold;\n                border: 1px solid #ddd;\n                background: #ffffff;\n                width: auto;\n            }\n\n            .mod-header {\n                background: #2a3f54;\n                color: white;\n            }\n\n            .close_new {\n                color: white;\n            }\n\n            #InfoUserMsg {\n                text-align: center;\n                margin: 10px 10px 15px;\n            }\n\n            .errmsg {\n                text-align: center;\n                color: red;\n            }\n\n            .succmsg {\n                text-align: center;\n                color: green;\n            }\n\n            .col-md-12.col-sm-12.col-xs-12.form-title {\n                border-bottom: 2px solid;\n                margin: 0 10px 15px;\n                font-size: 18px;\n                color: #2a3f54;\n            }\n\n            .top-margin {\n                margin: 10px 0px 15px;\n            }\n\n            .back-cell {\n                background-color: #7CC4F7;\n                padding: 1px;\n            }\n\n            .lay-cell {\n                background-color: #FCA4B7 !important;\n                padding: 1px;\n            }\n\n            .inplay_txt blinking-inplay {\n                color: green;\n            }\n\n            .fancyLia {\n                color: red\n            }\n\n            .mgh10 {\n                margin-top: 10px;\n            }\n\n            .right_col {\n                height: 100% !important;\n            }\n\n            .betSlipBox {}\n\n            .close_new {\n                color: white;\n            }\n\n            #addUserMsg {\n                text-align: center;\n            }\n\n            .errmsg {\n                text-align: center;\n                color: red;\n            }\n\n            .succmsg {\n                text-align: center;\n                color: green;\n            }\n\n            .loderbox {\n                width: 100%;\n                background: #111;\n                /* position: relative; */\n                height: 100%;\n                opacity: 0.7;\n            }\n\n            .overlay_mobile_off {\n                position: fixed;\n                top: 0;\n                right: 0;\n                bottom: 0;\n                left: 0;\n                z-index: 1040;\n                background-color: #000;\n                opacity: .5;\n            }\n\n            .matchScore {\n                width: 30%;\n                display: inline-block;\n            }\n\n            #tital_change {\n                float: left;\n                width: 43%;\n            }\n\n            .up {\n                transform: rotate(-135deg);\n                -webkit-transform: rotate(-135deg);\n            }\n\n            .down {\n                transform: rotate(45deg);\n                -webkit-transform: rotate(45deg);\n            }\n\n            .nav-md .container.body .right_col {\n                min-height: 500px !important;\n            }\n        "
            }}
          />
          {/* page content */}
          <div className="right_col" role="main" style={{ minHeight: 599 }}>
            <div className="loader" style={{ display: "none" }} />
            <div className="col-md-12">
              <div className="title_new_at">
                <span className="lable-user-name" id="header">
                  Announcement
                </span>
                <button
                  id="addAnnouncement"
                  className="red_button"
                  style={{ padding: "4px 5px" }}
                  data-toggle="modal"
                  data-target="#announcement"
                >
                  ADD Announcement
                </button>
                <div className="pull-right">
                  <button type="button" className="btn_common" id="backbutton">
                    Back
                  </button>
                </div>
              </div>
            </div>
            <div />
            <div className="">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div id="divLoading" />
                <div className="" id="restable">
                  <table
                    className="table table-striped jambo_table bulk_action"
                    id="sst"
                  >
                    <thead>
                      <tr className="headings">
                        <th className="darkpurplecolor">S.No.</th>
                        <th className="lightgreencolor">Date</th>
                        <th className="lightgreencolor">Tittle</th>
                        <th className="darkpurplecolor">Details</th>
                        <th className="lightgreencolor">Action</th>
                      </tr>
                    </thead>
                    <tbody id="ssttable">
                      {/* data will be map here */}
                      {data.map((e, index) => {
                        return (
                          <tr key={e.SrNo}>
                            <td>
                              <center>{index + 1}</center>
                            </td>
                            <td>{`${e.NotificationDate.split('-')[2].split('T')[0]}-${month[e.NotificationDate.split('-')[1]]}-${e.NotificationDate.split('-')[0]}`}</td>
                            <td>{e.tittle}</td>
                            <td> {e.detail}</td>
                            <td className=" ">
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                                <a
                                  style={{ display: "inline" }}
                                  className="btn btn-primary btn-xl"
                                  data-toggle="modal"
                                  data-target="#announcementupdate"
                                >
                                  <span onClick={() => { setUpdatePreData(e.SrNo) }} >Update</span>
                                </a>
                                <a>
                                  <span />
                                </a>
                                <a
                                  style={{ display: "inline" }}
                                  className="btn btn-danger btn-xl"
                                >
                                  <span onClick={() => deteleAnnouncement(e.SrNo)} >Delete</span>
                                </a>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                      {/* <tr>
                    <td>
                      <center>1</center>
                    </td>
                    <td>12 April 2023</td>
                    <td>IPL</td>
                    <td>AAP SABKO AANE WALE IPL KI SHUBKAMNAYE</td>
                    <td className=" ">
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                        <a
                          style={{ display: "inline" }}
                          className="btn btn-primary btn-xl"
                          data-toggle="modal"
                          data-target="#announcementupdate"
                        >
                          <span>Update</span>
                        </a>
                        <a>
                          <span />
                        </a>
                        <a
                          style={{ display: "inline" }}
                          className="btn btn-danger btn-xl"
                        >
                          <span>Delete</span>
                        </a>
                      </div>
                    </td>
                  </tr> */}
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
                    Showing 1 to 4 of Entries 4
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
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n            footer {\n                background: none;\n                padding: 15px 20px;\n                display: block;\n            }\n        "
            }}
          />
          <footer>
            <div className="pull-right" />
            <div className="clearfix" />
          </footer>
        </div>
        <Footer />
        <div
          id="announcement"
          className="modal fade"
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
                      <span id="create_title">Add Announcement</span>
                    </h4>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12 col-xs-12" style={{ height: 65 }}>
                        <label> Registration Data </label>
                        <input
                          type="text"
                          name="FromDate"
                          className="form-control"
                          id="reg_date"
                          autoComplete="off"
                          defaultValue=""
                          value={date}
                          readOnly={true}
                        />
                      </div>
                      <div className="col-md-12 col-xs-12" style={{ height: 65 }}>
                        <label> Title</label>
                        <input
                          type="text"
                          name="tittle"
                          value={tittle}
                          className="form-control"
                          maxLength={240}
                          defaultValue=""
                          onChange={handleOnChange}
                          id="txtTitle"
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-md-12 col-xs-12" style={{ height: "auto" }}>
                        <label> Detail</label>
                        <textarea
                          name="detail"
                          className="form-control"
                          id="txtDetail"
                          autoComplete="off"
                          maxLength={240}
                          value={detail}
                          onChange={handleOnChange}
                          defaultValue={""}
                        />
                      </div>
                      <div className="col-md-12 col-xs-12 modal-footer" style={{ display: "flex", gap: "5px", marginTop: "20px" }}>
                        <button
                          data-dismiss="modal"
                          type="button"
                          className="blue_button"
                          id="addUser"
                          onClick={addAnnoucement}
                        // onclick="createChild()"
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
        <div
          id="announcementupdate"
          className="modal fade"
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
                      <span id="create_title">Update Announcement</span>
                    </h4>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12 col-xs-12" style={{ height: 65 }}>
                        <label> Registration Data </label>
                        <input
                          type="text"
                          name="FromDate"
                          className="form-control"
                          id="reg_date"
                          value={updatingDate}
                          autoComplete="off"
                          defaultValue=""
                          readOnly={true}
                        />
                      </div>
                      <div className="col-md-12 col-xs-12" style={{ height: 65 }}>
                        <label> Title</label>
                        <input
                          type="text"
                          name="updatingTittle"
                          value={updatingTittle}
                          maxLength={240}
                          onChange={handleOnChange}
                          className="form-control"
                          defaultValue=""
                          id="txtTitle"
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-md-12 col-xs-12" style={{ height: "auto" }}>
                        <label> Detail</label>
                        <textarea
                          name="updatingDetail"
                          className="form-control"
                          id="txtDetail"
                          autoComplete="off"
                          value={updatingDetail}
                          onChange={handleOnChange}
                          maxLength={240}
                          defaultValue={""}
                        />
                      </div>
                      <div className="col-md-12 col-xs-12 modal-footer" style={{ display: "flex", gap: "5px", marginTop: "20px" }}>
                        <button
                          type="button"
                          className="blue_button"
                          id="addUser"
                          onClick={updateDatafunc}
                          data-dismiss="modal"
                        >
                          Update
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
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        td span {\n            line-height: 28px;\n        }\n\n        /* Chrome, Safari, Edge, Opera */\n        input::-webkit-outer-spin-button,\n        input::-webkit-inner-spin-button {\n            -webkit-appearance: none;\n            margin: 0;\n        }\n\n        /* Firefox */\n        input[type=number] {\n            -moz-appearance: textfield;\n        }\n    "
          }}
        />
        <input type="hidden" id="id" />
        <input type="hidden" id="userid" />
        <input type="hidden" id="usertype" />
        <input type="hidden" id="sstid" />
        <input type="hidden" id="cricketCount" />
        <input type="hidden" id="tennisCount" />
        <input type="hidden" id="soccerCount" />
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
        <a id="mycustomimage" href="#" download="" />

      {/* </div> */}
    </>

  )
}

export default AnnouncementUpdating
