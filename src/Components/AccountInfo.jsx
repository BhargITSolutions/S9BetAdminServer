import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Cookies from 'js-cookie';

function AccountInfo() {

    const userId = Cookies.get('id')

    const [data, setData] = useState('')
    const [downLine, setDownLine] = useState('')
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        fetchMyBalanceApi();
    }, [])




    const fetchMyBalanceApi = async () => {
        setIsLoading(true)
        try {
            const fetched = await fetch(`https://api.s2bet.in/myBalance/${userId}`);
            const response = await fetched.json();
            console.log("Get myBalance Api : " + JSON.stringify(response.mainBalance[0].ResultAmountP));


            setData(response.mainBalance[0].ResultAmountP)
            setDownLine(response.mainBalance[1].downLineBalance)


        } catch (error) {
            console.error("Error fetching Balance api " + error);
        } finally {
            // Set loading state back to false after the request is completed
            setIsLoading(false);
        }
    };



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
                    <div className="">
                        <div className="col-md-12">
                            <div className="title_new_at"> Account Info</div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div id="divLoading"> </div>
                            {/*Loading class */}
                            <div className="table-responsive">
                                <table className="table table-striped jambo_table bulk_action" id=" ">
                                    <thead>
                                        <tr className="headings">
                                            <th className="darkpurplecolor">My Balance </th>
                                            <th className="lightgreencolor">Downline Balance </th>
                                            <th className="darkpurplecolor">My Match Share </th>
                                            <th className="lightgreencolor">My Casino Share </th>
                                            <th className="darkpurplecolor">My Teen Patti Share </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="green" id="mBal">
                                                {data}
                                            </td>
                                            <td className=" " id="cBal">
                                                {downLine}
                                            </td>
                                            <td className=" " id="mPart">
                                                0
                                            </td>
                                            <td className=" " id="cPart">
                                                0
                                            </td>
                                            <td className=" " id="tPart">
                                                0
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
            {/* </div> */}


        </>
    )
}

export default AccountInfo