import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard';
// import Header from './Components/Header';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the js-cookie library
import AdminList from './Components/AdminList';
import UserList from './Components/userList';
import LoginReport from './Components/LoginReport';
import { SportSetting } from './Components/SportSetting';
import { MatchSetting } from './Components/MatchSetting';
import { GlobalSetting } from './Components/GlobalSetting';
import Announcement from './Components/Announcement';
import AnnouncementUpdating from './Components/AnnouncementUpdating';
import CloseUser from './Components/CloseUser';
import AccountInfo from './Components/AccountInfo';
import AccountStatement from './Components/AccountStatement';
import MatchDetailList from './Components/MatchDetailList';
import BetHistory from './Components/BetHistory';
import ShowBetCr from './Components/ShowBetCr';
import ChipSummary from './Components/ChipSummary';
import Ledger from './Components/Ledger';
import DownlineProfitLoss from './Components/DownlineProfitLoss';
import NetExposure from './Components/NetExposure';
import CuttingExpo from './Components/CuttingExpo';
import DeleteBetHistory from './Components/DeleteBetHistory';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user information is present in session storage
    const userName = Cookies.get('userName');
    const userId = Cookies.get('id');

    if (userName && userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/'
          element={isLoggedIn ? <Dashboard /> : <Login />}
        />
        <Route
          path='/dashboard'
          element={isLoggedIn ? <Dashboard /> : <Login />}
        />
        <Route
          path='/adminList/:roleId'
          element={isLoggedIn ? <AdminList /> : <Login />}
        />
        <Route
          path='/adminList/:roleId/:Id'
          element={isLoggedIn ? <AdminList /> : <Login />}
        />
        <Route
          path='/userList'
          element={isLoggedIn ? <UserList /> : <Login />}
        />
        <Route
          path='/loginReport/:Id'
          element={isLoggedIn ? <LoginReport /> : <Login />}
        />
        <Route path='/sportSetting' element={isLoggedIn ? <SportSetting /> : <Login />} />
        <Route path='/matchSetting' element={isLoggedIn ? <MatchSetting /> : <Login />} />
        <Route path='/globalSetting' element={isLoggedIn ? <GlobalSetting /> : <Login />} />
        <Route path='/announcement' element={isLoggedIn ? <Announcement /> : <Login />} />
        <Route path='/announcementUpdate' element={isLoggedIn ? <AnnouncementUpdating /> : <Login />} />
        <Route path='/closeUser/:roleId/:Id' element={isLoggedIn ? <CloseUser /> : <Login />} />
        <Route path='/accountInfo' element={isLoggedIn ? <AccountInfo /> : <Login />} />
        <Route path='/statementByUser' element={isLoggedIn ? <AccountStatement /> : <Login />} />
        <Route path='/matchDetailList/:eventId' element={isLoggedIn ? <MatchDetailList /> : <Login />} />
        <Route path='/betHistory' element={isLoggedIn ? <BetHistory /> : <Login />} />
        <Route path='/ShowBetCr/:eid/:marketNumber/:marketSId' element={isLoggedIn ? <ShowBetCr /> : <Login />} />
        <Route path='/chipSummary' element={isLoggedIn ? <ChipSummary /> : <Login />} />
        <Route path='/ledger/:userId' element={isLoggedIn ? <Ledger /> : <Login />} />
        <Route path='/downlineProfitLoss' element={isLoggedIn ? <DownlineProfitLoss /> : <Login />} />
        <Route path='/netExposure' element={isLoggedIn ? <NetExposure /> : <Login />} />
        <Route path='/cuttingExpo/:eid/:gameid' element={isLoggedIn ? <CuttingExpo /> : <Login />} />
        <Route path='/deleteBetHistory' element={isLoggedIn ? <DeleteBetHistory /> : <Login />} />





      </Routes>

    </ BrowserRouter>
  )
}

export default App;
