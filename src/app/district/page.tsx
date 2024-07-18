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

interface selectedDivisions{
    value:string,
    label:string
}

interface DivisionApplication {
  id: string;
  districtName: string;
  status: string;
  identityValue: number;
}

interface DivisionList {
  DivisionId: string;
  DivisionName: string;
  Status: string;
}

interface DistrictList {  
  districtName: string;
}

const District = () => {

  const [datas, setDatas] = useState<Data[]>([]);

  const [selectedOption, setSelectedOption] = useState<string>("");

  const [selectedItem, setselectedItem] = useState<DivisionApplication[]>([]);

  const [Divisions, setDivisions] = useState<SelectOption[]>([]);
  const [selectedDivisions, setSelectedDivisions] = useState<selectedDivisions[]>([{ value: "chocolate", label: "Select" }]);

  const [reset, setReset] = useState<SelectOption | null>(null);

  const [dropDownVal, setdropDownVal] = useState<SelectOption[]>([
   // { value: "chocolate", label: "Chocolate" },
  ]);

  interface SelectOption {
    value: string;
    label: string;
  }

  // useEffect(() => {
  //   getDatas();
  // }, []);

  useEffect(() => {
          getDatas();   
    

  });

  const getDatas = async () => {
    //const url=`http://localhost:3001/users`
    const url=`${appConfig.appUrl}/GetApplication`
   // alert(url);
    axios.get<Data[]>(`${appConfig.appUrl}/GetApplication`, {
      headers: {
        "X-DG-AppToken": appConfig.appToken
      }
   })
  .then((res) => {
   // alert(res.data );
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
    
    console.log(err);
  })
};



  // alert(url)
  //    axios.get(url).then(({ data }) => {
  //     alert(data);
  //     console.log(data);
  //     setDatas(data);
  //     var temp: SelectOption[] = [];
  //     for (let i = 0; i < data.length; i++) {
  //       temp.push({
  //         value: data[i].ApplicationId,
  //         label: data[i].ApplicationName,
  //       });
  //     }
  //     setdropDownVal(temp);
  //   });
  // };

  const getDivisionList = async (a:string) => {
   // alert(a);
    
    var PreValues: any[] = [];
    
    const url = `${appConfig.appUrl}/GetDenyDistrict?applicationId=` + a;
    
    //axios.get("http://localhost:3001/Values?AppID=" + a).then(({ data }) => {
    axios.get(url,{
      headers: {
        "X-DG-AppToken": appConfig.appToken
      }
    }).then(({ data }) => {
    
      PreValues = data;

      console.log("PreValues", data);
    });
    
    const Districturl=`${appConfig.appUrl}/GetDistrict`
    //alert(Districturl);

    axios.get<DistrictList[]>(Districturl, {
      headers: {
        "X-DG-AppToken": appConfig.appToken
      }
   })
   .then(({ data }) => {
    //alert(data );          

     var temp: SelectOption[] = [];
      const filteredIdArray = data.filter(item => 
        !PreValues.some(dataItem => dataItem.districtName == item.districtName)
      );
      console.log('filteredIdArray',filteredIdArray);
      
   

      for (let i = 0; i < filteredIdArray.length; i++) {
        temp.push({ value: filteredIdArray[i].districtName, label: filteredIdArray[i].districtName });
      }
      setDivisions([]);
      setDivisions(temp);
      
   })
   .catch((err) => {
    
    console.log(err);
  })
};



  //   axios.get<DistrictList[]>(`${appConfig.appUrl}/GetDistrict`).then(({ data }) => {
  //     alert("in")
  //     alert(data);

  //     console.log(data);
  //     setDatas(data);

  //     var temp: SelectOption[] = [];
  //     const filteredIdArray = data.filter(item => 
  //       !PreValues.some(dataItem => dataItem.DivisionName == item.DivisionName)
  //     );
  //     console.log('filteredIdArray',filteredIdArray);

  //     for (let i = 0; i < filteredIdArray.length; i++) {
  //       temp.push({ value: filteredIdArray[i].DivisionId, label: filteredIdArray[i].DivisionName });
  //     }
  //     setDivisions(temp);
  //   });
  // };

  const handleSelectChange = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
    const { value, label } = selectedOption;
    setSelectedOption(value);
    getDistrict(value);
    getDivisionList(value);
    }
  };
  
  const getDistrict = (value: string) => {     
    const url=`${appConfig.appUrl}/GetDenyDistrict?applicationId=` + value;        
   // alert(url);
    axios
      .get(url,{
        headers: {
          "X-DG-AppToken": appConfig.appToken
        }
      })
      .then((res) => {
       // alert(res.data);
        console.log(res);
        setselectedItem(res.data);
        getDivisionList(value);

      })
      .catch((err) => {
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

  const handleDelete = (id: number,district:string) => {
   // alert(id);
           
    //const url=`${appConfig.appUrl}/DenyApplicationDistrict/` + id;
    const url=`${appConfig.appUrl}/PostDistrictDenyGrantAccess/`
    // axios.delete(url,{
    //   headers: {
    //     "X-DG-AppToken": appConfig.appToken
    //   }
    //   ,data: {
    //     "applicationId":Number(selectedOption),
    //     "districtName": district,
    //     "type": "District",
    //     "createdBy": "2",
    //     "denyStatus": false,                        
    //     "identityValue": id
    //   }
    axios.post(url, {
      "applicationId": Number(selectedOption),
      "districtName": district,
      "type": "District",
      "createdBy": "2",
      "denyStatus": false,
      "identityValue": id
    }, {
      headers: {
        "X-DG-AppToken": appConfig.appToken
      }
    }).then((res) => {
      //alert("success");
      getDistrict(selectedOption);//id.toString());
      getDivisionList(selectedOption);
    });
  };

  const handleSelectDistrict = (selectedOption: SelectOption | null) => {
    if(selectedOption){
    const { value, label } = selectedOption;
    setSelectedDivisions([{value,label}])
    setReset(selectedOption);
  }

  };

    const handleNewEntry=()=>{
      
   //   alert(selectedDivisions[0].value + " " + selectedOption.length)

      if(selectedOption.length  == 0){
        alert("Please select the Application")
        return;
      }

      if(selectedDivisions[0].value == "chocolate"){
        alert("Please select the District")
        return;
      }

      
      //alert(selectedDivisions[0].label + " " + selectedOption)

      const url=`${appConfig.appUrl}/PostDistrictDenyGrantAccess/`;
      axios.post(url, {
        "applicationId": parseInt(selectedOption),
        "districtName": selectedDivisions[0].label.toString(), 
        "type": "District",
        "createdBy": "1",
        "denyStatus": true,
        "identityValue": 0          
      }, {
        headers: {
          "X-DG-AppToken": appConfig.appToken
        }
      }).then((res) => {
        console.log(res);
        getDistrict(selectedOption);
        // getDivisionList(selectedOption);
        setReset(null);        
        getDivisionList(selectedOption);
      });
    }

  return (
    <div className="flex ">
      {" "}
      <Sidebar />{" "}
      <div className="p-3 w-full">
      <Header/>
       
      <label className="  text-xl font-semibold text-gray-700 dark:text-gray-200 flex justify-center items-center">District Access Configuration</label>
      
        {" "}
        <div className="mt-2 flex items-center">
        {/* <label htmlFor="search" className="py-2 text-gray-500">
          Select the Application
        </label> {"   "} */}
        <Select
          id="search"
          styles={customTopStyles}
          options={dropDownVal}
          className="w-[280px] my-1 ml-2"          
          onChange={handleSelectChange}
          placeholder="Select the Application..."
        />
 {Divisions && (
            <Select
              id="lstDivision"
              styles={customBottomStyles}
              options={Divisions}
              // options={[{ value: '', label: 'Select the District' }, ...Divisions]}
              className="w-[260px] my-1 ml-2"
              onChange={handleSelectDistrict}
              placeholder="Select the Division ..."
              value={reset}
            />
          )}

          <button
            onClick={handleNewEntry}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2 my-2 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Grant District Access
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
                  District Name{" "}
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
                <tr key={item.identityValue} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {" "}
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {" "}
                    {item.identityValue}{" "}
                  </th>{" "}
                  <td className="px-6 py-4">{item.districtName}</td>{" "}
                  {/* <td className="px-6 py-4">{item.status}</td>{" "} */}
                  <td className="px-6 py-4 text-right flex items-center">
                    <button
                      onClick={() => {
                        handleDelete(item.identityValue,item.districtName);
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

          {/* <label htmlFor="search" className="py-2 text-gray-500">
            Select the District
          </label> */}

          {/* {Divisions && (
            <Select
              id="lstDivision"
              styles={customBottomStyles}
              options={Divisions}
              // options={[{ value: '', label: 'Select the District' }, ...Divisions]}
              className="w-[300px] my-1 ml-2"
              onChange={handleSelectDevision}
              placeholder="Select the Division ..."
            />
          )}

          <button
            onClick={handleNewEntry}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2 my-2 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          > 
            Deny District Access
          </button>*/}
        </div>
      </div>
    </div>
  );
};

export default District;
