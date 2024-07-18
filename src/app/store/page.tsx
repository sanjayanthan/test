"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Select from "react-select";
import axios from "axios";
import Header from '../../components/Header'
import  appConfig  from "../../helpers/appconfig";

interface Data {
  applicationId: string;
  applicationName: string;
}

interface selectedStore{
    value:string,
    label:string
}

interface StoreApplication {
  id: string;
  storeName: string;
  status: string;
  identityValue: number;
}


interface StoreList {  
  storeName: string;
}


interface SelectOption {
  value: string;
  label: string;
}

const Store = () => {

  const [datas, setDatas] = useState<Data[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedItem, setselectedItem] = useState<StoreApplication[]>([]);


  const [Store, setStore] = useState<SelectOption[]>([]);
  const [selectedStore, setSelectedStore] = useState<selectedStore[]>([{ value: "chocolate", label: "Select" }]);

  const [dropDownVal, setdropDownVal] = useState<SelectOption[]>([
    // { value: "chocolate", label: "Chocolate" },
   ]);


   useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    const url=`${appConfig.appUrl}/GetApplication`
   // alert(url);
    axios.get<Data[]>(`${appConfig.appUrl}/GetApplication`, {
      headers: {
        "X-DG-AppToken": appConfig.appToken
      }
   })
  .then((res) => {
    //alert(res.data );
    console.log(res.data);
    setDatas(res.data);
    var temp: SelectOption[] = [];
    for (let i = 0; i < res.data.length; i++) {
      temp.push({
        value: res.data[i].applicationId,
        label: res.data[i].applicationName,
      });
    }
    setdropDownVal(temp);
  })
  .catch((err) => {
    alert("Error");
    console.log(err);
  })
};

const getStoreList = async (a:string) => {
  //alert(a);
  
  var PreValues : any[] = [];
  
  const url = `${appConfig.appUrl}/GetGrantStore?applicationId=` + a;
    
  axios.get(url,{
    headers: {
      "X-DG-AppToken": appConfig.appToken
    }
  }).then(({ data }) => {
  
    PreValues = data;

    console.log("PreValues", data);
  });
  
  const Districturl=`${appConfig.appUrl}/GetStore`
  //alert(Districturl);

  axios.get<StoreList[]>(Districturl, {
    headers: {
      "X-DG-AppToken": appConfig.appToken
    }
 })
 .then(({ data }) => {
  //alert(data );          

   var temp: SelectOption[] = [];
    const filteredIdArray = data.filter(item => 
      !PreValues.some(dataItem => dataItem.StoreName == item.storeName)
    );
    console.log('filteredIdArray',filteredIdArray);
    
 

    for (let i = 0; i < filteredIdArray.length; i++) {
      temp.push({ value: filteredIdArray[i].storeName, label: filteredIdArray[i].storeName });
    }
    
    setStore(temp);
    
 })
 .catch((err) => {
  
  console.log(err);
})
};

const handleSelectChange = (selectedOption: SelectOption | null) => {
  if(selectedOption){
    const { value, label } = selectedOption;
    setSelectedOption(value);
    getStore(value);
    getStoreList(value);
  }
};

const getStore = (value: string) => {     
  const url=`${appConfig.appUrl}/GetGrantStore?appid=` + value;        
 //alert(url);
  axios
    .get(url,{
      headers: {
        "X-DG-AppToken": appConfig.appToken
      }
    })
    .then((res) => {
      //alert(res.data);
      console.log(res);
      setselectedItem(res.data);
      getStoreList(value);

    })
    .catch((err) => {
      alert(err.message);
      if (err.message === "Request failed with status code 404") {
        setselectedItem([]);
      }
    });
};

const customTopStyles = {
  menuList: (provided: any) => ({
    ...provided,
    maxHeight: "125px",
    overflowY: "auto",
  }),
};
const customBottomStyles = {
  menuList: (provided: any) => ({
    ...provided,
    maxHeight: "90px",
    overflowY: "auto",
  }),
};

