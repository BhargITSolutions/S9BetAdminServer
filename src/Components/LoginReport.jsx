import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useParams } from 'react-router-dom';
import Moment from 'moment';

function LoginReport() {

    const { Id } = useParams();

    const [data, setData] = useState([])
    const [fromDate, setFromDate] = useState(getDefaultFromDate());
    const [toDate, setToDate] = useState(getDefaultToDate());



    function getDefaultFromDate() {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        console.log("Default From Date : " + twoDaysAgo)
        return twoDaysAgo.toISOString().split('T')[0];
    }

    function getDefaultToDate() {
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Set the time to 23:59:59.999
        console.log("Today date : " + today)
        return today.toISOString().split('T')[0];
    }

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };

    const handleFilter = () => {
        fetchLoginReport(); // Trigger refetching with the updated filter criteria
        // setCurrentPage(1);
        // setFilterClicked(true);
      };

    useEffect(() => {
        fetchLoginReport();
    }, [Id])


    const fetchLoginReport = async () => {
        try {
            const fetched = await fetch(`http://localhost:5000/loginReport/${Id}`);
            const response = await fetched.json();
            console.log("Login Report Data: ", response.data);
            // setData(response.data);


            if (Array.isArray(response.data)) {
                // Format the date in each item before setting it in the state
                const formattedData = response.data.map(item => ({
                    ...item
                }));

                // Filter by date and Status

                const filteredData = formattedData.filter(item =>
                    new Date(item.LoginTime) >= new Date(fromDate) &&
                    new Date(item.LoginTime) <= new Date(toDate).setHours(23, 59, 59, 999)
                );

                console.log("From Date : " + fromDate)
                console.log("To Date : " + toDate)
                // Sort the data by the ISO date string
                filteredData.sort((a, b) => new Date(b.LoginTime) - new Date(a.LoginTime));

                console.log("Formatted and Sorted Login Report data:", filteredData);
                // // Sort the data by the ISO date string
                // formattedData.sort((a, b) => new Date(a.result.data.placeTime) - new Date(b.result.data.placeTime));

                // console.log("Formatted and Sorted Bet History data:", formattedData);

                setData(filteredData);
            }
        } catch (error) {
            console.error("Error fetching Login Report API: ", error);
        }

    }

    return (
        <>

            <div className="nav-md">
                <div className="container body">
                    <Header />
                    <div className="right_col" role="main" style={{ minHeight: 599 }}>
                        <div className="loader" style={{ display: "none" }} />
                        <div className="">
                            <div className="col-md-12">
                                <div className="title_new_at">Login report</div>
                            </div>
                            <div className="block_2">
                                <input
                                    type="date"
                                    name="fdate"
                                    id="fdate"
                                    className="form-control"
                                    placeholder="From Date"
                                    autoComplete="off"
                                    onChange={handleFromDateChange}
                                    value={fromDate}
                                />
                            </div>
                            <div className="block_2">
                                <input
                                    type="date"
                                    name="tdate"
                                    id="tdate"
                                    className="form-control"
                                    placeholder="To Date"
                                    autoComplete="off"
                                    onChange={handleToDateChange}
                                    value={toDate}
                                />
                            </div>
                            <div className="block_2 buttonacount">
                                <button
                                    type="button"
                                    name="submit"
                                    id="submit_form_button"
                                    onClick={handleFilter}
                                    className="blue_button"
                                    data-attr="submit"
                                >
                                    Filter
                                </button>
                                {/* <a  class="red_button">Clear</a> */}
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="tabel_content">
                                    <div className="table-responsive sports-tabel" id="contentreplace">
                                        <table className="table tabelcolor tabelborder">
                                            <thead>

                                                <tr>
                                                    <th className="darkpurplecolor" scope="col">
                                                        So.
                                                    </th>
                                                    <th className="lightgreencolor" scope="col">
                                                        User Id
                                                    </th>
                                                    <th className="darkpurplecolor" scope="col">
                                                        Login Time
                                                    </th>
                                                    <th className="lightgreencolor" scope="col">
                                                        Logout Time
                                                    </th>
                                                    <th className="darkpurplecolor" scope="col">
                                                        IP
                                                    </th>
                                                    <th className="lightgreencolor" scope="col">
                                                        Location
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="loginReport">
                                                {data.map((item, index) => (

                                                    <tr>
                                                        <td scope="row">{index + 1}</td>
                                                        <td scope="row">{item.UserName}</td>
                                                        <td scope="row">
                                                            {item.LoginTime !== null ? Moment(item.LoginTime).format('DD/MM/YYYY hh:mm:ss') : ""}</td>
                                                        <td scope="row">{item.LogoutTime !== null ? Moment(item.LogoutTime).format('DD/MM/YYYY hh:mm:ss') : ""}</td>
                                                        <td scope="row">{item.IpAddress}</td>
                                                        <td scope="row">{item.BrowserInfo}</td>
                                                    </tr>
                                                ))}
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
            </div>

        </>
    )
}

export default LoginReport