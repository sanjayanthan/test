"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import  appConfig  from "../helpers/appconfig";

interface Data {
    id: number;
    applicationId: number;
    applicationName: string;
    applicationDescription: string;
    displayText: string;
    displayMessage: string;
    applicationUrl: string;
    displayOrder: number;
    sessionTimeOut: number;
    status: number;
    appNative: number;
    allStoreVisible: number;
}

const Table: React.FC = () => {
    const [appName, setAppName] = useState("");
    const [appDescription, setAppDescription] = useState("");
    const [displayText, setDisplayText] = useState("");
    const [displayMessage, setDisplayMessage] = useState("");
    const [applicationUrl, setApplicationUrl] = useState("");
    const [displayOrder, setDisplayNumber] = useState(0);
    const [sessionTimeOut, setSessionTimeOut] = useState(0);
    const [appStatus, setAppStatus] = useState(0);
    const [newEntry, setNewEntry] = useState(false);
    const [appID, setAppID] = useState(0);
    const [editId, setEditId] = useState(-1);
    const [datas, setDatas] = useState<Data[]>([]);
    const[appNative,setAppNative]=useState(0);
    const[allStoreVisible,setAllStoreVisible]=useState(0);

    useEffect(() => {
        getDatas();
    }, [editId]);

    

    const getDatas = async () => {
       // alert(editId)
        // axios.get<Data[]>("http://localhost:3001/users")
        // .then((res) => {
        //     console.log(res.data);
        //     setDatas(res.data);
        // })
        // .catch((error) => { 
        //     console.error("There was an error!", error);
        // }) 
        
        //alert(`${appConfig.appUrl}/GetApplication`);
        
         axios.get<Data[]>(`${appConfig.appUrl}/GetApplication`, {

            headers: {
              "X-DG-AppToken": appConfig.appToken
            }
        })
        .then((res) => {
            console.log(res.data);
            setDatas(res.data);            
        })
        .catch((error) => { 
            console.error("There was an error!", error);
        })
    };

    const handleUpdate = (id: number) => {
        setEditId(id);
        var val = datas.filter((item, index) => item.applicationId === id);
        console.log("sanjay");
        console.log(val);
        setNewEntry(false);
        setAppName(val[0].applicationName);
        setAppDescription(val[0].applicationDescription);
        setDisplayText(val[0].displayText);
        setDisplayMessage(val[0].displayMessage);
        setApplicationUrl(val[0].applicationUrl);
        setDisplayNumber(val[0].displayOrder);
        setSessionTimeOut(val[0].sessionTimeOut);
        setAppStatus(val[0].status);
        setAppID(val[0].applicationId);
        setAppNative(val[0].appNative);
        setAllStoreVisible(val[0].allStoreVisible);

    };

    const handleUpdated = async () => { 
        if (newEntry) {
            const addData: Data = {
                id: 0,
                applicationId: 0,
                applicationName: appName,
                applicationDescription: appDescription,
                displayText: displayText,
                displayMessage: displayMessage,
                applicationUrl: applicationUrl,
                displayOrder: displayOrder,
                sessionTimeOut: sessionTimeOut,
                status: appStatus,
                appNative:appNative,
                allStoreVisible:allStoreVisible
              };
            
              const url=`${appConfig.appUrl}/PostApplication`;              
             alert(url + addData);
            // axios.post(url, addData)

              axios.post(url, addData, {
                headers: {
                  "X-DG-AppToken": appConfig.appToken
                }
              })
              .then((res) => {
                console.log(res, "red----");
              })
              .catch((error) => {
                console.error("There was an error at post add!",error);
              });
              

            
            // axios.post(`${appConfig.appUrl}/PostApplication`, {
            //     applicationId: 0,
            //     applicationName: appName,
            //     displayText: displayText,
            //     displayMessage: displayMessage,
            //     applicationUrl: applicationUrl,
            //     applicationDescription: appDescription,   
            //     displayOrder: displayOrder,
            //     sessionTimeOut: sessionTimeOut,
            //     status: appStatus,
            //   }, {
            //     headers: {
            //       "X-DG-AppToken": appConfig.appToken
            //     }
            //   })
                
             

            console.log(datas);
            setEditId(-1);
            setNewEntry(false);
        } else {
            alert(editId)
           // alert("in");
            //console.log("editId is " + editId);
           // console.log(datas);
            var val = datas.filter((item, index) => item.applicationId === editId);
            console.log(val);
           // alert(val);           

            const upData: Data = {
                id: val[0].id,
                applicationId: appID,
                applicationName: appName,
                displayText: displayText,
                displayMessage: displayMessage,
                applicationUrl: applicationUrl,
                applicationDescription: appDescription,
                displayOrder: displayOrder,
                sessionTimeOut: sessionTimeOut,
                status: appStatus,
                appNative:appNative,
                allStoreVisible:allStoreVisible
            };

                      
            const url=`${appConfig.appUrl}/PostApplication`;              
            
           // axios.post(url, addData)

             axios.post(url, upData, {
               headers: {
                 "X-DG-AppToken": appConfig.appToken
               }
             })
             .then((res) => {
               console.log(res, "red----");               
               getDatas();
             })
             .catch((error) => {
               console.error("There was an error at post add!",error);
             });
             
            setEditId(-2);
            
            setNewEntry(false);
        }
    };



    const handleNewEntry = () => { 
        setEditId(1); 
        setNewEntry(true); 
        setAppName(""); 
        setAppDescription(""); 
        setDisplayText(""); 
        setDisplayMessage(""); 
        setApplicationUrl(""); 
        setDisplayNumber(0); 
        setSessionTimeOut(0); 
        setAppStatus(0); 
        setAppID(datas.length + 1); 
        setAppNative(0);
        setAllStoreVisible(0);
    };



    const handleDelete = (id: number) => {
        var val = datas.filter((item, index) => item.applicationId === id);
        axios.delete("http://localhost:3001/users/" + val[0].id).then((res) => {
            console.log(res);
            getDatas();
        });
    };

    return (<div> <button onClick={handleNewEntry} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-1 my-2 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" > Add Application </button>

        <div className=" w-full mt-1 max-h-[470px] overflow-auto shadow-md sm:rounded-lg">
            <table className="w-full  text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
                <thead className="text-xxs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border">
                    <tr>
                        <th scope="col" className="px-6 py-3 border">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Application Name
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Display Text
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Display Message
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            URL
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Display Order
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            TimeOut
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            App Native
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            All Store Visible
                        </th>
                        <th scope="col" className="px-6 py-3 border">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="w-full  overflow-y-scroll">
                    {datas.map((item, index) =>
                        item.applicationId === editId ? (
                            <tr key={item.applicationId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td
                                    scope="row"
                                    className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {appID}
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="text"
                                        value={appName}
                                        onChange={(e) => {
                                            setAppName(e.target.value);
                                        }}
                                        id="first_name1"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="text"
                                        value={displayText}
                                        onChange={(e) => {
                                            setDisplayText(e.target.value);
                                        }}
                                        id="first_name2"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="text"
                                        id="first_name3"
                                        value={displayMessage}
                                        onChange={(e) => setDisplayMessage(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="text"
                                        id="first_name4"
                                        value={applicationUrl}
                                        onChange={(e) => setApplicationUrl(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="text"
                                        id="first_name5"
                                        value={appDescription}
                                        onChange={(e) => setAppDescription(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-3 py-3">
                                    <input
                                        type="number"
                                        id="first_name6"
                                        value={displayOrder}
                                        onChange={(e) => setDisplayNumber(parseInt(e.target.value))}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-3 py-3">
                                    <input
                                        type="number"
                                        id="first_name7"
                                        value={sessionTimeOut}
                                        onChange={(e) => setSessionTimeOut(parseInt(e.target.value))}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </td>
                                <td className="px-3 py-3">
                                    <input
                                        type="checkbox"
                                        id="first_name8"
                                        checked={appStatus === 1}
                                        onChange={(e) =>
                                            setAppStatus(e.target.checked ? 1 : 0)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </td>
                                <td className="px-3 py-3">
                                    <input
                                        type="checkbox"
                                        id="first_name9"
                                        checked={appNative === 1}
                                        onChange={(e) =>
                                            setAppNative(e.target.checked ? 1 : 0)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </td>
                                <td className="px-3 py-3">
                                    <input
                                        type="checkbox"
                                        id="first_name10"
                                        checked={allStoreVisible === 1}
                                        onChange={(e) =>
                                            setAllStoreVisible(e.target.checked ? 1 : 0)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </td>
                                <td className="px-6 py-3 text-right">
                                    <button
                                        onClick={() => {
                                            handleUpdated();
                                        }}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        {newEntry ? "Add" : "Update"}
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={item.applicationId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {item.applicationId}
                                </th>
                                <td className="px-6 py-4">{item.applicationName}</td>
                                <td className="px-6 py-4">{item.displayText}</td>
                                <td className="px-6 py-4">{item.displayMessage}</td>
                                <td className="px-6 py-4">{item.applicationUrl}</td>
                                <td className="px-6 py-4">{item.applicationDescription}</td>
                                <td className="px-6 py-4">{item.displayOrder}</td>
                                <td className="px-6 py-4">{item.sessionTimeOut}</td>
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        id="first_name9"
                                        checked={item.status === 1}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        id="first_name9"
                                        checked={item.appNative === 1}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        id="first_name9"
                                        checked={item.allStoreVisible === 1}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </td>
                                <td className="px-6 py-4 text-right flex items-center">
                                    <button
                                        onClick={() => {
                                            handleUpdate(item.applicationId);
                                        }}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default Table;