const handleDelete = (id: number,store:string) => {
  // alert(id);
          
   //const url=`${appConfig.appUrl}/DenyApplicationDistrict/` + id;
   const url=`${appConfig.appUrl}/PostStoreDenyGrantAccess/`
   
   axios.post(url, {
     "applicationId": Number(selectedOption),
     "storeName": store,
     "type": "Store",
     "createdBy": "2",
     "denyStatus": false,
     "identityValue": id
   }, {
     headers: {
       "X-DG-AppToken": appConfig.appToken
     }
   }).then((res) => {
     //alert("success");
     getStore(selectedOption);//id.toString());
     getStoreList(selectedOption);
   });
 };

 const handleSelectStore = (selectedOption: SelectOption | null) => {
  if(selectedOption){
  const { value, label } = selectedOption;
  setSelectedStore([{value,label}])
}
};

const handleNewEntry=()=>{
      
  //   alert(selectedDivisions[0].value + " " + selectedOption.length)

     if(selectedOption.length  == 0){
       alert("Please select the Application")
       return;
     }

     if(selectedStore[0].value == "chocolate"){
       alert("Please select the Store")
       return;
     }

     
     alert(selectedStore[0].label + " " + selectedOption)

     const url=`${appConfig.appUrl}/PostStoreDenyGrantAccess/`;
     axios.post(url, {
       "applicationId": parseInt(selectedOption),
       "storeName": selectedStore[0].label.toString(), 
       "type": "Store",
       "createdBy": "1",
       "denyStatus": true,
       "identityValue": 0          
     }, {
       headers: {
         "X-DG-AppToken": appConfig.appToken
       }
     }).then((res) => {
       console.log(res);
       getStore(selectedOption);
       getStoreList(selectedOption);
     });
   }

   return (
    <div className="flex ">
      {" "}
      <Sidebar />{" "}
      <div className="p-3 w-full">
      <Header/>
      <label className="  text-xl font-semibold text-gray-700 dark:text-gray-200 flex justify-center items-center">Store Access Configuration</label>
        {" "}
        <div className="mt-2 flex items-center">
        {/* <label htmlFor="search" className="py-2 text-gray-500">
          Select the Application
        </label> {"   "} */}
        <Select
          id="search"
          styles={customTopStyles}
          options={dropDownVal}
          className="w-[275px] my-1 ml-2"
          onChange={handleSelectChange}
          placeholder="Select the Application..."
        />
 {Store && (
            <Select
              id="lstStore"
              styles={customBottomStyles}
              options={Store}
              // options={[{ value: '', label: 'Select the District' }, ...Region]}
              className="w-[260px] my-1 ml-2"
              onChange={handleSelectStore}
              placeholder="Select the Store ..."
            />
          )}

          <button
            onClick={handleNewEntry}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2 my-2 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Grant Store Access
          </button>
      </div>
        
        {" "}
        <div className="w-full  h-[300px] overflow-auto shadow-md sm:rounded-lg">
          {" "}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {" "}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border" >
              {" "}
              <tr>
                {" "}
                <th scope="col" className="px-6 py-3">
                  {" "}
                 ID{" "}
                </th>{" "}
                <th scope="col" className="px-6 py-3">
                  {" "}
                  Store Name{" "}
                </th>{" "}
                {/* <th scope="col" className="px-6 py-3">
                  {" "}
                  Status{" "}
                </th>{" "} */}
                <th scope="col" className="px-6 py-3">
                  {" "}
                  Action{" "}
                </th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody className="w-full overflow-y-scroll">
              {" "}
              {selectedItem.map((item, index) => (
                <tr key={item.identityValue}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {" "}
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {" "}
                    {item.identityValue}{" "}
                  </th>{" "}
                  <td className="px-6 py-4">{item.storeName}</td>{" "}
                  {/* <td className="px-6 py-4">{item.status}</td>{" "} */}
                  <td className="px-6 py-4 text-right flex items-center">
                    <button
                      onClick={() => {
                        handleDelete(item.identityValue,item.storeName);
                      }}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ml-5"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-1 p-2 flex items-center shadow">
          
        </div>
      </div>
    </div>
  );

 
}

export default Store