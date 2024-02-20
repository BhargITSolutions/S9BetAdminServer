import React, { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Header from './Header';
import Footer from './Footer';






export const SportSetting = () => {

  const [sportsNames, setSportsNames] = useState([]);

  const [isActive, setIsActive] = useState(true);


  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [pageNumber, setPageNumber] = useState(2);
  const [totalSportsName, setTotalSportsName] = useState();


  // 1 for true and 0 from false




  const fetchSportsName = async () => {
    let response = await fetch(`http://localhost:5000/api/getSports`);
    let fetchdata = await response.json();
    console.log(fetchdata);

    console.log(fetchdata.length);

    setTotalSportsName(fetchdata.length);
    setSportsNames(fetchdata);

  }


  const updateSportStatus = useCallback(async (event, id) => {
    //  event.preventDefault();

    // let uniId = id;

    Swal.fire({
      title: "Conformation",
      text: "Do you want to change the status",
      icon: "warning",
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then(async (result) => {
      if (!result.value) return;



      let status;
      event.target.checked ? status = 0 : status = 1;

      // console.log(uniId);
      // setIsActive(Math.floor(Math.random()*25));
      setIsActive((prev => !prev));
      // alert(`${event.target.checked ? "want to active":"want to inactive"}`);
      window.location.reload();
      try {

        let res = await fetch(`http://localhost:5000/api/updateSportStatus/${id}/${status}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Additional headers if needed
          }
        });


      } catch (error) {
        console.log("error in connecting the api");
      }

    }) // here we go

  }, []);

  console.log(isActive);

  useEffect(() => {

    fetchSportsName();

  }, [isActive])




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
                Sport Setting
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
                    id="usr"
                  >
                    <thead>
                      <tr className="headings">
                        <th className="darkpurplecolor">S NO.</th>
                        <th className="lightgreencolor">SPORT NAME</th>
                        <th className="darkpurplecolor">ACTION</th>
                      </tr>
                    </thead>
                    <tbody id="usetable">
                      {sportsNames.map((sport, index) => {
                        return <tr key={sport.SportId}>
                          <td>{(currentPage - 1) * perPage + index + 1}</td>
                          <td>{sport.SportName}</td>
                          <td>
                            <label className="switch">
                              <input type="checkbox" checked={sport.Status} onClick={(event) => updateSportStatus(event, sport.SportId)} />
                              <span className="slider" />
                            </label>
                          </td>
                        </tr>


                      })}

                      { /*  <tr>
                    <td>1</td>
                    <td>Soccer</td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Tennis</td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Cricket</td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                    </td>
                </tr> */ }


                    </tbody>
                  </table>
                </div>
                <div className="dataTables_wrapper no-footer">

                  { /* <div className="pagination-row dataTables_paginate paging_simple_numbers">
                {Array.from({ length: Math.ceil(sportsNames.length / perPage) }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`paginate_button ${currentPage === i + 1 ? 'current' : ''}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                </div>   */}

                  <div
                    className="dataTables_info"
                    id="datatable_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing {1} to {sportsNames.length} of Entries {totalSportsName}

                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="datatable_paginate"
                  >
                    <a
                      className={`paginate_button previous disabled`}
                      aria-controls="datatable"
                      data-dt-idx={0}
                      tabIndex={0}
                      id="datatable_previous"
                    >
                      Previous
                    </a>
                    <span id="pages_data">
                      <a
                        className={`paginate_button current`}
                        aria-controls="datatable"
                        data-dt-idx={1}
                        tabIndex={0}
                      >
                        1
                      </a>
                    </span>
                    <span id="pages_data">
                      <a
                        className={`paginate_button`}
                        aria-controls="datatable"
                        data-dt-idx={1}
                        tabIndex={0}
                      >
                        2
                      </a>
                    </span>


                    { /* <span id="pages_data">
                  <a
                    className="paginate_button current"
                    aria-controls="datatable"
                    data-dt-idx={1}
                    tabIndex={0}
                  >
                    3
                  </a>
            </span>  */}
                    <a
                      className={`paginate_button next disabled`}
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
            <div className="row " style={{ display: "none" }}>
              <div className="col-md-12 col-xs-12 ">
                <div className="title_new_at"> Users List</div>
                <div className=" searchuser" style={{ marginBottom: 10 }}>
                  <div
                    className="dataTables_length"
                    id="datatable_length"
                    style={{ padding: 10 }}
                  >
                    <label>
                      Show
                      <select
                        name="datatable_length"
                        aria-controls="datatable"
                        className=""
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>{" "}
                      entries
                    </label>
                  </div>
                  <div
                    className="col-md-6 col-xs-6"
                    style={{ textAlign: "right", padding: 10, float: "right" }}
                  >
                    <form className="usersech block_5" id="userListForm">
                      <input type="hidden" name="formSubmit" defaultValue={1} />
                      <input
                        type="hidden"
                        name="perpage"
                        id="perpage"
                        defaultValue={10}
                      />
                      <div id="datatable_filter" className="dataTables_filter">
                        <label>
                          <input
                            style={{ float: "right", width: "100% !important" }}
                            id=""
                            type="search"
                            className="sr"
                            placeholder="Search Here..."
                            aria-controls="datatable"
                          />
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-12"></div>
              <div className="col-md-12 col-sm-12 col-xs-12" style={{ padding: 10 }}>
                <div id="divLoading"> </div>
                {/*Loading class */}
              </div>
            </div>
          </div>
          {/* <style
            dangerouslySetInnerHTML={{
              __html:
                "\n        footer {\n          background: none;\n          padding: 15px 20px;\n          display: block;\n        }\n      "
            }}
          /> */}
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
