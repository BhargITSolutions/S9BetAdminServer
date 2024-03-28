import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Moment from 'moment';
import Cookies from 'js-cookie'
import Header from './Header'
import Footer from './Footer'
// import { useUser } from './UserContext';
// import { navigat } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';

function AdminList() {

    // const { setUserId } = useUser();
    // const navigate = useHistory();
    const navigateTo = useNavigate();
    const { Id } = useParams();
    const { roleId } = useParams();
    const roleIdNumber = parseInt(roleId, 10) + 1;

    const userId = Cookies.get('id')
    const LoggedInroleId = Cookies.get('roleId')
    const LoggedInuserName = Cookies.get('userName').replace(/['"]+/g, '');
    const childRoleId = parseInt(LoggedInroleId, 10) + 1;

    console.log("Child Role Id : " + childRoleId)
    console.log("logged In user Id : " + userId)
    console.log("logged In Role Id : " + LoggedInroleId)
    console.log("Params Id  : " + Id)
    console.log("Params role ID  : " + roleId)




    const [isLoading, setIsLoading] = useState(false);
    const [usersData, setUsersData] = useState([])
    const [data, setData] = useState([])
    const [allData, setAllData] = useState([])
    const [pRoleId, setPRoleId] = useState('')
    const [pId, setPId] = useState('')
    const [pUserName, setPUserName] = useState('')
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [parentBal, setParentBal] = useState(0);
    const [userBal, setUserBal] = useState(0);
    const [chipAmount, setChipAmount] = useState('');
    const [newParentBal, setNewParentBal] = useState(0);
    const [newUserBal, setNewUserBal] = useState(0);
    const [dwUserId, setDWUserId] = useState(null)
    const [dwParentId, setDWParentId] = useState(null)
    const [dwUserName, setDWUserName] = useState('')
    const [changePassUser, setChangePassUser] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [passwordError, setPasswordError] = useState('');


    useEffect(() => {
        fetchUserData();
        setCurrentPage(1);
        fetchDepositWithdraw();

        // fetchUserChild()

    }, [roleIdNumber, Id])

    useEffect(() => {

        fetchExposure();
    }, [data])



    const fetchUserData = async () => {
        setIsLoading(true)
        try {
            const fetched = await fetch('https://api.s2bet.in/getUsers', {
                method: 'GET',
                mode: 'cors'
            });
            const response = await fetched.json();
            console.log("Get Users Api : " + JSON.stringify(response.data));

            if (Id == 0) { 

                const clikedRoleId = roleId
                console.log("Cliked Role Id : " + clikedRoleId)
                console.log("Cliked again Role Id : " + clikedRoleId)


                if (clikedRoleId - 1 == LoggedInroleId) {
                    console.log("cliked role ID is 7 and loggedIn user RoleId is : " + LoggedInroleId)
                    if (response.data && Array.isArray(response.data)) {
                        // Combine the three arrays into a single array
                        const filteredData = response.data.filter((item) => item.RoleId == roleId && item.ParentId == userId);

                        // roleId 
                        // console.log("filteredData Child after condition : " + JSON.stringify(filteredData));
                        setData(filteredData)
                    }
                } else {
                    console.log("we fetch from loggedIn user's roleId if not - 1: " + LoggedInroleId)


                    if (response.data && Array.isArray(response.data)) {
                        // Combine the three arrays into a single array
                        const filteredData = response.data.filter((item) => item.RoleId == parseInt(LoggedInroleId) + 1 && item.ParentId == userId);

                        // roleId 
                        // console.log("filteredData Child after condition 1 : " + JSON.stringify(filteredData));

                        // again check

                        if ((clikedRoleId - 1) == (filteredData[0].RoleId)) {
                            // Combine the three arrays into a single array
                            const filteredData1 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData.some(child2 => child2.Id == item.ParentId));

                            // roleId 
                            // console.log("filteredData Child after condition 2: " + JSON.stringify(filteredData1));
                            console.log("For If Lenght 1: " + filteredData1.length)
                            setData(filteredData1)

                        } else {

                            // Combine the three arrays into a single array
                            const filteredData1 = response.data.filter((item) => item.RoleId == filteredData[0].RoleId + 1 && filteredData.some(child2 => child2.Id == item.ParentId));

                            // console.log("Condition 2 else : " + filteredData1[0].RoleId + " " + (clikedRoleId - 1))
                            console.log("Lenght 1: " + filteredData1.length)

                            if ((clikedRoleId - 1) == filteredData1[0].RoleId) {
                                // Combine the three arrays into a single array
                                const filteredData2 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData1.some(child2 => child2.Id == item.ParentId));

                                // roleId 
                                // console.log("filteredData Child after condition 3: " + JSON.stringify(filteredData2))
                                setData(filteredData2)
                            } else {
                                // Combine the three arrays into a single array
                                const filteredData2 = response.data.filter((item) => item.RoleId == filteredData1[0].RoleId + 1 && filteredData1.some(child2 => child2.Id == item.ParentId));

                                // console.log("Condition 2 else : " + filteredData1[0].RoleId + " " + (clikedRoleId - 1))
                                console.log("Lenght 2: " + filteredData2.length)


                                if (filteredData1.length > 0 && (clikedRoleId - 1) == filteredData1[0]?.RoleId) {
                                    // Combine the three arrays into a single array
                                    const filteredData2 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData1.some(child2 => child2.Id == item.ParentId));

                                    // roleId 
                                    // console.log("filteredData Child after condition 3: " + JSON.stringify(filteredData2))
                                    setData(filteredData2)
                                } else {
                                    // Combine the three arrays into a single array
                                    const filteredData3 = response.data.filter((item) => item.RoleId == filteredData2[0].RoleId + 1 && filteredData2.some(child2 => child2.Id == item.ParentId));

                                    // console.log("Condition 2 else : " + filteredData1[0].RoleId + " " + (clikedRoleId - 1))
                                    console.log("Lenght 3: " + filteredData3.length)

                                    if (filteredData2.length > 0 && (clikedRoleId - 1) == filteredData2[0]?.RoleId) {
                                        // Combine the three arrays into a single array
                                        const filteredData3 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData2.some(child2 => child2.Id == item.ParentId));

                                        // roleId 
                                        // console.log("filteredData Child after condition 4: " + JSON.stringify(filteredData3))
                                        setData(filteredData3)
                                    } else {
                                        // Combine the three arrays into a single array
                                        const filteredData4 = response.data.filter((item) => item.RoleId == filteredData3[0].RoleId + 1 && filteredData3.some(child2 => child2.Id == item.ParentId));

                                        // console.log("Condition 2 else : " + filteredData1[0].RoleId + " " + (clikedRoleId - 1))
                                        console.log("Lenght 4: " + filteredData4.length)

                                        if (filteredData3.length > 0 && (clikedRoleId - 1) == filteredData3[0]?.RoleId) {
                                            // Combine the three arrays into a single array
                                            const filteredData4 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData3.some(child2 => child2.Id == item.ParentId));

                                            // roleId 
                                            // console.log("filteredData Child after condition 5: " + JSON.stringify(filteredData4))
                                            setData(filteredData4)
                                        }
                                        else {
                                            // Combine the three arrays into a single array
                                            const filteredData5 = response.data.filter((item) => item.RoleId == filteredData4[0].RoleId + 1 && filteredData4.some(child2 => child2.Id == item.ParentId));

                                            // console.log("Condition 2 else : " + filteredData1[0].RoleId + " " + (clikedRoleId - 1))
                                            console.log("Lenght 5: " + filteredData5.length)

                                            if (filteredData4.length > 0 && (clikedRoleId - 1) == filteredData4[0]?.RoleId) {
                                                // Combine the three arrays into a single array
                                                const filteredData5 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData4.some(child2 => child2.Id == item.ParentId));

                                                // roleId 
                                                // console.log("filteredData Child after condition 6: " + JSON.stringify(filteredData5))
                                                console.log("For If Lenght6 : " + filteredData5.length)
                                                setData(filteredData5)
                                            }
                                            else {
                                                // Combine the three arrays into a single array
                                                const filteredData6 = response.data.filter((item) => item.RoleId == filteredData5[0].RoleId + 1 && filteredData5.some(child2 => child2.Id == item.ParentId));

                                                // console.log("Condition 2 else : " + filteredData1[0].RoleId + " " + (clikedRoleId - 1))
                                                console.log("Lenght6 : " + filteredData6.length)

                                                if (filteredData5.length > 0 && (clikedRoleId - 1) == filteredData5[0]?.RoleId) {
                                                    // Combine the three arrays into a single array
                                                    const filteredData6 = response.data.filter((item) => item.RoleId == clikedRoleId && filteredData5.some(child2 => child2.Id == item.ParentId));

                                                    // roleId 
                                                    // console.log("filteredData Child after condition 7: " + JSON.stringify(filteredData6))
                                                    setData(filteredData6)
                                                }
                                            }
                                        }
                                    }

                                }

                            }

                        }
                    }

                }

            } else {

                setUsersData(response.data)

                if (response.data && Array.isArray(response.data)) {
                    // Combine the three arrays into a single array
                    const filteredData = response.data.filter((item) => item.RoleId == roleIdNumber && item.ParentId == Id);
                    // roleId 
                    // console.log("filteredData : " + JSON.stringify(filteredData));

                    setData(filteredData);
                } else {
                    console.warn("Invalid or missing data structure in the API response.");
                }
            }


        } catch (error) {
            console.error("Error fetching Users api " + error);
        } finally {
            // Set loading state back to false after the request is completed
            setIsLoading(false);
        }
    };


    const handleDW = (userId, userName, parentId) => {
        console.log("Handle W : userId: " + userId + " " + userName + " ParentId : " + parentId)
        fetchDepositWithdraw(userId, parentId);
        setDWUserId(userId)
        setDWParentId(parentId)
        setDWUserName(userName)

    }
    const fetchDepositWithdraw = async (userId, parentId) => {
        try {
            const fetched = await fetch(`https://api.s2bet.in/depositWithdraw/${userId}/${parentId}`);
            const response = await fetched.json();
            console.log("Get depositWithdraw Api : " + JSON.stringify(response.data));
            console.log("Get depositWithdraw Api : " + JSON.stringify(response.data[1].ResultAmountU));


            setParentBal(response.data[0].ResultAmountP)
            setUserBal(response.data[1].ResultAmountU != null ? response.data[1].ResultAmountU : 0)

        } catch (error) {
            console.error("Error fetching Users api " + error);
        }
    };

    const calWithdraw = () => {

        const chipAmount = document.getElementById('ChipsValue_w').value;

        console.log("Chip amount : " + chipAmount)
        if (chipAmount != "" && chipAmount != 0) {

            if (chipAmount > userBal) {
                const btn = document.getElementById("withdrawChips");
                btn.disabled = true
                const errormsg = document.getElementById("ChipsN_w");
                errormsg.innerText = "Insufficient balance";
            } else {
                const errormsg = document.getElementById("ChipsN_w");
                errormsg.innerText = "";
                const btn = document.getElementById("withdrawChips");
                btn.disabled = false

                // const btn = document.getElementById("withdrawChips");
                // btn.disabled = false
            }

            setChipAmount(chipAmount)
            const calcParent = Number(parentBal) + Number(chipAmount)
            console.log('Calculate Withdraw Parent : ' + calcParent)
            setNewParentBal(calcParent)



            const calcUser = Number(userBal) - Number(chipAmount)
            console.log('Calculate withdraw User : ' + calcUser)
            setNewUserBal(calcUser)


        } else {
            const errormsg = document.getElementById("ChipsN_w");
            errormsg.innerText = "Please Enter Amount";
            const btn = document.getElementById("withdrawChips");
            btn.disabled = true
            setNewParentBal(0)
            setNewUserBal(0)
            setChipAmount(chipAmount)

        }
    }

    const calDeposit = (amount) => {
        if (amount != "" && amount != 0) {
            if (amount > parentBal) {
                const errormsg = document.getElementById("ChipsN_d");
                errormsg.innerText = "Insufficient balance";
                const btn = document.getElementById("depositChips");
                btn.disabled = true;
            } else {
                const errormsg = document.getElementById("ChipsN_d");
                errormsg.innerText = "";
                const btn = document.getElementById("depositChips");
                btn.disabled = false;
            }

            setChipAmount(amount);
            const calcParent = Number(parentBal) - Number(amount);
            const calcUser = Number(userBal) + Number(amount);
            setNewParentBal(calcParent);
            setNewUserBal(calcUser);
        } else {
            setNewParentBal(0);
            setNewUserBal(0);
            setChipAmount(amount);
        }
    };

    const handleDeposit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Entered in handle deposit ....")
        try {
            if (newUserBal > 0 && newParentBal >= 0) {

                const response = await fetch(`https://api.s2bet.in/postDeposit/${dwUserId}/${dwParentId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chipAmount,
                        newUserBal,
                        newParentBal,
                        loggedInName: LoggedInuserName
                    })
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("Response from postdepositWithdraw API:", responseData);
                    setNewParentBal(0);
                    setNewUserBal(0);
                    setChipAmount("");
                    const btn = document.getElementById("depositChips");
                    btn.setAttribute('data-dismiss', 'modal');
                    btn.click();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Amount Deposited",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    btn.removeAttribute('data-dismiss', 'modal');
                } else {
                    console.error("Error:", response.statusText);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    });
                }
            } else {
                console.log("Clicked btn ...")
                const errormsg = document.getElementById("ChipsN_d");
                errormsg.innerText = "Please enter amount... ";
                const btn = document.getElementById("depositChips");
                btn.disabled = true;


            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        } finally {
            // Set loading state back to false after the request is completed
            setIsLoading(false);
        }
    };


    const handleWithdrawl = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("after deposit UserId : " + dwUserId + " " + "Parent ID : " + dwParentId)
        console.log("New User Balance : " + newUserBal + " " + "New Parent Balance : " + newParentBal)

        try {
            if (newUserBal > 0 && newParentBal >= 0) {

                const errormsg = document.getElementById("ChipsN_w");
                errormsg.innerText = "";

                const response = await fetch(`https://api.s2bet.in/postWithdraw/${dwUserId}/${dwParentId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chipAmount: chipAmount,
                        newUserBal: newUserBal,
                        newParentBal: newParentBal,
                        loggedInName: LoggedInuserName
                    })
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log("Response from postdepositWithdraw API:", responseData);

                    setNewParentBal(0)
                    setNewUserBal(0)
                    setChipAmount("")
                    document.getElementById('ChipsValue_w').value = ""
                    const btn = document.getElementById("withdrawChips");
                    btn.setAttribute('data-dismiss', 'modal');
                    btn.click();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Withdraw Successful",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // btn.disabled = true;
                    // Handle successful response here
                    console.log("Withdrawl ..........")
                    btn.removeAttribute('data-dismiss', 'modal');
                } else {
                    console.error("Error:", response.statusText);
                    // Handle error response here
                }
            } else {
                console.log("Clicked btn ...")
                const errormsg = document.getElementById("ChipsN_w");
                errormsg.innerText = "Please enter amount... ";
                const btn = document.getElementById("withdrawChips");
                btn.disabled = true;

            }


        } catch (error) {
            console.error("Error:", error);
            // Handle network errors here
        } finally {
            // Set loading state back to false after the request is completed
            setIsLoading(false);
        }
    };




    // Event listener for the input fields to check for uniqueness of User ID

    const createChild = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        // Access input values directly
        const master_name = document.getElementById('left_master_name').value;
        const username = document.getElementById('left_userid').value;
        const password = document.getElementById('left_password').value;
        const partnership = document.getElementById('parent_part').value;
        const pCasino = document.getElementById('parent_casino_part').value;
        const pTeenPatti = document.getElementById('parent_3patti_part').value;
        const commission = document.getElementById('left_mcomm').value;

        const error = document.getElementById('error_msg');

        console.log("master_name is : " + master_name)
        console.log("username is : " + username)
        console.log("password is : " + password)
        console.log("PartnerShip is : " + partnership)
        console.log("pCasino is : " + pCasino)
        console.log("pTeenPatti is : " + pTeenPatti)
        console.log("commission is : " + commission)

        // Check if all required fields are filled
        if (master_name.trim() === '' || username.trim() === '' || password.trim() === '') {
            console.error('Please fill in all fields.');
            error.innerText = 'Please fill in all fields.'
            return; // Exit function early if any field is empty
        } else {
            error.innerText = '';
        }

        try {
            console.log("Enter in try block..")
            // Send login request with username, password, and userIP
            const response = await fetch('https://api.s2bet.in/addUser', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Fname: master_name, username, password, userId, LoggedInuserName, childRoleId, partnership, pCasino, pTeenPatti, commission }),
            });

            console.log("after post api ..")
            const responseData = await response.json();
            console.log("Api response is : " + JSON.stringify(responseData));

            if (responseData.isSuccess === true) {
                console.log("in if part Response from api is : " + responseData)

                // Trigger click event to close modal
                const addBtn = document.getElementById('addUser');
                addBtn.setAttribute('data-dismiss', 'modal');
                addBtn.click();

                // Remove the data-dismiss attribute after the button click
                addBtn.removeAttribute('data-dismiss');
                // Dismiss the modal first

                Swal.fire({
                    title: "Success",
                    text: responseData.message,
                    icon: "success",
                    timer: 1500, // 1.5 seconds
                    showConfirmButton: false
                });
                fetchUserData();
                // Clear input fields
                document.getElementById('left_master_name').value = '';
                document.getElementById('left_userid').value = '';
                document.getElementById('left_password').value = '';
                document.getElementById('parent_part').value = '';
                document.getElementById('parent_casino_part').value = '';
                document.getElementById('parent_3patti_part').value = '';
                document.getElementById('left_mcomm').value = '';
            } else {

                console.log("in else part Response from api is : " + JSON.stringify(responseData))
                // Trigger click event to close modal
                const addBtn = document.getElementById('addUser');
                addBtn.setAttribute('data-dismiss', 'modal');
                addBtn.click();

                // Remove the data-dismiss attribute after the button click
                addBtn.removeAttribute('data-dismiss');
                Swal.fire({
                    title: "Error",
                    text: responseData.message,
                    icon: "error",
                    // timer: 1500, // 1.5 seconds
                    showConfirmButton: true
                });
            }
        } catch (error) {
            console.error('Error during User Add api:', error);
            // Trigger click event to close modal
            const addBtn = document.getElementById('addUser');
            addBtn.setAttribute('data-dismiss', 'modal');
            addBtn.click();

            // Remove the data-dismiss attribute after the button click
            addBtn.removeAttribute('data-dismiss');
            Swal.fire({
                title: 505,
                text: "An error occurred while processing your request. Please try again later.",
                icon: "error",
                // timer: 1500, // 1.5 seconds
                showConfirmButton: true
            });
        } finally {
            // Set loading state back to false after the request is completed
            setIsLoading(false);
        }
    }



    const handleBlur = () => {
        const inputElement = document.getElementById('left_userid');
        let enteredUserId = inputElement.value;

        // Remove leading and trailing whitespace
        enteredUserId = enteredUserId.trim();

        // Check if the entered value is empty or contains only spaces
        if (enteredUserId === '' || /^\s+$/.test(enteredUserId)) {
            // Display an error message
            const errorIdElement = document.getElementById('error_id');
            errorIdElement.innerText = 'User ID cannot be empty';
            errorIdElement.style.color = 'red';
            setTimeout(() => {
                errorIdElement.innerText = '';
            }, 3000)
            // Disable the submit button
            document.getElementById('addUser').disabled = true;
            return; // Exit the function early
        }

        // If the entered value meets the length criteria
        if (enteredUserId.length >= 4 && enteredUserId.length <= 15) {
            // Replace special characters except underscore
            const sanitizedValue = enteredUserId.replace(/[^\w\s]/g, '');
            // Update the input value
            inputElement.value = sanitizedValue;

            if (usersData && Array.isArray(usersData)) {
                const userExists = usersData.some(user => user.UserName === sanitizedValue);
                const errorIdElement = document.getElementById('error_id');

                if (userExists) {
                    // Display an error message in red
                    errorIdElement.innerText = 'User ID already exists';
                    errorIdElement.style.color = 'red';
                    // Disable the submit button
                    document.getElementById('addUser').disabled = true;
                } else {
                    // Clear the error message
                    // Display a success message in green
                    errorIdElement.innerText = 'User ID is unique';
                    errorIdElement.style.color = 'green';
                    setTimeout(() => {
                        errorIdElement.innerText = '';
                    }, 3000)
                    // errorIdElement.innerText = '';
                    // Enable the submit button
                    document.getElementById('addUser').disabled = false;
                }
            } else {
                console.error("Error: 'usersData' is undefined or has an unexpected structure");
            }
        } else {
            // Display an error message if the length is not within the specified range
            const errorIdElement = document.getElementById('error_id');
            errorIdElement.innerText = 'User ID must be between 4 and 15 characters long';
            errorIdElement.style.color = 'red';
            // Disable the submit button
            document.getElementById('addUser').disabled = true;
        }
    };

    const handleBlur2 = () => {
        const inputElement = document.getElementById('left_userid2');
        let enteredUserId = inputElement.value;

        // Remove leading and trailing whitespace
        enteredUserId = enteredUserId.trim();

        // Check if the entered value is empty or contains only spaces
        if (enteredUserId === '' || /^\s+$/.test(enteredUserId)) {
            // Display an error message
            const errorIdElement = document.getElementById('error_id2');
            errorIdElement.innerText = 'User ID cannot be empty';
            errorIdElement.style.color = 'red';
            setTimeout(() => {
                errorIdElement.innerText = '';
            }, 3000)
            // Disable the submit button
            document.getElementById('addUser2').disabled = true;
            return; // Exit the function early
        }

        // If the entered value meets the length criteria
        if (enteredUserId.length >= 4 && enteredUserId.length <= 15) {
            // Replace special characters except underscore
            const sanitizedValue = enteredUserId.replace(/[^\w\s]/g, '');
            // Update the input value
            inputElement.value = sanitizedValue;

            if (usersData && Array.isArray(usersData)) {
                const userExists = usersData.some(user => user.UserName === sanitizedValue);
                const errorIdElement = document.getElementById('error_id2');

                if (userExists) {
                    // Display an error message in red
                    errorIdElement.innerText = 'User ID already exists';
                    errorIdElement.style.color = 'red';
                    // Disable the submit button
                    document.getElementById('addUser2').disabled = true;
                } else {
                    // Clear the error message
                    // Display a success message in green
                    errorIdElement.innerText = 'User ID is unique';
                    errorIdElement.style.color = 'green';
                    setTimeout(() => {
                        errorIdElement.innerText = '';
                    }, 3000)
                    // errorIdElement.innerText = '';
                    // Enable the submit button
                    document.getElementById('addUser2').disabled = false;
                }
            } else {
                console.error("Error: 'usersData' is undefined or has an unexpected structure");
            }
        } else {
            // Display an error message if the length is not within the specified range
            const errorIdElement = document.getElementById('error_id2');
            errorIdElement.innerText = 'User ID must be between 4 and 15 characters long';
            errorIdElement.style.color = 'red';
            // Disable the submit button
            document.getElementById('addUser2').disabled = true;
        }
    };


    // Store selected user IDs and selected option in an object
    let selectedUserData = {
        userId: [],
        roleId: [],
        betOption: "",
        userOption: "",
        closeUser: "",
    };

    // Function to add UserId and RoleId to the array when a checkbox is clicked
    function addUserName(userId, roleId) {

        console.log("User Id : " + userId + " Role Id : " + roleId)
        // Toggle userId
        if (selectedUserData.userId.includes(userId)) {
            selectedUserData.userId = selectedUserData.userId.filter(id => id !== userId); // Remove UserID if already present
        } else {
            selectedUserData.userId.push(userId);
            selectedUserData.roleId.push(roleId); // Add UserID if not already present
        }

        // Toggle roleId
        // if (roleId !== undefined && roleId !== null) {
        //     if (selectedUserData.roleId.includes(roleId)) {
        //         selectedUserData.roleId = selectedUserData.roleId.filter(id => id != roleId); // Remove roleId if already present
        //     } else {
        //         selectedUserData.roleId.push(roleId); // Add roleId if not already present
        //     }
        // }
    }

    // Function to handle select change event
    function handleSelectChange() {
        const selectedOption = document.getElementById('useraction').value; // Get the selected option value

        console.log("Selected option : " + selectedOption)
        let betLockValue;
        let userLockValue;
        let closeUserValue;

        if (selectedOption == "betlock") {
            betLockValue = 1
            selectedUserData.betOption = betLockValue;
        }
        if (selectedOption == "betunlock") {
            betLockValue = 0
            selectedUserData.betOption = betLockValue;
        }
        if (selectedOption == "lock") {
            userLockValue = 1;
            selectedUserData.userOption = userLockValue;
        }
        if (selectedOption == "unlock") {
            userLockValue = 0;
            selectedUserData.userOption = userLockValue;
        }
        if (selectedOption == "closeUser") {
            closeUserValue = 1;
            selectedUserData.closeUser = closeUserValue;
        }
    }


    const addSubChild = (event, parentRoleId, parentId, parentUserName) => {
        event.preventDefault();
        setPRoleId(parentRoleId)
        setPId(parentId)
        setPUserName(parentUserName)

    }

    // Event listener for the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Call createChild function
        createChild(event);

    }

    // Event listener for the form submission
    const handleSubmit2 = async (event) => {
        event.preventDefault();
        // Call createChild function

        const userId = pId;
        const LoggedInuserName = pUserName;
        const childRoleId = parseInt(pRoleId, 10) + 1;

        console.log("PopUP ")
        console.log("Child Role Id : " + childRoleId)
        console.log("Parent Role Id : " + pRoleId + " and Type is " + typeof (pRoleId))


        // Access input values directly
        const master_name = document.getElementById('left_master_name2').value;
        const username = document.getElementById('left_userid2').value;
        const password = document.getElementById('left_password2').value;
        const partnership = document.getElementById('parent_part2').value;
        const pCasino = document.getElementById('parent_casino_part2').value;
        const pTeenPatti = document.getElementById('parent_3patti_part2').value;
        const commission = document.getElementById('left_mcomm2').value;




        const error = document.getElementById('error_msg2');

        console.log("PartnerShip is : " + partnership)

        // Check if all required fields are filled
        if (master_name.trim() === '' || username.trim() === '' || password.trim() === '') {
            console.error('Please fill in all fields.');
            error.innerText = 'Please fill in all fields.'
            return; // Exit function early if any field is empty
        } else {
            error.innerText = '';
        }

        try {
            // Send login request with username, password, and userIP
            const response = await fetch('https://api.s2bet.in/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Fname: master_name, username, password, userId, LoggedInuserName, childRoleId, partnership, pCasino, pTeenPatti, commission }),
            });

            if (response.ok) {
                // Check content type of the response
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    // If response is JSON, parse it
                    const responseData = await response.json();
                    console.log("Response is : ", responseData);
                    Swal.fire("User Added..");
                    fetchUserData();
                    // Clear input fields
                    document.getElementById('left_master_name2').value = '';
                    document.getElementById('left_userid2').value = '';
                    document.getElementById('left_password2').value = '';
                    document.getElementById('parent_part2').value = '';
                    document.getElementById('parent_casino_part2').value = '';
                    document.getElementById('parent_3patti_part2').value = '';
                    document.getElementById('left_mcomm2').value = '';

                } else {
                    // If response is not JSON, treat it as text
                    const responseText = await response.text();
                    console.log("Response is in text: ", responseText);
                    Swal.fire("User Added..");
                    fetchUserData();
                    // Handle non-JSON response accordingly
                    // Clear input fields
                    document.getElementById('left_master_name2').value = '';
                    document.getElementById('left_userid2').value = '';
                    document.getElementById('left_password2').value = '';
                    document.getElementById('parent_part2').value = '';
                    document.getElementById('parent_casino_part2').value = '';
                    document.getElementById('parent_3patti_part2').value = '';
                    document.getElementById('left_mcomm2').value = '';


                    // Trigger click event to close modal
                    const addBtn = document.getElementById('addUser2');
                    addBtn.setAttribute('data-dismiss', 'modal');
                    addBtn.click();

                    // Remove the data-dismiss attribute after the button click
                    addBtn.removeAttribute('data-dismiss');
                }
            } else {
                // handleError();
                console.error('User Not Added');
            }
        } catch (error) {
            console.error('Error during User Add api:', error);
        }
    }

    // Function to send selected user names and option to the backend
    function updateUser() {


        const selectedOption = document.getElementById('useraction').value;
        console.log("Selected user option : " + JSON.stringify(selectedOption))


        if (selectedOption != "default" && selectedUserData.userId != 0) {

            console.log("Selected user option data : " + JSON.stringify(selectedUserData))
            Swal.fire({
                title: "Conformation",
                text: "Are you sure",
                icon: "warning",
                confirmButtonText: "Yes",
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setIsLoading(true)
                    try {
                        // Send selectedUserData to backend using fetch or any other method
                        const response = await fetch('https://api.s2bet.in/updateUser', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(selectedUserData),
                        });

                        const responseData = await response.json();
                        console.log("response Data : ", responseData)
                        if (responseData.update == 'Ok') {
                            console.log("Response selected users are : " + responseData); // Log response if needed
                            // Handle successful response from backend
                            Swal.fire({
                                position: "top-end",
                                icon: "Update Successful",
                                title: "Your work has been saved",
                                showConfirmButton: false,
                                timer: 1500
                            })


                            fetchUserData()
                            // Deselect checkboxes
                            const checkboxes = document.querySelectorAll('.select-users');
                            checkboxes.forEach(checkbox => {
                                checkbox.checked = false;
                            });
                            // Reset selected option
                            const userActionSelect = document.getElementById('useraction');
                            userActionSelect.value = -1;

                        } else {
                            // Handle error response from backend
                            console.error('Error updating user:', response.statusText);

                            // const responseData = await response.text();
                            // console.log("Response selected users are : " + responseData); // Log response if needed
                            // Handle successful response from backend
                            Swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: responseData.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    } catch (error) {
                        console.error('Error updating user:', error);
                    } finally {
                        // Set loading state back to false after the request is completed
                        setIsLoading(false);
                    }
                }
            });


        }




    }


    const handleChild = (roleId, Id) => {
        navigateTo(`/adminList/${roleId}/${Id}`);
    }


    const fetchExposure = async () => {

        setIsLoading(true)
        try {

            const responseRunner = await fetch(`https://api.s2bet.in/getRunners`);
            const resultRunner = await responseRunner.json();

            const runnersSelectionIds = [];

            if (resultRunner.isSuccess && resultRunner.data.length > 0) {
                // Extracting SelectionId and Market from each item in the resultRunner.data array
                const filterRunnerSId = resultRunner.data.map(item => ({
                    eventId: item.EventId,
                    selectionId: item.SelectionId,
                    market: item.Market
                }));

                runnersSelectionIds.push(...filterRunnerSId);
            }

            console.log("Runner Selection ID in fetch Exposure function  : ", runnersSelectionIds);

            const matchOddsBetsByRunner = runnersSelectionIds.filter(runner => runner.market === "Matchodds")

            const SBetsByRunner = matchOddsBetsByRunner.filter(runner => runner.selectionId);

            console.log("SBetsByRunner Selection IDs of MAtch ODds  : ", SBetsByRunner);


            const BookMakerBetsByRunner = runnersSelectionIds.filter(runner => runner.market === "BookMaker")

            const SBetsByRunnerBM = BookMakerBetsByRunner.filter(runner => runner.selectionId);

            console.log("SBetsByRunner Selection IDs of MAtch ODds  : ", SBetsByRunnerBM);

            let exposureArr = [];

            console.log("Data before exposure : ", data)

            const promises = data.map(async item => {
                try {

                    const response = await fetch(`https://api.s2bet.in/getExposure/${item.Id}`);
                    const result = await response.json();

                    if (result.isSuccess) {
                        console.log("Exposure Api data for Id:", item.Id, " is : ", result.data);


                        let exposure = 0;

                        // Iterate over each unique EventId
                        result.data.forEach(event => {
                            const eventId = event.eventId;
                            const eventSelections = [];
                            const eventSelectionsBM = [];


                            // For BACK !!!!!!!

                            const filtermatchOdds = event.data.filter(item => item.market == "Matchodds" && SBetsByRunner.some(runner => runner.selectionId == item.selectionId) && item.type == "back")

                            const totalProfit = filtermatchOdds.reduce((sum, item) => sum + item.profit, 0);

                            console.log("Total Profit for back: ", totalProfit);
                            const totalLoss = filtermatchOdds.reduce((sum, item) => sum + item.liability, 0);

                            console.log("Total Loss for back: ", totalLoss);

                            console.log("Match Odd filter : " + JSON.stringify(filtermatchOdds))

                            // For LAY !!!!!!

                            const filtermatchOddsLay = event.data.filter(item => item.market == "Matchodds" && SBetsByRunner.some(runner => runner.selectionId == item.selectionId) && item.type == "lay")

                            const totalProfitLay = filtermatchOddsLay.reduce((sum, item) => sum + item.profit, 0);

                            console.log("Total Loss for Lay : ", totalProfitLay);
                            const totalLossLay = filtermatchOddsLay.reduce((sum, item) => sum + item.liability, 0);

                            console.log("Total Profit for Lay : ", totalLossLay);

                            console.log("Match Odd filter for lay : " + JSON.stringify(filtermatchOddsLay))

                            // NEXT TEAM For BACK /////////////

                            const filterODD = event.data.filter(item => {
                                // Check if the market is "Matchodds", type is "back", 
                                // and there is at least one matching selectionId in the odds array
                                return item.market === "Matchodds" &&
                                    item.type === "back" &&
                                    SBetsByRunner.some(oddsitem => oddsitem.selectionId == item.selectionId);
                            });

                            console.log("filter ODD Next team : ", filterODD)

                            // Get unique selectionIds from filterODDLay
                            const filterODDSelectionIds = new Set(filterODD.map(item => item.selectionId));

                            console.log("Filter odd SelectionIds ssss : ", filterODDSelectionIds)

                            const filterOddAgainForOdd = SBetsByRunner.filter(item => !filterODDSelectionIds.has(item.selectionId)
                                && filterODD.some(odds => odds.eventId == item.eventId));

                            console.log("Filter odd again for odd ssss : ", filterOddAgainForOdd)

                            // Add profit = 0 and loss = 0 to the items in filterOddAgain
                            const filterOddAgainWithProfitLossOdd = filterOddAgainForOdd.map(item => ({
                                ...item,
                                profit: 0,
                                liability: 0,
                            }));

                            console.log("Filter odd again for odd with profit loss ssss : ", filterOddAgainWithProfitLossOdd)
                            // Combine filterODDLay and filterOddAgainWithProfitLoss into a single array
                            const combinedArrayForOdd = [...filterODD, ...filterOddAgainWithProfitLossOdd];

                            console.log("Next Team for Odd: " + JSON.stringify(combinedArrayForOdd));

                            // Create an object to store total profit for each selectionId
                            const totalProfitBySelectionId = {};
                            const totalLossBySelectionId = {};

                            // Calculate net profit for each selectionId
                            combinedArrayForOdd.forEach(item => {
                                const selectionId = item.selectionId;
                                const profit = item.profit;
                                const loss = item.liability;

                                // If selectionId is not in the object, add it
                                if (!totalProfitBySelectionId.hasOwnProperty(selectionId)) {
                                    totalProfitBySelectionId[selectionId] = 0;
                                }

                                // If selectionId is not in the object, add it
                                if (!totalLossBySelectionId.hasOwnProperty(selectionId)) {
                                    totalLossBySelectionId[selectionId] = 0;
                                }

                                // Add profit to the total for this selectionId
                                totalProfitBySelectionId[selectionId] += profit;
                                totalLossBySelectionId[selectionId] += loss;
                            });

                            // Calculate the net profit (profit - loss) for each selectionId
                            const netProfitBySelectionId = {};
                            Object.keys(totalProfitBySelectionId).forEach(selectionId => {
                                // Calculate total loss to other selectionIds
                                const totalLossToOtherSelections = Object.keys(totalLossBySelectionId)
                                    .filter(otherSelectionId => otherSelectionId !== selectionId)
                                    .reduce((acc, otherSelectionId) => acc + totalLossBySelectionId[otherSelectionId], 0);

                                const profit = totalProfitBySelectionId[selectionId];
                                const loss = totalLossBySelectionId[selectionId];

                                // Subtract total loss to other selectionIds from the profit
                                netProfitBySelectionId[selectionId] = profit + totalLossToOtherSelections;
                            });

                            // Example usage:
                            console.log("Total Profit by SelectionId for Odd: ", totalProfitBySelectionId);
                            console.log("Total Loss by SelectionId for Odd : ", totalLossBySelectionId);
                            console.log("Net Profit by SelectionId for Odd : ", netProfitBySelectionId);

                            // NEXT TEAM For LAY /////////////

                            const filterODDLay = event.data.filter(item => {
                                // Check if the market is "Matchodds", type is "back", 
                                // and there is at least one matching selectionId in the odds array
                                return item.market === "Matchodds" &&
                                    item.type === "lay" &&
                                    SBetsByRunner.some(oddsitem => oddsitem.selectionId === item.selectionId);
                            });

                            console.log("filterODDLay fltered data : ", filterODDLay)
                            // Get unique selectionIds from filterODDLay
                            const filterODDLaySelectionIds = new Set(filterODDLay.map(item => item.selectionId));

                            // Filter items from odds based on selectionId not present in filterODDLay
                            const filterOddAgain = SBetsByRunner.filter(item => !filterODDLaySelectionIds.has(item.selectionId) && filterODDLay.some(odds => odds.eventId == item.eventId));

                            // Add profit = 0 and loss = 0 to the items in filterOddAgain
                            const filterOddAgainWithProfitLoss = filterOddAgain.map(item => ({
                                ...item,
                                profit: 0,
                                liability: 0,
                            }));

                            console.log("filter odd Again : " + JSON.stringify(filterOddAgainWithProfitLoss));

                            console.log("Next Team for Lay : " + JSON.stringify(filterODDLay));

                            console.log("Odds item : " + JSON.stringify(SBetsByRunner.length))

                            // Combine filterODDLay and filterOddAgainWithProfitLoss into a single array
                            const combinedArray = [...filterODDLay, ...filterOddAgainWithProfitLoss];

                            console.log("Combined Both Array: " + JSON.stringify(combinedArray));

                            // Create an object to store total profit for each selectionId
                            const totalProfitBySelectionIdLay = {};
                            const totalLossBySelectionIdLay = {};

                            // Calculate net profit for each selectionId
                            combinedArray.forEach(item => {
                                const selectionId = item.selectionId;
                                const profit = item.profit;
                                const loss = item.liability;

                                // If selectionId is not in the object, add it
                                if (!totalProfitBySelectionIdLay.hasOwnProperty(selectionId)) {
                                    totalProfitBySelectionIdLay[selectionId] = 0;
                                }

                                // If selectionId is not in the object, add it
                                if (!totalLossBySelectionIdLay.hasOwnProperty(selectionId)) {
                                    totalLossBySelectionIdLay[selectionId] = 0;
                                }

                                // Add profit to the total for this selectionId
                                totalProfitBySelectionIdLay[selectionId] += loss;
                                totalLossBySelectionIdLay[selectionId] += profit;
                            });

                            // Calculate the net profit (profit - loss) for each selectionId
                            const netProfitBySelectionIdLay = {};
                            Object.keys(totalProfitBySelectionIdLay).forEach(selectionId => {
                                // Calculate total loss to other selectionIds
                                const totalLossToOtherSelections = Object.keys(totalLossBySelectionIdLay)
                                    .filter(otherSelectionId => otherSelectionId !== selectionId)
                                    .reduce((acc, otherSelectionId) => acc + totalLossBySelectionIdLay[otherSelectionId], 0);

                                const profit = totalProfitBySelectionIdLay[selectionId];
                                const loss = totalLossBySelectionIdLay[selectionId];

                                // Subtract total loss to other selectionIds from the profit
                                netProfitBySelectionIdLay[selectionId] = profit + totalLossToOtherSelections;
                            });


                            console.log("Total Profit by SelectionId Odd: ", netProfitBySelectionId)
                            console.log("Total Loss by SelectionId Odd: ", totalLossBySelectionId)
                            console.log("Total Profit by SelectionId Lay: ", totalProfitBySelectionIdLay);
                            console.log("Total Loss by SelectionId Lay: ", totalLossBySelectionIdLay);
                            console.log("Net Profit by SelectionId Lay: ", netProfitBySelectionIdLay);

                            // Assuming netProfitBySelectionId and netProfitBySelectionIdLay have the same selectionIds
                            const finalProfitMatchOdd = {};

                            Object.keys(netProfitBySelectionId).forEach(selectionId => {
                                // Sum the corresponding values for each selectionId
                                finalProfitMatchOdd[selectionId] = (netProfitBySelectionId[selectionId] || 0) + (netProfitBySelectionIdLay[selectionId] || 0);
                            });

                            console.log("Final Profit for Match Odd: ", finalProfitMatchOdd);

                            const negativeProfits = Object.values(finalProfitMatchOdd).filter(profit => profit < 0);

                            // If there are negative profits, find the maximum among them
                            if (negativeProfits.length > 0) {
                                const maxNegativeProfit = Math.min(...negativeProfits);
                                console.log("Maximum negative profit from finalProfitMatchOdd: ", maxNegativeProfit);

                                exposure += maxNegativeProfit;
                            } else {
                                console.log("No negative profits found in finalProfitMatchOdd.");
                            }

                            // For Book Maker

                            console.log("///////   Book Maker /////")
                            // For BACK !!!!!!!

                            const filtermatchOddsBM = event.data.filter(item => item.market == "BookMaker" && SBetsByRunnerBM.some(runner => runner.selectionId == item.selectionId) && item.type == "back")

                            const totalProfitBM = filtermatchOddsBM.reduce((sum, item) => sum + item.profit, 0);

                            console.log("Total Profit for back BookMaker : ", totalProfitBM);
                            const totalLossBM = filtermatchOddsBM.reduce((sum, item) => sum + item.liability, 0);

                            console.log("Total Loss for back BookMaker : ", totalLossBM);

                            console.log("Match Odd filter BookMaker : " + JSON.stringify(filtermatchOddsBM))

                            // For LAY !!!!!!

                            const filtermatchOddsLayBM = event.data.filter(item => item.market == "BookMaker" && SBetsByRunnerBM.some(runner => runner.selectionId == item.selectionId) && item.type == "lay")

                            const totalProfitLayBM = filtermatchOddsLayBM.reduce((sum, item) => sum + item.profit, 0);

                            console.log("Total Loss for Lay  BookMaker : ", totalProfitLayBM);
                            const totalLossLayBM = filtermatchOddsLayBM.reduce((sum, item) => sum + item.liability, 0);

                            console.log("Total Profit for Lay BookMaker : ", totalLossLayBM);

                            console.log("Match Odd filter for lay BookMaker : " + JSON.stringify(filtermatchOddsLayBM))

                            // NEXT TEAM For BACK /////////////

                            const filterODDBM = event.data.filter(item => {
                                // Check if the market is "Matchodds", type is "back", 
                                // and there is at least one matching selectionId in the odds array
                                return item.market === "BookMaker" &&
                                    item.type === "back" &&
                                    SBetsByRunnerBM.some(oddsitem => oddsitem.selectionId == item.selectionId);
                            });

                            console.log("filter ODD Next team BookMaker : ", filterODDBM)

                            // Get unique selectionIds from filterODDLay
                            const filterODDSelectionIdsBM = new Set(filterODDBM.map(item => item.selectionId));

                            console.log("Filter odd SelectionIds ssss BookMaker : ", filterODDSelectionIdsBM)

                            const filterOddAgainForOddBM = SBetsByRunnerBM.filter(item => !filterODDSelectionIdsBM.has(item.selectionId)
                                && filterODDBM.some(odds => odds.eventId == item.eventId));



                            console.log("Filter odd again for odd ssss BookMaker : ", filterOddAgainForOddBM)

                            // Add profit = 0 and loss = 0 to the items in filterOddAgain
                            const filterOddAgainWithProfitLossOddBM = filterOddAgainForOddBM.map(item => ({
                                ...item,
                                profit: 0,
                                liability: 0,
                            }));

                            console.log("Filter odd again for odd with profit loss ssss BookMaker : ", filterOddAgainWithProfitLossOddBM)
                            // Combine filterODDLay and filterOddAgainWithProfitLoss into a single array
                            const combinedArrayForOddBM = [...filterODDBM, ...filterOddAgainWithProfitLossOddBM];

                            console.log("Next Team for Odd BookMaker : " + JSON.stringify(combinedArrayForOddBM));
                            // Create an object to store total profit for each selectionId
                            const totalProfitBySelectionIdBM = {};
                            const totalLossBySelectionIdBM = {};

                            // Calculate net profit for each selectionId
                            combinedArrayForOddBM.forEach(item => {
                                const selectionId = item.selectionId;
                                const profit = item.profit;
                                const loss = item.liability;

                                // If selectionId is not in the object, add it
                                if (!totalProfitBySelectionIdBM.hasOwnProperty(selectionId)) {
                                    totalProfitBySelectionIdBM[selectionId] = 0;
                                }

                                // If selectionId is not in the object, add it
                                if (!totalLossBySelectionIdBM.hasOwnProperty(selectionId)) {
                                    totalLossBySelectionIdBM[selectionId] = 0;
                                }

                                // Add profit to the total for this selectionId
                                totalProfitBySelectionIdBM[selectionId] += profit;
                                totalLossBySelectionIdBM[selectionId] += loss;
                            });

                            // Calculate the net profit (profit - loss) for each selectionId
                            const netProfitBySelectionIdBM = {};
                            Object.keys(totalProfitBySelectionIdBM).forEach(selectionId => {
                                // Calculate total loss to other selectionIds
                                const totalLossToOtherSelectionsBM = Object.keys(totalLossBySelectionIdBM)
                                    .filter(otherSelectionId => otherSelectionId !== selectionId)
                                    .reduce((acc, otherSelectionId) => acc + totalLossBySelectionIdBM[otherSelectionId], 0);

                                const profit = totalProfitBySelectionIdBM[selectionId];
                                const loss = totalLossBySelectionIdBM[selectionId];

                                // Subtract total loss to other selectionIds from the profit
                                netProfitBySelectionIdBM[selectionId] = profit + totalLossToOtherSelectionsBM;
                            });


                            // Example usage:
                            console.log("Total Profit by SelectionId for Odd BookMaker: ", totalProfitBySelectionIdBM);
                            console.log("Total Loss by SelectionId for Odd BookMaker : ", totalLossBySelectionIdBM);
                            console.log("Net Profit by SelectionId for Odd  BookMaker : ", netProfitBySelectionIdBM);

                            // NEXT TEAM For LAY /////////////

                            const filterODDLayBM = event.data.filter(item => {
                                // Check if the market is "Matchodds", type is "back", 
                                // and there is at least one matching selectionId in the odds array
                                return item.market === "BookMaker" &&
                                    item.type === "lay" &&
                                    SBetsByRunnerBM.some(oddsitem => oddsitem.selectionId === item.selectionId);
                            });

                            console.log("filterODDLay fltered data BookMaker : ", filterODDLayBM)
                            // Get unique selectionIds from filterODDLay
                            const filterODDLaySelectionIdsBM = new Set(filterODDLayBM.map(item => item.selectionId));

                            // Filter items from odds based on selectionId not present in filterODDLay
                            const filterOddAgainBM = SBetsByRunnerBM.filter(item => !filterODDLaySelectionIdsBM.has(item.selectionId) && filterODDLayBM.some(odds => odds.eventId == item.eventId));

                            // Add profit = 0 and loss = 0 to the items in filterOddAgain
                            const filterOddAgainWithProfitLossBM = filterOddAgainBM.map(item => ({
                                ...item,
                                profit: 0,
                                liability: 0,
                            }));

                            console.log("filter odd Again BookMaker : " + JSON.stringify(filterOddAgainWithProfitLossBM));

                            console.log("Next Team for Lay BookMaker : " + JSON.stringify(filterODDLayBM));

                            console.log("Odds item BookMaker : " + JSON.stringify(SBetsByRunnerBM.length))

                            // Combine filterODDLay and filterOddAgainWithProfitLoss into a single array
                            const combinedArrayBM = [...filterODDLayBM, ...filterOddAgainWithProfitLossBM];

                            console.log("Combined Both Array BookMaker : " + JSON.stringify(combinedArrayBM));

                            // Create an object to store total profit for each selectionId
                            const totalProfitBySelectionIdLayBM = {};
                            const totalLossBySelectionIdLayBM = {};

                            // Calculate net profit for each selectionId
                            combinedArrayBM.forEach(item => {
                                const selectionId = item.selectionId;
                                const profit = item.profit;
                                const loss = item.liability;

                                // If selectionId is not in the object, add it
                                if (!totalProfitBySelectionIdLayBM.hasOwnProperty(selectionId)) {
                                    totalProfitBySelectionIdLayBM[selectionId] = 0;
                                }

                                // If selectionId is not in the object, add it
                                if (!totalLossBySelectionIdLayBM.hasOwnProperty(selectionId)) {
                                    totalLossBySelectionIdLayBM[selectionId] = 0;
                                }

                                // Add profit to the total for this selectionId
                                totalProfitBySelectionIdLayBM[selectionId] += loss;
                                totalLossBySelectionIdLayBM[selectionId] += profit;
                            });

                            // Calculate the net profit (profit - loss) for each selectionId
                            const netProfitBySelectionIdLayBM = {};
                            Object.keys(totalProfitBySelectionIdLayBM).forEach(selectionId => {
                                // Calculate total loss to other selectionIds
                                const totalLossToOtherSelectionsBM = Object.keys(totalLossBySelectionIdLayBM)
                                    .filter(otherSelectionId => otherSelectionId !== selectionId)
                                    .reduce((acc, otherSelectionId) => acc + totalLossBySelectionIdLayBM[otherSelectionId], 0);

                                const profit = totalProfitBySelectionIdLayBM[selectionId];
                                const loss = totalLossBySelectionIdLayBM[selectionId];

                                // Subtract total loss to other selectionIds from the profit
                                netProfitBySelectionIdLayBM[selectionId] = profit + totalLossToOtherSelectionsBM;
                            });


                            console.log("Total Profit by SelectionId Odd BookMaker : ", netProfitBySelectionIdBM)
                            console.log("Total Loss by SelectionId Odd BookMaker : ", totalLossBySelectionIdBM)
                            console.log("Total Profit by SelectionId Lay BookMaker : ", totalProfitBySelectionIdLayBM);
                            console.log("Total Loss by SelectionId Lay BookMaker : ", totalLossBySelectionIdLayBM);
                            console.log("Net Profit by SelectionId Lay BookMaker : ", netProfitBySelectionIdLayBM);

                            // Assuming netProfitBySelectionId and netProfitBySelectionIdLay have the same selectionIds
                            const finalProfitMatchOddBM = {};

                            Object.keys(netProfitBySelectionIdBM).forEach(selectionId => {
                                // Sum the corresponding values for each selectionId
                                finalProfitMatchOddBM[selectionId] = (netProfitBySelectionIdBM[selectionId] || 0) + (netProfitBySelectionIdLayBM[selectionId] || 0);
                            });

                            console.log("Final Profit for Book Maker: ", finalProfitMatchOddBM);

                            const negativeProfitsBM = Object.values(finalProfitMatchOddBM).filter(profit => profit < 0);

                            // If there are negative profits, find the maximum among them
                            if (negativeProfitsBM.length > 0) {
                                const maxNegativeProfit = Math.min(...negativeProfitsBM);
                                console.log("Maximum negative profit from finalProfitMatchOddBM BookMaker : ", maxNegativeProfit);
                                exposure += maxNegativeProfit;
                            } else {
                                console.log("No negative profits found in finalProfitMatchOddBM BookMaker.");
                            }

                            //  FOR Fancy ///////
                            console.log("//// Fancy ///")

                            const filterFancy = event.data.filter(item => item.market == 'Fancy')

                            console.log("filter fancy data : ", filterFancy)

                            console.log(" Filter fancy liability : ", filterFancy.liability)

                            const totalLiabilityFancy = filterFancy.reduce((sum, item) => sum + item.liability, 0);

                            console.log("total Liabality of facny  : ", totalLiabilityFancy)

                            exposure += totalLiabilityFancy;



                        });
                        console.log("Final Exposure of MO & BM & Fancy : ", exposure + " Id " + item.Id)

                        exposureArr.push({ userId: item.Id, exposure: exposure })

                        // setUserExposure(exposure) 
                        // console.log("Balance Api Balance is : ", apiBalance)
                        // const calcBalance = apiBalance + exposure
                        // setuserBalance(calcBalance)
                        // Log exposureArr after all fetch requests have completed
                        // console.log("Exposure Array : ", exposureArr);

                    } else {
                        console.log("Error in fetching Bets exposure api in Header ");
                    }
                } catch (error) {
                    console.error('Error fetching exposure data:', error);
                }

            });

            // Wait for all promises to resolve
            await Promise.all(promises);

            // Log exposureArr after all fetch requests have completed
            console.log("Exposure Array outside  : ", exposureArr);

            // Map over the data array and add exposure to each element if its Id matches any userId in exposureArr
            const addExpo = data.map(item => {
                // Find the exposure where userId matches Id
                const matchedExposure = exposureArr.find(exp => exp.userId === item.Id);
                // Add the matched exposure to the item
                return { ...item, exposure: matchedExposure ? matchedExposure.exposure : 0 };
            });

            console.log("Add exposure of every data state array element whose Id is == to exposureArr of userId: ", addExpo);

            setAllData(addExpo)

        } catch (error) {
            console.error('Error fetching bets exposure api', error);
        } finally {
            // Set loading state back to false after the request is completed
            setIsLoading(false);
        }
    };


    const handlePerPageChange = (e) => {
        setPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to the first page when changing items per page
    };


    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = allData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(allData.length / perPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const handleClick = (pageNumber) => {
        if (pageNumber < 1) {
            // If the requested page number is less than 1, set currentPage to 1
            setCurrentPage(1);
        } else {
            setCurrentPage(pageNumber);
        }
    };

    const changeChildPassWord = async () => {

        console.log("change password UserID is : ", changePassUser)
        try {
            // Validate that new password and retype password match
            if (newPassword !== retypePassword || retypePassword == '') {
                setPasswordError('New Passwords does not match.');
                return;
            } else {
                setPasswordError('');
            }
            console.log("New Password : " + newPassword)
            console.log("Confirm Password : " + retypePassword)


            const response = await fetch('https://api.s2bet.in/changeChildPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserId: changePassUser,
                    NewPassword: newPassword,
                }),
            });

            const result = await response.json();

            if (result.isSuccess == true) {
                // Password changed successfully
                // You may want to redirect the user or show a success message
                console.log('Password changed successfully');
                setChangePassUser('')
                setNewPassword('')
                setRetypePassword('')
                // Trigger click event to close modal
                const close = document.getElementById('change_pass1');
                close.setAttribute('data-dismiss', 'modal');
                close.click();

                Swal.fire({
                    position: "top-end",
                    icon: "Update Successful",
                    title: "Password Change Successful",
                    showConfirmButton: false,
                    timer: 1500
                })

                // Remove the data-dismiss attribute after the button click
                close.removeAttribute('data-dismiss');
            } else {
                // setPasswordError(result.message);
                setChangePassUser('')
                setNewPassword('')
                setRetypePassword('')
                // Trigger click event to close modal
                const close = document.getElementById('change_pass1');
                close.setAttribute('data-dismiss', 'modal');
                close.click();
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                // Remove the data-dismiss attribute after the button click
                close.removeAttribute('data-dismiss');
            }
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };



    return (
        <>
            {/* <div className="nav-md"> */}
            {isLoading && <div className="spinner" id="loader-1" style={{ display: 'block' }}></div>}
            <div className="container body">

                <Header />
                <div className="right_col" role="main" style={{ minHeight: 357 }}>
                    <div className="loader" style={{ display: "none" }} />
                    <div className="col-md-12">
                        <div className="title_new_at">
                            <span className="lable-user-name" id="header">
                                Master Listing
                            </span>
                            <select
                                id="pages"
                                className="user-select"
                                style={{ color: "black", fontSize: 13 }}
                                onChange={handlePerPageChange}
                                value={perPage}
                            >
                                <option value={10} selected="selected">10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <div className="usersech user-mobile">
                                <input
                                    type="search"
                                    name="mstruserid"
                                    id="myInput"
                                    placeholder="Search here"
                                    defaultValue=""
                                />
                                <button
                                    className="fa fa-search"
                                    id="submit_form_button"
                                    onclick="searchList()"
                                    data-attr="submit"
                                    aria-hidden="true"
                                />
                            </div>
                            <select
                                className="user-mobile custom-user-select"
                                id="useraction"
                                style={{ color: "black", fontSize: 13 }}
                                onChange={handleSelectChange}

                            >
                                <option value="default">Select Action</option>
                                <option value="betlock">Lock Betting</option>
                                <option value="betunlock">Open Betting</option>
                                <option value="lock">Lock User</option>
                                <option value="unlock">Unlock User</option>
                                <option value="closeUser">Close User Account</option>
                            </select>
                            <button
                                onClick={updateUser}
                                className="btn btn-warning btn-xs"
                                style={{ padding: "4px 5px" }}
                            >
                                ACTION
                            </button>
                            <button
                                id="addDUser"
                                className="btn btn-warning btn-xs"
                                style={{ padding: "4px 5px", display: roleId > (Number(LoggedInroleId) + 1) || Id > 0 ? "none" : "block" }}
                                data-toggle="modal"
                                data-target="#userModal"
                            >
                                ADD USER
                            </button>
                            <button
                                className="btn btn-warning btn-xs"
                                id="backbutton"
                                style={{ padding: "4px 5px", display: "none" }}
                                onclick="javascript:history.go(-1)"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                    <div className="">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div id="divLoading" />
                            <div className="" id="restable">
                                <table className="table table-striped jambo_table bulk_action" id="sst">
                                    <thead>
                                        <tr className="headings">
                                            <th className="darkpurplecolor">S.No.</th>
                                            <th className="lightgreencolor">User ID</th>
                                            <th className="darkpurplecolor">User Name</th>
                                            {/* <th className="darkpurplecolor">Website</th> */}
                                            <th className="lightgreencolor">Parent</th>
                                            <th className="darkpurplecolor" style={{ display: roleId == 7 && Id != 0 || roleId == 8 && Id == 0 ? "table-cell" : "none" }}>Master</th>
                                            <th className="lightgreencolor" style={{ display: roleId == 7 && Id != 0 || roleId == 8 && Id == 0 ? "table-cell" : "none" }}>Winnings</th>
                                            <th className="darkpurplecolor" style={{ display: roleId == 7 && Id != 0 || roleId == 8 && Id == 0 ? "table-cell" : "none" }}>Credit Limit</th>
                                            <th className="lightgreencolor" style={{ display: roleId != 8 && Id == 0 || roleId != 7 && Id != 0 ? "table-cell" : "none" }}>Credit given</th>
                                            <th className="lightgreencolor" style={{ display: roleId == 7 && Id != 0 || roleId == 8 && Id == 0 ? "table-cell" : "none" }}>Exposer</th>
                                            <th className="darkpurplecolor">Balance</th>
                                            <th className="lightgreencolor">Acc. Lock</th>
                                            <th className="darkpurplecolor">Bet Lock</th>
                                            <th className="lightgreencolor" style={{ display: roleId != 8 && Id == 0 || roleId != 7 && Id != 0 ? "table-cell" : "none" }}>Partnership</th>
                                            <th className="darkpurplecolor" style={{ display: roleId != 8 && Id == 0 || roleId != 7 && Id != 0 ? "table-cell" : "none" }}>Partnership Casino</th>
                                            <th className="lightgreencolor" style={{ display: roleId != 8 && Id == 0 || roleId != 7 && Id != 0 ? "table-cell" : "none" }}>Partnership TeenPatti</th>
                                            <th className="darkpurplecolor">M.comm</th>
                                            <th className="lightgreencolor">S.comm</th>
                                            <th className="darkpurplecolor">Depo. / With.</th>
                                            <th className="lightgreencolor">View More</th>
                                        </tr>
                                    </thead>
                                    <tbody id="ssttable">
                                        {currentItems.map((item, index) => (

                                            <tr key={item.id}>
                                                <td>
                                                    {(currentPage - 1) * perPage + index + 1}{" "}
                                                    <input
                                                        type="checkbox"
                                                        onClick={() => addUserName(item.Id, item.RoleId)}
                                                        defaultValue="aja"
                                                        className="select-users"
                                                    />
                                                </td>
                                                <td className="" style={{ paddingBottom: 0 }}>
                                                    <span className="m-bg">
                                                        {roleId == 8 && Id == 0 || roleId == 7 && Id != 0 ? <a>
                                                            {item.UserName}
                                                        </a> : <a href="#" title="View Child" onClick={(e) => {
                                                            e.preventDefault();
                                                            handleChild(item.RoleId, item.Id);
                                                        }}>
                                                            {item.UserName}
                                                        </a>}

                                                    </span>
                                                </td>
                                                <td className=" ">{item.FullName}</td>
                                                {/* <td>4bets.in</td> */}
                                                <td>{item.ParentName}</td>
                                                <td style={{ display: roleId == 7 && Id != 0 || roleId == 8 && Id == 0 ? "table-cell" : "none" }}></td>
                                                <td style={{ display: roleId == 7 && Id != 0 || roleId == 8 && Id == 0 ? "table-cell" : "none" }}></td>
                                                <td style={{ display: roleId == 7 && Id != 0 || roleId == 8 && Id == 0 ? "table-cell" : "none" }}>0.00</td>
                                                <td style={{ display: roleId != 8 && Id == 0 || roleId != 7 && Id != 0 ? "table-cell" : "none" }}>0.00</td>
                                                <td className=" " style={{ display: roleId == 7 && Id != 0 || roleId == 8 && Id == 0 ? "table-cell" : "none" }}><a className="btn btn-success btn-xs" style={{ width: "85px" }}> {item.exposure}</a></td>
                                                <td className=" ">
                                                    {item.RoleId !== 8
                                                        ? (item.ResultAmountU != null ? item.ResultAmountU : 0)
                                                        : ((item.ResultAmountU != null ? item.ResultAmountU : 0) +
                                                            (item.UserPL != null ? item.UserPL : 0) +
                                                            item.exposure)}
                                                </td>
                                                <td>{item.LockUser == 0 && item.LockUserParent == 0 ? "No" : "Yes"}</td>
                                                <td>{item.LockBetting == 0 && item.LockBettingParent == 0 ? "No" : "Yes"}</td>
                                                <td className=" " style={{ display: roleId != 8 && Id == 0 || roleId != 7 && Id != 0 ? "table-cell" : "none" }}>{item.Partnership}%</td>
                                                <td className=" " style={{ display: roleId != 8 && Id == 0 || roleId != 7 && Id != 0 ? "table-cell" : "none" }}>{item.PartnershipCasino}%</td>
                                                <td className=" " style={{ display: roleId != 8 && Id == 0 || roleId != 7 && Id != 0 ? "table-cell" : "none" }}>{item.PartnershipTeenPatti}%</td>
                                                <td className=" ">{item.MCommission}%</td>
                                                <td className=" ">{item.SCommission}%</td>
                                                <td className=" ">
                                                    <a
                                                        style={{ display: "inline" }}
                                                        className="btn btn-warning btn-xs"
                                                        href=""
                                                        data-toggle="modal"
                                                        data-target="#depositchippopup"
                                                        title="Chip In Out"
                                                        onClick={(e) => { e.preventDefault(); handleDW(item.Id, item.UserName, item.ParentId) }}
                                                    >
                                                        <span>D</span>
                                                    </a>
                                                    <a
                                                        style={{ display: "inline" }}
                                                        className="btn btn-warning btn-xs"
                                                        href=""
                                                        data-toggle="modal"
                                                        title="Chip In Out"
                                                        data-target="#withdrawlchippopup"
                                                        onClick={(e) => { e.preventDefault(); handleDW(item.Id, item.UserName, item.ParentId) }}
                                                    >
                                                        <span>W</span>
                                                    </a>
                                                </td>
                                                <td className="last">
                                                    <span className="dropdown">
                                                        <a
                                                            href="#"
                                                            className="dropdown-toggle btn btn-xs btn-success"
                                                            data-toggle="dropdown"
                                                            role="button"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            View More <span className="caret" />
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a
                                                                    className=""
                                                                    href=""
                                                                    data-toggle="modal"
                                                                    data-target="#userModal2"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        addSubChild(e, item.RoleId, item.Id, item.UserName);
                                                                    }}
                                                                >
                                                                    <span>Add User</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                {" "}
                                                                {/* <a className="" onClick={(e) => { e.preventDefault(); handleStatement(item.Id) }}>
                                                                        <span>Statement</span>{" "}
                                                                    </a> */}
                                                                <Link to='/statementByUser' state={{ userId: item.Id, roleId: item.RoleId, userName: item.UserName }}><span>Statement</span></Link>
                                                            </li>
                                                            <li>
                                                                {" "}
                                                                <a className="" href={`/loginReport/${item.Id}`}>
                                                                    <span>Login Report</span>{" "}
                                                                </a>
                                                            </li>
                                                            <li>
                                                                {/* <a
                                                                        className=""
                                                                        href="/downlineprofitloss/aja/10/1/0/0/All"
                                                                    >
                                                                        <span>Profit Loss</span>{" "}
                                                                    </a> */}
                                                                <Link to='/downlineProfitLoss' state={{ userId: item.Id }}><span>Profit Loss</span></Link>
                                                            </li>
                                                            {/* <li>
                                                                    <a
                                                                        className=""
                                                                        href=""
                                                                        data-toggle="modal"
                                                                        data-target="#userinfoModal"
                                                                        onclick="getInfo('1')"
                                                                        title="View Account Info"
                                                                    >
                                                                        <span>View Info</span>
                                                                    </a>
                                                                </li> */}
                                                            {/* <li>
                                                                    <a
                                                                        className=""
                                                                        href=""
                                                                        data-toggle="modal"
                                                                        data-target="#userpartnershipModal"
                                                                        onclick="getParentDetails('658f02294c06135bb26f89f5','2')"
                                                                        title="Partnership"
                                                                    >
                                                                        <span>Partnerhsip</span>
                                                                    </a>
                                                                </li> */}
                                                            <li>
                                                                {" "}
                                                                <a
                                                                    className=""
                                                                    data-toggle="modal"
                                                                    data-target="#cngpwd"
                                                                    href=""
                                                                    title="Change Password"
                                                                    onClick={(e) => { e.preventDefault(); setChangePassUser(item.Id) }}
                                                                >
                                                                    <span>Change Password</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                {" "}
                                                                <a
                                                                    className=""
                                                                    href=""
                                                                    data-toggle="modal"
                                                                    data-target="#depositchippopup"
                                                                    title="Chip In Out"
                                                                    onClick={(e) => { e.preventDefault(); handleDW(item.Id, item.UserName, item.ParentId) }}
                                                                >
                                                                    <span>Chip Deposit</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className=""
                                                                    href=""
                                                                    data-toggle="modal"
                                                                    data-target="#withdrawlchippopup"
                                                                    onClick={(e) => { e.preventDefault(); handleDW(item.Id, item.UserName, item.ParentId) }}
                                                                >
                                                                    <span>Chip Withdrawal</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <table
                                    className="table table-striped jambo_table bulk_action"
                                    id="usr"
                                    style={{ display: "none" }}
                                >
                                    <thead>
                                        <tr className="headings">
                                            <th className="darkpurplecolor">S.No.</th>
                                            <th className="lightgreencolor">User ID</th>
                                            <th className="lightgreencolor">User Name</th>
                                            <th className="darkpurplecolor">Website</th>
                                            <th className="lightgreencolor">Parent</th>
                                            <th className="darkpurplecolor">Master</th>
                                            <th className="lightgreencolor">Winnings</th>
                                            <th className="darkpurplecolor">Credit Limits </th>
                                            <th className="lightgreencolor">Exposure </th>
                                            <th className="darkpurplecolor">Balance</th>
                                            <th className="lightgreencolor">Acc. Lock</th>
                                            <th className="darkpurplecolor">Bet Lock</th>
                                            <th className="lightgreencolor">M.comm</th>
                                            <th className="darkpurplecolor">S.comm</th>
                                            <th className="lightgreencolor">Depo. / With.</th>
                                            <th className="darkpurplecolor">View More</th>
                                        </tr>
                                    </thead>
                                    <tbody id="usetable" />
                                </table>
                            </div>
                            <div className="dataTables_wrapper no-footer">
                                <div
                                    className="dataTables_info"
                                    id="datatable_info"
                                    role="status"
                                    aria-live="polite"
                                >
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, allData.length)} of {allData.length} Entries
                                </div>
                                <div className="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
                                    <a
                                        className={`paginate_button previous ${currentPage === 1 ? 'disabled' : ''}`}
                                        onClick={() => handleClick(currentPage - 1)}
                                        aria-controls="datatable"
                                        data-dt-idx={0}
                                        tabIndex={0}
                                        id="datatable_previous"
                                    >
                                        Previous
                                    </a>
                                    {pageNumbers.map((pageNumber) => (
                                        <a
                                            key={pageNumber}
                                            className={`paginate_button ${currentPage === pageNumber ? 'current' : ''}`}
                                            onClick={() => handleClick(pageNumber)}
                                            aria-controls="datatable"
                                            data-dt-idx={pageNumber}
                                            tabIndex={0}
                                        >
                                            {pageNumber}
                                        </a>
                                    ))}
                                    <a
                                        className={`paginate_button next ${currentPage === totalPages ? 'disabled' : ''}`}
                                        onClick={() => handleClick(currentPage + 1)}
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
                <footer>
                    <div className="pull-right" />
                    <div className="clearfix" />
                </footer>
            </div>
            <Footer />

            <div
                id="cngpwd"
                className="modal fade"
                data-backdrop="static"
                data-keyboard="false"
                role="dialog"
                style={{ display: "none" }}
            >
                {/* Change Password */}
                <div className=" " id="changeUserPassword" role="main">
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
                                    <span id="passerror" style={{ color: "red" }}>{passwordError}</span>                                    </div>
                                <div className="">
                                    <form id="" method="post" autoComplete="off" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
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
                                                onClick={changeChildPassWord}
                                                className="blue_button"
                                                id="change_pass1"
                                                style={{ marginRight: "2px" }}
                                            >
                                                Change
                                            </button>
                                            <button
                                                data-dismiss="modal"
                                                type="button"
                                                className="blue_button"
                                                style={{ display: "inline-block" }}
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

            <div
                id="withdrawlchippopup"
                className="modal fade"
                data-backdrop="static"
                data-keyboard="false"
                role="dialog"
                style={{ display: "none" }}
            >
                {/* Change Password */}
                <div className=" " id="" role="main">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            {/* dialog body */}
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" onClick={() => {
                                    setNewParentBal(0)
                                    setNewUserBal(0)
                                    setChipAmount("")
                                    document.getElementById("ChipsValue_w").value = ""
                                    document.getElementById("ChipsN_w").innerText = ""
                                }}>
                                    ×
                                </button>
                                <h4 className="modal-title">
                                    <span id="title_w">Free Chips In/Out of {dwUserName}</span>{" "}
                                </h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div id="UpdateChipsMsg" />
                                    <form id="UpdateFreeChips" method="post" onSubmit={(e) => handleWithdrawl(e)}>
                                        <div className="col-md-6 col-xs-12">
                                            <input type="hidden" id="pname_w" />
                                            <label> Chips : </label>
                                            <input
                                                type="number"
                                                name="Chips"
                                                onkeypress="return isNumberKey(event)"
                                                onKeyUp={calWithdraw}
                                                className="form-control"
                                                id="ChipsValue_w"
                                                required=""
                                            />
                                            <span
                                                id="ChipsN_w"
                                                style={{ color: "red" }}
                                                className="errmsg"
                                            />
                                        </div>
                                        <div className="col-md-12 col-xs-12">
                                            <div className="tabel_content ">
                                                <table className="table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>Parent Chips</td>
                                                            <td className="font-bold" id="pbalw" style={{ color: parentBal == null || parentBal < 0 ? 'red' : '' }}>
                                                                {parentBal != null ? parentBal : 0}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>User Balance </td>
                                                            <td className="font-bold" id="ubalw" style={{ color: userBal == null || userBal < 0 ? 'red' : '' }}>
                                                                {userBal != null ? userBal : 0}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Parent New Chips</td>
                                                            <td>
                                                                <span id="ParantNewFreeChips_w" style={{ color: newParentBal == null || newParentBal < 0 ? 'red' : '' }}>{newParentBal}</span>{" "}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>User New Chips</td>
                                                            <td>
                                                                <span id="myNewFreeChips_w" style={{ color: newUserBal == null || newUserBal < 0 ? 'red' : '' }}>{newUserBal != null ? newUserBal : 0}</span>{" "}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-md-12 modal-footer">
                                            <input
                                                type="hidden"
                                                className="form-control"
                                                id="action"
                                                defaultValue="W"
                                            />
                                            <input
                                                type="hidden"
                                                className="form-control"
                                                id="FreeChip"
                                                defaultValue={200000.0}
                                            />
                                            <button
                                                type="submit"
                                                className="red_button pull-right chip-inout-button"
                                                id="withdrawChips"
                                                style={{ background: "red", borderColor: "red" }}
                                            >
                                                withdrawal
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/* dialog buttons */}
                        </div>
                    </div>
                </div>
            </div>
            <div
                id="depositchippopup"
                className="modal fade in"
                data-backdrop="static"
                data-keyboard="false"
                role="dialog"
                style={{ display: "none" }}
            >
                {/* Change Password */}
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* dialog body */}
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" onClick={() => {
                                setNewParentBal(0)
                                setNewUserBal(0)
                                setChipAmount("")
                                document.getElementById("ChipsValue_d").value = ""
                                document.getElementById("ChipsN_d").innerText = ""
                            }}>
                                ×
                            </button>
                            <h4 className="modal-title">
                                <span id="title_d">Free Chips In/Out of {dwUserName}</span>{" "}
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div id="UpdateChipsMsg" />
                                <form id="UpdateFreeChips" method="post" onSubmit={handleDeposit}>
                                    <div className="col-md-6 col-xs-12">
                                        <input type="hidden" id="pname_d" />
                                        <label> Chips : </label>
                                        <input
                                            type="number"
                                            onkeypress="return isNumberKey(event)"
                                            name="Chips"
                                            value={chipAmount}
                                            onChange={(e) => calDeposit(e.target.value)}
                                            className="form-control"
                                            id="ChipsValue_d"
                                            required=""
                                        />
                                        <span
                                            id="ChipsN_d"
                                            style={{ color: "red" }}
                                            className="errmsg"
                                        />
                                    </div>
                                    <div className="col-md-12 col-xs-12">
                                        <div className="tabel_content ">
                                            <table className="table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>Parent Chips</td>
                                                        <td className="font-bold" id="pbald" style={{ color: parentBal == null || parentBal < 0 ? 'red' : '' }}>
                                                            {parentBal != null ? parentBal : 0}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>User Balance </td>
                                                        <td className="font-bold" id="ubald" style={{ color: userBal == null || userBal < 0 ? 'red' : '' }}>
                                                            {userBal != null ? userBal : 0}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parent New Chips</td>
                                                        <td>
                                                            <span id="ParantNewFreeChips" style={{ color: newParentBal == null || newParentBal < 0 ? 'red' : '' }}>{newParentBal}</span> {" "}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>User New Chips</td>
                                                        <td>
                                                            <span id="myNewFreeChips" style={{ color: newUserBal == null || newUserBal < 0 ? 'red' : '' }}> {newUserBal != null ? newUserBal : 0}</span>{" "}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-12 modal-footer">
                                        <input
                                            type="hidden"
                                            className="form-control"
                                            id="action"
                                            defaultValue="D"
                                        />
                                        <input
                                            type="hidden"
                                            className="form-control"
                                            id="FreeChip"
                                            defaultValue={200000.0}
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-success pull-right chip-inout-button"
                                            id="depositChips"
                                        >
                                            {/* onclick="save_admin();" */}Deposit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* dialog buttons */}
                    </div>
                </div>
            </div>
            <div
                id="userModal"
                className="modal fade in"
                data-backdrop="static"
                data-keyboard="false"
                role="dialog"
                style={{ display: "none" }}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form id="" method="post" onSubmit={handleSubmit}>
                            <div className="popup_form">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">
                                        ×
                                    </button>
                                    <h4 className="modal-title">
                                        <span id="create_title">Add Child</span>
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <span
                                        id="error_msg"
                                        style={{ color: "red" }}
                                        className="errMsg pay-error"
                                    />
                                    <div className="row">
                                        <div
                                            className="col-md-4 col-xs-6"
                                            id="websdiv"
                                            style={{ display: "none", height: 65 }}
                                        >
                                            <label id="weblable"> Website Name</label>
                                            <select
                                                id="webs"
                                                className="user-select"
                                                style={{ color: "black" }}
                                            >
                                                <option value={-1}>Select Website</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-xs-6" style={{ height: 65 }}>
                                            <label> Name</label>
                                            <input
                                                type="text"
                                                name="master_name"
                                                className="form-control"
                                                defaultValue=""
                                                onkeyup="removeSpecial('left_master_name')"
                                                id="left_master_name"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="col-md-4 col-xs-6" style={{ height: 65 }}>
                                            <label> Registration Data </label>
                                            <input
                                                type="text"
                                                name="FromDate"
                                                className="form-control"
                                                id="reg_date"
                                                autoComplete="off"
                                                defaultValue={Moment(new Date()).format('DD/MM/YYYY')}
                                                readOnly="true"
                                            />
                                        </div>
                                        <div className="col-md-4 col-xs-6" style={{ height: 65 }}>
                                            <label>
                                                {" "}
                                                User ID{" "}
                                                <span
                                                    style={{
                                                        display: "inline",
                                                        fontSize: 12,
                                                        color: "green"
                                                    }}
                                                    id="error_id"
                                                />
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                className="form-control"
                                                defaultValue=""
                                                id="left_userid"
                                                // onKeyUp={removeSpecialChar}
                                                onChange={handleBlur}
                                            />
                                        </div>
                                        <div className="col-md-4 col-xs-6" style={{ height: 65 }}>
                                            <label> Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                defaultValue=""
                                                id="left_password"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div
                                            className="col-md-4 col-xs-6"
                                            id="div_mcom"
                                            style={{ height: 65 }}
                                        >
                                            <label> Match Commission (Max 2 %)</label>
                                            <input
                                                type="number"
                                                name="commission"
                                                className="form-control"
                                                min={0}
                                                oninput="this.value = Math.abs(this.value)"
                                                defaultValue={0}
                                                onkeyup="validateMatchCommission()"
                                                id="left_mcomm"
                                                autoComplete="off"
                                                readOnly="true"
                                            />
                                        </div>
                                        <div
                                            className="col-md-4 col-xs-6"
                                            id="part_div"
                                            style={{ height: 65 }}
                                        >
                                            <label id="part_par_m">Partnership [0]</label>
                                            <input
                                                type="number"
                                                name="partner"
                                                className="form-control"
                                                min={0}
                                                oninput="this.value = Math.abs(this.value)"
                                                defaultValue={0}
                                                id="parent_part"
                                                onkeyup="validateMatchPartnership()"
                                                max={100}
                                                autoComplete="off"
                                                readOnly="true"
                                            />
                                        </div>
                                        <div
                                            className="col-md-4 col-xs-6"
                                            id="partC_div"
                                            style={{ height: 65 }}
                                        >
                                            <label id="part_par_c">Partnership Casino [0]</label>
                                            <input
                                                type="number"
                                                name="partnershipCasino"
                                                min={0}
                                                oninput="this.value = Math.abs(this.value)"
                                                className="form-control"
                                                defaultValue={0}
                                                id="parent_casino_part"
                                                onkeyup="validateCasinoPartnership()"
                                                max={100}
                                                autoComplete="off"
                                                readOnly="true"
                                            />
                                        </div>
                                        <div
                                            className="col-md-4 col-xs-6"
                                            id="partT_div"
                                            style={{ height: 65 }}
                                        >
                                            <label id="part_par_t" style={{ fontSize: 12 }}>
                                                Partnership TeenPatti [0]
                                            </label>
                                            <input
                                                type="number"
                                                name="partnershipLiveTennPatti"
                                                min={0}
                                                oninput="this.value = Math.abs(this.value)"
                                                defaultValue={0}
                                                id="parent_3patti_part"
                                                onkeyup="validateTeenPattiPartnership()"
                                                className="form-control"
                                                max={100}
                                                autoComplete="off"
                                                readOnly="true"
                                            />
                                        </div>
                                        <div className="col-md-12 col-xs-12 modal-footer">
                                            <button
                                                type="submit"
                                                className="blue_button"
                                                id="addUser"
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
                id="userModal2"
                className="modal fade in"
                data-backdrop="static"
                data-keyboard="false"
                role="dialog"
                style={{ display: "none" }}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form id="" method="post" onSubmit={handleSubmit2}>
                            <div className="popup_form">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">
                                        ×
                                    </button>
                                    <h4 className="modal-title">
                                        <span id="create_title">Add Child</span>
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <span
                                        id="error_msg2"
                                        style={{ color: "red" }}
                                        className="errMsg pay-error"
                                    />
                                    <div className="row">
                                        <div
                                            className="col-md-4 col-xs-6"
                                            id="websdiv"
                                            style={{ display: "none", height: 65 }}
                                        >
                                            <label id="weblable"> Website Name</label>
                                            <select
                                                id="webs"
                                                className="user-select"
                                                style={{ color: "black" }}
                                            >
                                                <option value={-1}>Select Website</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-xs-6" style={{ height: 65 }}>
                                            <label> Name</label>
                                            <input
                                                type="text"
                                                name="master_name"
                                                className="form-control"
                                                defaultValue=""
                                                onkeyup="removeSpecial('left_master_name')"
                                                id="left_master_name2"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="col-md-4 col-xs-6" style={{ height: 65 }}>
                                            <label> Registration Data </label>
                                            <input
                                                type="text"
                                                name="FromDate"
                                                className="form-control"
                                                id="reg_date"
                                                autoComplete="off"
                                                defaultValue={Moment(new Date()).format('DD/MM/YYYY')}
                                                readOnly="true"
                                            />
                                        </div>
                                        <div className="col-md-4 col-xs-6" style={{ height: 65 }}>
                                            <label>
                                                {" "}
                                                User ID{" "}
                                                <span
                                                    style={{
                                                        display: "inline",
                                                        fontSize: 12,
                                                        color: "green"
                                                    }}
                                                    id="error_id2"
                                                />
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                className="form-control"
                                                defaultValue=""
                                                id="left_userid2"
                                                // onKeyUp={removeSpecialChar}
                                                onChange={handleBlur2}
                                            />
                                        </div>
                                        <div className="col-md-4 col-xs-6" style={{ height: 65 }}>
                                            <label> Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                defaultValue=""
                                                id="left_password2"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div
                                            className="col-md-4 col-xs-6"
                                            id="div_mcom"
                                            style={{ display: "none", height: 65 }}
                                        >
                                            <label> Match Commission (Max 2 %)</label>
                                            <input
                                                type="number"
                                                name="commission"
                                                className="form-control"
                                                min={0}
                                                oninput="this.value = Math.abs(this.value)"
                                                defaultValue={0}
                                                onkeyup="validateMatchCommission()"
                                                id="left_mcomm2"
                                                autoComplete="off"
                                                readOnly="true"
                                            />
                                        </div>
                                        <div
                                            className="col-md-4 col-xs-6"
                                            id="part_div"
                                            style={{ height: 65 }}
                                        >
                                            <label id="part_par_m">Partnership [0]</label>
                                            <input
                                                type="number"
                                                name="partner"
                                                className="form-control"
                                                min={0}
                                                oninput="this.value = Math.abs(this.value)"
                                                defaultValue={0}
                                                id="parent_part2"
                                                onkeyup="validateMatchPartnership()"
                                                max={100}
                                                autoComplete="off"
                                                readOnly="true"
                                            />
                                        </div>
                                        <div
                                            className="col-md-4 col-xs-6"
                                            id="partC_div"
                                            style={{ height: 65 }}
                                        >
                                            <label id="part_par_c">Partnership Casino [0]</label>
                                            <input
                                                type="number"
                                                name="partnershipCasino"
                                                min={0}
                                                oninput="this.value = Math.abs(this.value)"
                                                className="form-control"
                                                defaultValue={0}
                                                id="parent_casino_part2"
                                                onkeyup="validateCasinoPartnership()"
                                                max={100}
                                                autoComplete="off"
                                                readOnly="true"
                                            />
                                        </div>
                                        <div
                                            className="col-md-4 col-xs-6"
                                            id="partT_div"
                                            style={{ height: 65 }}
                                        >
                                            <label id="part_par_t" style={{ fontSize: 12 }}>
                                                Partnership TeenPatti [0]
                                            </label>
                                            <input
                                                type="number"
                                                name="partnershipLiveTennPatti"
                                                min={0}
                                                oninput="this.value = Math.abs(this.value)"
                                                defaultValue={0}
                                                id="parent_3patti_part2"
                                                onkeyup="validateTeenPattiPartnership()"
                                                className="form-control"
                                                max={100}
                                                autoComplete="off"
                                                readOnly="true"
                                            />
                                        </div>
                                        <div className="col-md-12 col-xs-12 modal-footer">
                                            <button
                                                type="submit"
                                                className="blue_button"
                                                id="addUser2"
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
            {/* </div> */}



        </>
    )
}

export default AdminList