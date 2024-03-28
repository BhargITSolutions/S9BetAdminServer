import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Header() {


  const navigate = useNavigate();

  const roleId = Cookies.get('roleId')
  const userName = Cookies.get('userName')
  const fullName = Cookies.get('fullName')
  const userId = Cookies.get('id')
  console.log(" role id : " + roleId)
  console.log('logged in user id is : ', userId)


  const [siteNotice, setSiteNotice] = useState('')
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [balance, setBalance] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isUserSubMenuOpen, setIsUserSubMenuOpen] = useState(false);
  const [isReportSubMenuOpen, SetIsReportSubMenuOpen] = useState(false);
  const [isLiveCasinoSubMenuOpen, setLiveCasinoSubMenuOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);



  // const [mobile]

  useEffect(() => {
    // Add or remove class to body based on isBodyClassAdded state
    console.log("useEffect worked !");
    if (mobileMenu) {
      document.body.classList.add('nav-sm');
      document.body.classList.remove('nav-md');
    } else {
      document.body.classList.add('nav-md');
      document.body.classList.remove('nav-sm');
    }
    // Clean up function to remove the class on component unmount
    // return () => {
    //   document.body.classList.remove('my-body-class');
    // };

  }, [mobileMenu]);


  useEffect(() => {
    fetchMyBalanceApi();
    headerNoticeData()
  }, [])

  const headerNoticeData = async () =>{
    const api = await fetch(`https://api.s2bet.in/api/getMasterData`)
    const apiData = await api.json();
    console.log("Header data is : ", apiData[0])
    setSiteNotice(apiData[0].SiteMessage)
  }




  const fetchMyBalanceApi = async () => {
    try {
      const fetched = await fetch(`https://api.s2bet.in/myBalance/${userId}`);
      const response = await fetched.json();
      console.log("Get myBalance Api  in header: " + JSON.stringify(response.mainBalance[0].ResultAmountP));


      setBalance(response.mainBalance[0].ResultAmountP)

    } catch (error) {
      console.error("Error fetching Balance in header api " + error);
    }
  };


  const changePassWord = async () => {
    try {
      // Validate that new password and retype password match
      if (newPassword !== retypePassword) {
        setPasswordError('New Passwords does not match.');
        return;
      }
      console.log("Old Password : " + oldPassword)
      console.log("New Password : " + newPassword)
      console.log("Confirm Password : " + retypePassword)


      const response = await fetch('https://api.s2bet.in/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserId: parseInt(userId),
          OldPassword: oldPassword,
          NewPassword: newPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Password changed successfully
        // You may want to redirect the user or show a success message
        console.log('Password changed successfully');
      } else {
        setPasswordError(result.message);
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };


  const handleLogout = async () => {
    try {

      const response = await fetch('https://api.s2bet.in/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserId: parseInt(userId)
        }),
      });

      const result = await response.json();

      console.log("Result is : " + JSON.stringify(result.message))

      if (result.message == "Logged Out ") {
        // Password changed successfully
        // You may want to redirect the user or show a success message
        Cookies.remove('roleId')
        Cookies.remove('userName')
        Cookies.remove('fullName')
        Cookies.remove('id')
        window.location.reload();
        navigate('/')
        console.log('Logged Out');
      } else {
        setPasswordError(result.message);
      }


    } catch (error) {
      console.error('Error changing password:', error);
    }
  }


  return (
    <>

      <div className="main_container" id="sticky">
        <div className="col-md-3 left_col">
          <div className="left_col scroll-view">
            <div
              className="navbar nav_title"
              style={{ border: 0, textAlign: "left" }}
            >
              <a href="/dashboard" className="site_title">
                <img src="https://ag.s2bet.in/images/logo.png" alt="wbt" />
              </a>
            </div>
            <div className="clearfix" />
            {/* menu profile quick info */}
            {/* /menu profile quick info */}
            {/* sidebar menu */}
            <div
              id="sidebar-menu"
              className="hidden-lg hidden-md hidden-sm main_menu_side hidden-print main_menu"
            >
              <div className="menu_section">
                <ul className="nav side-menu">
                  <li>
                    <a href="/dashboard">
                      <i style={{}} className="fa fa-home" aria-hidden="true" />{" "}
                      In-Play{" "}
                    </a>
                  </li>
                  <li>
                    <a onClick={() => { setIsUserSubMenuOpen(prev => !prev) }}>
                      <i className="far fa-address-card" aria-hidden="true" />{" "}
                      User{" "}
                      <span className="fa fa-chevron-down" aria-hidden="true" />
                    </a>
                    <ul className="nav child_menu" style={isUserSubMenuOpen ? { display: "block" } : { display: "none" }}>
                      {/* <li style=" "><a href="/createUser/2/651e643a4c0613bef5e7b045"><i class="fa fa-plus-square" style="width: auto !important;font-size: 15px !important;"></i> Add New </a></li> */}
                      <li id="hlistm" style={{ display: roleId <= "1" ? "block" : "none" }}>
                        <a href='/adminList/2/0'>

                          Tech Admin{" "}
                        </a>
                      </li>
                      <li id="smlistm" style={{ display: roleId <= "2" ? "block" : "none" }}>
                        <a href="/adminList/3/0"> Super Admin</a>
                      </li>
                      <li id="mlistm" style={{ display: roleId <= "3" ? "block" : "none" }}>
                        <a href="/adminList/4/0"> Sub Admin</a>
                      </li>
                      <li id="mlistm" style={{ display: roleId <= "4" ? "block" : "none" }}>
                        <a href="/adminList/5/0"> Super Super</a>
                      </li>
                      <li id="mlistm" style={{ display: roleId <= "5" ? "block" : "none" }}>
                        <a href="/adminList/6/0"> Super</a>
                      </li>
                      <li id="mlistm" style={{ display: roleId <= "6" ? "block" : "none" }}>
                        <a href="/adminList/7/0"> Master</a>
                      </li>
                      <li id="mlistm" style={{ display: roleId <= "7" ? "block" : "none" }}>
                        <a href="/adminList/8/0"> User</a>
                      </li>
                    </ul>
                  </li>
                  {/* <li id="blockMarketM" style={{ display: "none" }}>
                    <a href="/blockMarket">
                      <i
                        className="fas fa-exclamation-triangle"
                        aria-hidden="true"
                      />{" "}
                      Block Market{" "}
                    </a>
                  </li> */}
                  <li>
                    <a href="/netExposure">
                      <i
                        style={{}}
                        className="fas fa-chart-pie"
                        aria-hidden="true"
                      />{" "}
                      My Market{" "}
                    </a>
                  </li>
                  <li className="has-sub">
                    <a onClick={() => { SetIsReportSubMenuOpen(prev => !prev) }} >
                      <i
                        className="fas fa-cloud-download-alt"
                        aria-hidden="true"
                      />{" "}
                      Report{" "}
                    </a>
                    <ul className="nav child_menu" style={isReportSubMenuOpen ? { display: "block" } : { display: "none" }}>
                      <li>
                        <a href="/accountInfo">Account Info </a>
                      </li>
                      <li>
                        <a href="/statementByUser">Account Statement </a>
                      </li>
                      <li>
                        <a href="/chipSummary">Chip Summary </a>
                      </li>
                      {/* <li>
                        <a href="/clientpl/dkdk90/10/1/0/0">Client P L</a>
                      </li>
                      <li>
                        <a href="/marketpl/25/1/0/0">Market P L</a>
                      </li>
                      <li>
                        <a href="/sportpl/10/1/0/0/dkdk90">Sport P L</a>
                      </li>
                      <li>
                        <a href="/userpl/10/1/0/0/Cricket/Top">User P L</a>
                      </li>
                      <li>
                        <a href="/matchProfitLoss/dkdk90/10/1/0/0/Cricket">
                          Match Profit Loss
                        </a>
                      </li>
                      <li>
                        <a href="/casinoProfitLoss/dkdk90/10/1/0/0">
                          Casino Profit Loss
                        </a>
                      </li> */}
                      <li>
                        <a href="/downlineProfitLoss">
                          Profit &amp; Loss
                        </a>
                      </li>
                      <li>
                        <a href="/betHistory">
                          Bet History
                        </a>
                      </li>
                      {/* <li><a href="/livegamebetHistory">Live Bet History</a></li> */}
                      {/* <li>
                        <a href="/fancystack/dkdk90/1/0/0">Fancy Stack</a>
                      </li>
                      <li>
                        <a href="/matchStake/dkdk90/1/0/0">Match Sale</a>
                      </li> */}
                    </ul>
                  </li>
                  <li className="has-sub" style={{ display: roleId <= "2" ? "block" : "none" }}>
                    <span className="submenu-button" />
                    <span className="submenu-button" />
                    <a onClick={() => { setIsSettingOpen(prev => !prev) }}>
                      <i className="fas fa-cog" aria-hidden="true" /> Setting
                    </a>
                    <ul className="nav child_menu" style={isSettingOpen ? { display: "block" } : { display: "none" }}>
                      <li>
                        <a href="/matchSetting">
                          <i aria-hidden="true" /> Match Setting
                        </a>
                      </li>
                      <li>
                        <a href="/sportSetting">
                          <i aria-hidden="true" /> Sports Setting
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i aria-hidden="true" /> Online User
                        </a>
                      </li>
                      <li>
                        <a href="/deleteBetHistory">
                          <i aria-hidden="true" /> Delete Bet History
                        </a>
                      </li>
                      <li>
                        <a href="/globalSetting">
                          <i aria-hidden="true" /> Global Settings
                        </a>
                      </li>
                      <li>
                        <a href="/announcementUpdate">
                          <i aria-hidden="true" /> Add Announcement
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            {/* /sidebar menu */}
          </div>
        </div>
        {/* top navigation */}
        <div className="top_nav">
          <div className="nav_menu" style={{ background: "#fff" }}>
            <nav className="" role="navigation">
              <div
                className="nav toggle hidden-lg hidden-sm hidden-md"
                style={{ width: 175 }}
              >
                <a id="menu_toggle">
                  <i
                    className="fa fa-bars"
                    style={{ color: "#000" }}
                    aria-hidden="true"
                    onClick={() => { setMobileMenu(prev => !prev) }}
                  />
                </a>
              </div>
              <div className="marquee">
                <a href="/announcement">
                  <marquee id="marqmessage" scrollamount={2}>
                   {siteNotice}{" "}
                  </marquee>
                </a>
              </div>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a
                    href="/dashboard"
                    className=" "
                    style={{ color: "#000" }}
                  >
                    <span className="fa fa-home" aria-hidden="true" /> Home{" "}
                  </a>
                </li>
                <li>
                  <a id="Wallet" style={{ color: "green !important" }}>
                    BAL : {balance}
                  </a>
                </li>
                <li>
                  <a id="UserLiability" style={{ color: "red !important" }}>
                    L : 0.00
                  </a>
                </li>
                <li className="">
                  <a
                    href="#"
                    className="user-profile dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {" "}
                    {fullName} {userName}{" "}
                    <span className=" fa fa-angle-down" aria-hidden="true" />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-usermenu pull-right"
                    style={{ background: "#fff" }}
                  >
                    {/*  <li><a href="#"><i class="fa fa-gear pull-right"></i> Account Info </a></li> */}
                    <li style={{ width: "100%" }}>
                      <a
                        style={{ color: "#000" }}
                        href="/statementByUser"
                      >
                        <i className="far fa-address-card" aria-hidden="true" />{" "}
                        Account Statement{" "}
                      </a>
                    </li>
                    {/*  <li><a href="#"><i class="fa fa-gear pull-right"></i> Chip Summary </a></li><li><a href="#"><i class="fa fa-gear pull-right"></i> Chip History </a></li><li><a href="#"><i class="fa fa-gear pull-right"></i> Profit & Loss</a></li><li><a href="#"><i class="fa fa-gear pull-right"></i> Client Profit & Loss</a></li><li><a href="#"><i class="fa fa-gear pull-right"></i> Bet History</a></li> */}
                    <li data-toggle="modal" data-target="#cngpwdOwn">
                      <a style={{ color: "#000" }}>
                        <i className="fa fa-lock" aria-hidden="true" /> Change
                        Password{" "}
                      </a>
                    </li>
                    <li onClick={handleLogout}>
                      <a style={{ color: "#000" }}>
                        <i className="fas fa-sign-out-alt" aria-hidden="true" />{" "}
                        Log Out{" "}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <nav id="cssmenu" className="hidden-xs" style={{ marginBotttom: 10 }}>
          {/*<div class="button"></div>*/}
          <ul className="nav">
            <li>
              <a className="" href="/dashboard">
                <i className="fa fa-home hidden-xs" aria-hidden="true" /> In-Play{" "}
              </a>
            </li>
            <li className="has-sub">
              <span className="submenu-button" />
              <span className="submenu-button" />
              <a>
                <i className="far fa-address-card" aria-hidden="true" /> User{" "}
              </a>
              <ul>
                <li id="hlist" style={{ display: roleId <= "1" ? "block" : "none" }}>
                  <a href='/adminList/2/0'> Tech Admin</a>
                </li>
                <li id="smlist" style={{ display: roleId <= "2" ? "block" : "none" }}>
                  <a href="/adminList/3/0"> Super Admin</a>
                </li>
                <li id="mlist" style={{ display: roleId <= "3" ? "block" : "none" }}>
                  <a href="/adminList/4/0"> Sub Admin</a>
                </li>
                <li id="mlist" style={{ display: roleId <= "4" ? "block" : "none" }}>
                  <a href="/adminList/5/0"> Super Super</a>
                </li>
                <li id="mlist" style={{ display: roleId <= "5" ? "block" : "none" }}>
                  <a href="/adminList/6/0"> Super</a>
                </li>
                <li id="mlist" style={{ display: roleId <= "6" ? "block" : "none" }}>
                  <a href="/adminList/7/0"> Master</a>
                </li>
                <li id="mlist" style={{ display: roleId <= "7" ? "block" : "none" }}>
                  <a href="/adminList/8/0"> User</a>
                </li>
                {/* <li id="mlist" style={{ display: roleId <= "6" ? "block" : "none" }}>
                  <a href="#"> Partnership</a>
                </li>
                <li id="mlist" style={{ display: roleId <= "6" ? "block" : "none" }}>
                  <a href="#"> Partnership Live TeenPatti</a>
                </li>
                <li id="mlist" style={{ display: roleId <= "6" ? "block" : "none" }}>
                  <a href="#"> Partnership Casino</a>
                </li> */}
                <li id="mlist" style={{ display: "block" }}>
                  <a href="/closeUser/8/0"> Close User</a>
                </li>
              </ul>
            </li>
            {/* <li id="blockMarketH">
              <a href="/blockMarket">
                <i className="fas fa-exclamation-triangle" aria-hidden="true" />{" "}
                Block Market{" "}
              </a>
            </li> */}
            <li>
              <a href="/netExposure">
                <i className="fas fa-chart-pie" aria-hidden="true" /> My Market{" "}
              </a>
            </li>
            <li className="has-sub">
              <span className="submenu-button" />
              <span className="submenu-button" />
              <a >
                <i className="fas fa-cloud-download-alt" aria-hidden="true" />{" "}
                Report{" "}
              </a>
              <ul>
                <li>
                  <a href="/accountInfo">Account Info </a>
                </li>
                <li>
                  <a href="/statementByUser">Account Statement </a>
                </li>
                <li>
                  <a href="/chipSummary">Chip Summary </a>
                </li>
                {/* <li>
                  <a href="/clientpl/dkdk90/10/1/0/0">Client P L</a>
                </li>
                <li>
                  <a href="/marketpl/25/1/0/0">Market P L</a>
                </li>
                <li>
                  <a href="/sportpl/10/1/0/0/dkdk90">Sport P L</a>
                </li>
                <li>
                  <a href="/userpl/10/1/0/0/Cricket/Top">User P L</a>
                </li>
                <li>
                  <a href="/matchProfitLoss/dkdk90/10/1/0/0/Cricket">
                    Match Profit Loss
                  </a>
                </li>
                <li>
                  <a href="/casinoProfitLoss/dkdk90/10/1/0/0">
                    Casino Profit Loss
                  </a>
                </li>
                <li>
                  <a href="/internationalProfitLoss/dkdk90/10/1/0/0">
                    International Profit Loss
                  </a>
                </li> */}
                <li>
                  <a href="/downlineProfitLoss">
                    Profit &amp; Loss
                  </a>
                </li>
                <li>
                  <a href="/betHistory">Bet History</a>
                </li>
                {/* <li><a href="/livegamebetHistory">Live Bet History</a></li> */}
                {/* <li>
                  <a href="/fancystack/dkdk90/1/0/0">Fancy Stack</a>
                </li>
                <li>
                  <a href="/matchStake/dkdk90/1/0/0">Match Sale</a>
                </li> */}
              </ul>
            </li>
            <li>
              <a >
                <i style={{}} className="fas fa-envelope" aria-hidden="true" />{" "}
                Partnership Message{" "}
              </a>
            </li>
            <li>
              <a >
                <i style={{}} className="fa fa-search" aria-hidden="true" />{" "}
                Search Result{" "}
              </a>
            </li>
            <li className="has-sub" style={{ display: roleId <= "2" ? "block" : "none" }}>
              <span className="submenu-button" />
              <span className="submenu-button" />
              <a>
                <i className="fas fa-cloud-download-alt" aria-hidden="true" /> Setting
              </a>
              <ul>
                {/* <li id="blockMarketH">
                  <a href="/Setting/MarketSetting">
                    <i aria-hidden="true" /> Market Setting
                  </a>
                </li> */}
                <li id="blockMarketH">
                  <a href="/matchSetting">
                    <i aria-hidden="true" /> Match Setting
                  </a>
                </li>
                {/* <li id="blockMarketH">
                  <a href="/Setting/MarketRollback">
                    <i aria-hidden="true" /> Market Rollback
                  </a>
                </li> */}
                <li id="blockMarketH">
                  <a href="/sportSetting">
                    <i aria-hidden="true" /> Sports Setting
                  </a>
                </li>
                {/* <li id="blockMarketH">
                  <a href="/Setting/SeriesSetting">
                    <i aria-hidden="true" /> Series Setting
                  </a>
                </li> */}
                <li id="blockMarketH">
                  <a href="#">
                    <i aria-hidden="true" /> Online User
                  </a>
                </li>
                <li id="blockMarketH">
                  <a href="/deleteBetHistory">
                    <i aria-hidden="true" /> Delete Bet History
                  </a>
                </li>
                <li id="blockMarketH">
                  <a href="/globalSetting">
                    <i aria-hidden="true" /> Global Settings
                  </a>
                </li>
                <li id="blockMarketH">
                  <a href="/announcementUpdate">
                    <i aria-hidden="true" /> Add Announcement
                  </a>
                </li>
              </ul>
            </li>

          </ul>
        </nav>
        {/*<div id="notice" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false" style="margin-top:7% !important;background: none !important; padding-left: 5px;">
    <div class="modal-dialog" style="margin:0 auto;">*/}
        {/* Modal content*/}
        {/* <div class="modal-content" style="border: 1px solid #000">
        <div class="modal-header" style="background:linear-gradient(#b159c2,#853395)!important;text-align:center">
          <h4 class="modal-title" style="color:#fff;width:100%">4Bet Important Notice</h4>
        </div>
        <div class="modal-body" style="padding:0px !important;">
          <div class="tab-content">
            <div id="" class="tab-pane fade in active">
              <p style="padding:10px;" id="impMsg"></p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="col-xs-12 col-lg-12" style="text-align:center">
            <button style="background:linear-gradient(#b159c2,#853395)!important;color:#fff;width:30%" type="button" id="msgClose" class="btn btn-default" data-dismiss="modal"> Close </button>
          </div>
        </div>
      </div>
    </div>
  </div>*/}


      </div>
      <div
        id="cngpwdOwn"
        className="modal fade"
        data-backdrop="static"
        data-keyboard="false"
        role="dialog"
        style={{ display: "none" }}
      >
        {/* Change Password */}
        <div className=" " id="changeUserPasswordOwn" role="main">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
                <input type="hidden" id="nwpassid" />
                <h4 className="modal-title">Change Password</h4>
              </div>
              <div className="modal-body">
                <div id="PassUserMsg">
                  <span id="passerror" style={{ color: "red" }}> {passwordError} </span>
                </div>
                <div className="">
                  <form id="" method="post" autoComplete="off" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <label>Old Password</label>
                      <input
                        type="password"
                        name="oldPassword"
                        defaultValue=""
                        className="form-control"
                        id="oldPassword"
                        autoComplete="off"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <label>New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        defaultValue=""
                        className="form-control"
                        id="newPassword"
                        autoComplete="off"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirm_password"
                        defaultValue=""
                        className="form-control"
                        id="confirm_password"
                        autoComplete="off"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 col-xs-6 modal-footer" style={{ display: 'flex' }}>
                      <button
                        type="button"
                        onClick={changePassWord}
                        className="blue_button"
                        id="change_pass"
                        style={{ marginRight: "2px" }}
                      >
                        Change
                      </button>
                      <button
                        data-dismiss="modal"
                        type="button"
                        className="blue_button"
                        style={{ background: 'red' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Header