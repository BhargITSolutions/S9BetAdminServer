import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Header from './Header';
import Footer from './Footer';



export const GlobalSetting = () => {


  const [data, setData] = useState([]);   // store the api data 

  const [MatchStack, setMatchStack] = useState(0);
  const [SessionStack, setSessionStack] = useState(0);
  const [dataUpdated, setDataUpdated] = useState(true);

  // odds values
  const [MinOdds, setMinOdds] = useState(0);
  const [MaxOdds, setMaxOdds] = useState(0);
  const [DelayOdds, setDelayOdds] = useState(0);

  // Bookmaker values
  const [MinBookmaker, setMinBookmaker] = useState(0);
  const [MaxBookmaker, setMaxBookmaker] = useState(0);
  const [DelayBookmaker, setDelayBookmaker] = useState(0);

  // Session values
  const [MinSession, setMinSession] = useState(0);
  const [MaxSession, setMaxSession] = useState(0);
  const [DelaySession, setDelaySession] = useState(0);



  // storing the img of site logo
  const [SiteLogoImg, setSiteLogoImg] = useState();

  // storing the img of site icon
  const [SiteIconImg, setSiteIconImg] = useState();



  // setting data from master data

  // all master data
  //const [masterData, setMasterData] = useState([]);

  // whatsapp Link data
  const [WhatsAppLink1, setWhatsAppLink1] = useState("");
  const [WhatsAppLink2, setWhatsAppLink2] = useState("");

  // telegram Link data
  const [TelegramLink1, setTelegramLink1] = useState("");
  const [TelegramLink2, setTelegramLink2] = useState("");


  // other setting data
  const [startTime, setStartTime] = useState(0);
  const [noticeMessage, setNoticeMessage] = useState("");



  const fetchMasterData = async () => {
    let res = await fetch("http://localhost:5000/api/getMasterData");
    let resData = await res.json();
    console.log(resData);

    // setting data
    setWhatsAppLink1(resData[0].Whatsapp1Link);
    setWhatsAppLink2(resData[0].Whatsapp2Link);
    setTelegramLink1(resData[0].Telegram1Link);
    setTelegramLink2(resData[0].Telegram2Link);
    setStartTime(resData[0].BetStartTime);
    setNoticeMessage(resData[0].SiteMessage);
  }




  // fetching the api and getting the data
  const fetchData = async () => {
    let res = await fetch("http://localhost:5000/api/getSingleDataSports");
    let resData = await res.json();
    console.log(resData);
    setData(resData);  // stored the api data


    let matchStack = resData[0].MaxStackLimit;
    // console.log(matchStack);
    setMatchStack(matchStack);  // matchStack data

    let sessionStack = resData[0].SessionMaxStackLimit;
    //  console.log(sessionStack);
    setSessionStack(sessionStack);   // sessionStack data


    // setting data of limit and delay

    // Odds data setting
    let minOdd = resData[0].MinOddLimit;
    setMinOdds(minOdd);

    let maxOdd = resData[0].MaxOddLimit;
    setMaxOdds(maxOdd);

    let delayOdd = resData[0].BetDelayTime;
    setDelayOdds(delayOdd);


    // BookMaker data setting
    let minBookMaker = resData[0].MinBookmakerLimit;
    setMinBookmaker(minBookMaker);

    let maxBookMaker = resData[0].MaxBookmakerLimit;
    setMaxBookmaker(maxBookMaker);

    let delayBookMaker = resData[0].BookmakerDelayTime;
    setDelayBookmaker(delayBookMaker);


    // Session data setting
    let minSession = resData[0].MinFancyLimit;
    setMinSession(minSession);

    let maxSession = resData[0].MaxFancyLimit;
    setMaxSession(maxSession);

    let delaySession = resData[0].FancyDelayTime;
    setDelaySession(delaySession);

  }







  const handleOnChange = (e) => {
    let inputValue = e.target.value;
    let dataName = e.target.name;

    // console.log(dataName);
    // setMatchStack(e.target.value);



    if (dataName == "matchStack") {
      setMatchStack(inputValue);
      // return;
    }

    if (dataName == "sessionStack") {
      setSessionStack(inputValue);
      // return;
    }


    // UPDATING DATA OF ODDS
    if (dataName == "minOdd") {
      setMinOdds(inputValue)
    }


    if (dataName == "maxOdd") {
      setMaxOdds(inputValue)
    }


    if (dataName == "delayOdd") {
      setDelayOdds(inputValue)
    }


    // UPDATING DATA OF BOOKMAKER
    if (dataName == "minBookMaker") {
      setMinBookmaker(inputValue)
    }


    if (dataName == "maxBookMaker") {
      setMaxBookmaker(inputValue)
    }


    if (dataName == "delayBookMaker") {
      setDelayBookmaker(inputValue)
    }


    // UPDATING DATA OF SESSION
    if (dataName == "minSession") {
      setMinSession(inputValue)
    }


    if (dataName == "maxSession") {
      setMaxSession(inputValue)
    }


    if (dataName == "delaySession") {
      setDelaySession(inputValue)
    }


    // whatsapp links
    if (dataName == "WhatsAppLink1") {
      setWhatsAppLink1(inputValue)
    }

    if (dataName == "WhatsAppLink2") {
      setWhatsAppLink2(inputValue)
    }


    // telegram links
    if (dataName == "TelegramLink1") {
      setTelegramLink1(inputValue)
    }

    if (dataName == "TelegramLink2") {
      setTelegramLink2(inputValue)
    }


    // other settings
    if (dataName == "startTime") {
      setStartTime(inputValue)
    }

    if (dataName == "noticeMessage") {
      setNoticeMessage(inputValue)
    }




  }

  // for testing purpose - // console.log(`value of matchStack = ${MatchStack} and value of sessionStack = ${SessionStack}`);


  // checking if input value is not negative
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
    } else {



    }
  }



  // function to checking the size of the img file
  // const CheckingSiteLogoSize = (file)=>{
  //   const maxSize = 8000; // 1MB in bytes
  //   console.log(maxSize);
  //   console.log(file.size);
  //   if (Number(file.size) > maxSize) {
  //     return false;
  //   }
  // }


  // handling changes in logo file
  const handleLogoFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // console.log(selectedFile.size);

    if (selectedFile.size > 300 * 110) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "File size is large, select img smaller than 155*37",
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    setSiteLogoImg(selectedFile);

  }

  // handling changes in fav icon
  const handleFavIconFileChange = (e) => {


    const selectedFile = e.target.files[0];

    if (selectedFile.size > 100 * 100) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "File size is large, select img smaller than 155*37",
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    setSiteIconImg(selectedFile);

  }




  // function to upload the logo to backend
  const SavingSiteLogo = async () => {

    if (SiteLogoImg) {
      const formData = new FormData();
      formData.append('image', SiteLogoImg);

      try {
        const response = await fetch('http://localhost:5000/api/uploadSiteLogo', {
          method: 'POST',
          body: formData,
        });

        console.log(response);

      } catch (error) {
        console.error('Error during file upload:', error);
      }
    } else {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "No file is selected!",
        showConfirmButton: false,
        timer: 1500
      });
      console.warn('No file selected.');
    }
  }




  // function to upload the favIcon to backend
  const SavingSiteFavIcon = async () => {    // /api/uploadSiteFavIcon
    if (SiteIconImg) {
      const formData = new FormData();
      formData.append('image', SiteIconImg);

      try {
        const response = await fetch('http://localhost:5000/api/uploadSiteFavIcon', {
          method: 'POST',
          body: formData,
        });

        console.log(response);

      } catch (error) {
        console.error('Error during file upload:', error);
      }
    } else {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "No file is selected!",
        showConfirmButton: false,
        timer: 1500
      });
      console.warn('No file selected.');
    }
  }





  const updateStackData = async () => {

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    }).then(async () => {

      try {

        let res = await fetch(`http://localhost:5000/api/updateStacks/${MatchStack}/${SessionStack}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Additional headers if needed
          }
        });
      }
      catch (error) {
        console.log("error in connecting the api");
      }

      setDataUpdated((prev) => !prev);

    })
  }


  // updating limit and delay settings
  const updateLimitDelaySetting = async () => {

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    }).then(async () => {

      try {

        let res = await fetch(`http://localhost:5000/api/updateLimitAndDelay/${MinOdds}/${MaxOdds}/${DelayOdds}/${MinBookmaker}/${MaxBookmaker}/${DelayBookmaker}/${MinSession}/${MaxSession}/${DelaySession}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Additional headers if needed
          }
        });
      }
      catch (error) {
        console.log("error in connecting the api");
      }

      setDataUpdated((prev) => !prev);

    })

  }


  // updating contact details 
  const UpdatingContactDetail = async () => {


    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    }).then(async () => {

      try {

        let res = await fetch(`http://localhost:5000/api/updateContactDetail/${WhatsAppLink1}/${WhatsAppLink2}/${TelegramLink1}/${TelegramLink2}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Additional headers if needed
          }
        });
      }
      catch (error) {
        console.log("error in connecting the api");
      }

      setDataUpdated((prev) => !prev);
    })
  }

  // updating contact details 
  const UpdatingOtherSetting = async () => {


    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    }).then(async () => {

      try {

        let res = await fetch(`http://localhost:5000/api/updateOtherSetting/${startTime}/${noticeMessage}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Additional headers if needed
          }
        });
      }
      catch (error) {
        console.log("error in connecting the api");
      }

      setDataUpdated((prev) => !prev);
    })
  }




  useEffect(() => {
    fetchData();
    fetchMasterData();
  }, [dataUpdated])



  return (
    <>

      <div className="nav-md">
        <div className="container body">

          <Header />
          {/* page content */}
          <div className="right_col" role="main" style={{ minHeight: 278 }}>
            <div className="loader" style={{ display: "none" }} />
            <div className="col-md-12">
              <div className="title_new_at">
                Global Setting
                <div className="pull-right">
                  <button className="btn_common">Back</button>{" "}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="filter_page  data-background">
                {/*  <form method="post" id="formSubmit" style="color:#000;"><input type="hidden" name="compute" value=""> */}
                {/* </form> */}
              </div>
            </div>
            <div className="">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div id="divLoading" />
                <div className="" id="restable">
                  <table
                    className="table table-striped jambo_table bulk_action"
                    style={{ minWidth: 575 }}
                    id="usr"
                  >
                    {/* <table class="table table-striped jambo_table bulk_action" style="min-width:575px" id="usr"> */}
                    <thead>
                      <tr className="headings">
                        <th
                          className="darkpurplecolor"
                          style={{ fontSize: 14, fontWeight: 700 }}
                          colSpan={3}
                        >
                          <b />
                          <center>
                            <b>Commission</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                      </tr>
                    </thead>
                    <tbody id="usetable">
                      <tr>
                        <td>Commission</td>
                        <td>
                          <input
                            type="match"
                            name="matchname"
                            id="matchname"
                            className="form-control"
                            placeholder="Commission"
                            autoComplete="off"
                          />
                        </td>
                        <td rowSpan={3} style={{ verticalAlign: "middle" }}>
                          <button
                            style={{ fontSize: 14 }}
                            type="button"
                            className="btn btn-success btn-xs"
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>{" "}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="filter_page  data-background">
                {/*  <form method="post" id="formSubmit" style="color:#000;"><input type="hidden" name="compute" value=""> */}
                {/* </form> */}
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
                        <th
                          className="lightgreencolor"
                          style={{ fontSize: 14, fontWeight: 700 }}
                          colSpan={3}
                        >
                          <b />
                          <center>
                            <b>Stack Button</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                      </tr>
                    </thead>
                    <tbody id="usetable">
                      <tr>
                        <td>Match Stack</td>
                        <td>
                          <input
                            type="number"
                            name="matchStack"
                            //   dataName="matchStack"
                            id="matchname"
                            value={MatchStack}
                            onChange={handleOnChange}
                            onKeyDown={disableKey}
                            min={0}
                            className="form-control"
                            placeholder="Match Stack"
                            autoComplete="off"
                          />
                        </td>
                        <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                          <button
                            style={{ fontSize: 14 }}
                            type="button"
                            onClick={updateStackData}
                            className="btn btn-success btn-xs"
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Session Stack</td>
                        <td>
                          <input
                            type="number"
                            name="sessionStack"
                            id="matchname"
                            min={0}
                            onKeyDown={disableKey}
                            value={SessionStack}
                            onChange={handleOnChange}
                            className="form-control"
                            placeholder="Session Stack"
                            autoComplete="off"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="filter_page  data-background">
                {/*  <form method="post" id="formSubmit" style="color:#000;"><input type="hidden" name="compute" value=""> */}
                {/* </form> */}
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
                        <th
                          className="darkpurplecolor"
                          style={{ fontSize: 14, fontWeight: 700 }}
                          colSpan={5}
                        >
                          <b />
                          <center>
                            <b>Limit &amp; Delay Setting</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                      </tr>
                      <tr className="headings">
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b> </b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b>Min</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b>Max</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b>Delay</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b />
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
                            name="minOdd"
                            id="matchname"
                            min={0}
                            value={MinOdds}
                            onChange={handleOnChange}
                            onKeyDown={disableKey}
                            className="form-control"
                            placeholder="Min"
                            autoComplete="off"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="maxOdd"
                            id="matchname"
                            min={0}
                            value={MaxOdds}
                            onChange={handleOnChange}
                            onKeyDown={disableKey}
                            className="form-control"
                            placeholder="Max"
                            autoComplete="off"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="delayOdd"
                            id="matchname"
                            min={0}
                            value={DelayOdds}
                            onChange={handleOnChange}
                            onKeyDown={disableKey}
                            className="form-control"
                            placeholder="Delay"
                            autoComplete="off"
                          />
                        </td>
                        <td rowSpan={3} style={{ verticalAlign: "middle" }}>
                          <button
                            style={{ fontSize: 14 }}
                            type="button"
                            onClick={updateLimitDelaySetting}
                            className="btn btn-success btn-xs"
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Bookmaker</td>
                        <td>
                          <input
                            type="number"
                            name="minBookMaker"
                            id="matchname"
                            min={0}
                            value={MinBookmaker}
                            onChange={handleOnChange}
                            onKeyDown={disableKey}
                            className="form-control"
                            placeholder="Min"
                            autoComplete="off"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="maxBookMaker"
                            id="matchname"
                            min={0}
                            value={MaxBookmaker}
                            onChange={handleOnChange}
                            onKeyDown={disableKey}
                            className="form-control"
                            placeholder="Max"
                            autoComplete="off"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="delayBookMaker"
                            id="matchname"
                            min={0}
                            value={DelayBookmaker}
                            onChange={handleOnChange}
                            onKeyDown={disableKey}
                            className="form-control"
                            placeholder="Delay"
                            autoComplete="off"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Session</td>
                        <td>
                          <input
                            type="number"
                            name="minSession"
                            id="matchname"
                            min={0}
                            value={MinSession}
                            onChange={handleOnChange}
                            onKeyDown={disableKey}
                            className="form-control"
                            placeholder="Min"
                            autoComplete="off"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="maxSession"
                            id="matchname"
                            min={0}

                            value={MaxSession}
                            onChange={handleOnChange}
                            onKeyDown={disableKey}
                            className="form-control"
                            placeholder="Max"
                            autoComplete="off"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="delaySession"
                            id="matchname"
                            min={0}
                            value={DelaySession}
                            onChange={handleOnChange}
                            onKeyDown={disableKey}
                            className="form-control"
                            placeholder="Delay"
                            autoComplete="off"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>{" "}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="filter_page  data-background">
                {/*  <form method="post" id="formSubmit" style="color:#000;"><input type="hidden" name="compute" value=""> */}
                {/* </form> */}
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
                        <th
                          className="lightgreencolor"
                          style={{ fontSize: 14, fontWeight: 700 }}
                          colSpan={3}
                        >
                          <b />
                          <center>
                            <b>Site logo</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                      </tr>
                      <tr className="headings">
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b> Site logo</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b>Ex:(155*57, PNG)</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }} />
                      </tr>
                    </thead>
                    <tbody id="usetable">
                      <tr>
                        <td>
                          <input type="file" id="SiteLogo" accept='.png' onChange={handleLogoFileChange} className="form-control" />
                        </td>
                        <td>
                          <img
                            src="images/logo.png"
                            alt="wbt"
                            width={75}
                            height={27}
                          />
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          <button
                            style={{ fontSize: 14, width: 75 }}
                            type="button"
                            onClick={SavingSiteLogo}
                            className="btn btn-success btn-xs"
                          >
                            Upload
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="filter_page  data-background">
                {/*  <form method="post" id="formSubmit" style="color:#000;"><input type="hidden" name="compute" value=""> */}
                {/* </form> */}
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
                        <th
                          className="darkpurplecolor"
                          style={{ fontSize: 14, fontWeight: 700 }}
                          colSpan={3}
                        >
                          <b />
                          <center>
                            <b>Fav Icon</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                      </tr>
                      <tr className="headings">
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b> Fav Icon</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b>Ex:(32*32, ICO)</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }} />
                      </tr>
                    </thead>
                    <tbody id="usetable">
                      <tr>
                        <td>
                          <input type="file" id="SiteLogo" accept='.png' onChange={handleFavIconFileChange} className="form-control" />
                        </td>
                        <td>
                          <img
                            src="images/fav_icon.png"
                            alt="wbt"
                            width={50}
                            height={50}
                          />
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          <button
                            style={{ fontSize: 14, width: 75 }}
                            type="button"
                            onClick={SavingSiteFavIcon}
                            className="btn btn-success btn-xs"
                          >
                            Upload
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="filter_page  data-background">
                {/*  <form method="post" id="formSubmit" style="color:#000;"><input type="hidden" name="compute" value=""> */}
                {/* </form> */}
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
                        <th
                          className="lightgreencolor"
                          style={{ fontSize: 14, fontWeight: 700 }}
                          colSpan={4}
                        >
                          <b />
                          <center>
                            <b>Contact Details</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                      </tr>
                      <tr className="headings">
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b />
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b>Link 1</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b>Link 2</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                        <th className="" style={{ fontSize: 14, fontWeight: 700 }}>
                          <b />
                          <center>
                            <b />
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                      </tr>
                    </thead>
                    <tbody id="usetable">
                      <tr>
                        <td>WhatsApp</td>
                        <td>
                          <input
                            type="match"
                            name="WhatsAppLink1"
                            id="matchname"
                            value={WhatsAppLink1}
                            onChange={handleOnChange}
                            className="form-control"
                            placeholder="WhatsApp Link 1"
                            autoComplete="off"
                          />
                        </td>
                        <td>
                          <input
                            type="match"
                            name="WhatsAppLink2"
                            id="matchname"
                            value={WhatsAppLink2}
                            onChange={handleOnChange}
                            className="form-control"
                            placeholder="WhatsApp Link 2"
                            autoComplete="off"
                          />
                        </td>
                        <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                          <button
                            style={{ fontSize: 14, width: 75 }}
                            type="button"
                            onClick={UpdatingContactDetail}
                            className="btn btn-success btn-xs"
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Telegram</td>
                        <td>
                          <input
                            type="match"
                            name="TelegramLink1"
                            id="matchname"
                            value={TelegramLink1}
                            onChange={handleOnChange}
                            className="form-control"
                            placeholder="Telegram Link 1"
                            autoComplete="off"
                          />
                        </td>
                        <td>
                          <input
                            type="match"
                            name="TelegramLink2"
                            id="matchname"
                            value={TelegramLink2}
                            onChange={handleOnChange}
                            className="form-control"
                            placeholder="Telegram Link 2"
                            autoComplete="off"
                          />
                        </td>
                        {/* <td><button style="font-size: 14px" type="button" class="btn btn-success btn-xs">Save</button></td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="filter_page  data-background">
                {/*  <form method="post" id="formSubmit" style="color:#000;"><input type="hidden" name="compute" value=""> */}
                {/* </form> */}
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
                        <th
                          className="darkpurplecolor"
                          style={{ fontSize: 14, fontWeight: 700 }}
                          colSpan={3}
                        >
                          <b />
                          <center>
                            <b>Other Setting</b>
                            <center>
                              <b />
                            </center>
                          </center>
                        </th>
                      </tr>
                    </thead>
                    <tbody id="usetable">
                      <tr>
                        <td>Bet Start Time (In Minutes)</td>
                        <td>
                          <input
                            type="number"
                            name="startTime"
                            id="matchname"
                            value={startTime}
                            min={0}
                            onChange={handleOnChange}
                            onKeyDown={disableKey}
                            className="form-control"
                            placeholder="In Minutes"
                            autoComplete="off"
                          />
                        </td>
                        <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                          <button
                            style={{ fontSize: 14, width: 75 }}
                            type="button"
                            onClick={UpdatingOtherSetting}
                            className="btn btn-success btn-xs"
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Slider Notice Massage</td>
                        <td>
                          <textarea
                            type="match"
                            name="noticeMessage"
                            id="matchname"
                            value={noticeMessage}
                            onChange={handleOnChange}
                            className="form-control"
                            placeholder="Type your Notice Massage..."
                            autoComplete="off"
                            defaultValue={""}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
      </div>
    </>


  )
}
