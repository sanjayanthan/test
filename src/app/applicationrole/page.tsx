"use client"
import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar'
import {data} from '../../helpers/application'
import Header from '../../components/Header'
import Select from "react-select";
import axios from "axios";
import  appConfig  from "../../helpers/appconfig";

interface Data {
  applicationId: string;
  applicationName: string;
}

interface selectedRole{
    value:string,
    label:string
}

interface DivisionApplication {
  id: string;
  districtName: string;
  status: string;
  identityValue: number;
}

interface ApplicationRoleList {
  IdKey: string;
  ApplicationName: string;
  RoleName: string;  
}

interface DistrictList {  
  districtName: string;
}


const ApplicationRole = () => {

  const [datas, setDatas] = useState<Data[]>([]);

  const [selectedOption, setSelectedOption] = useState<string>("");

  const [selectedItem, setselectedItem] = useState<DivisionApplication[]>([]);

  const [Divisions, setDivisions] = useState<SelectOption[]>([]);

  const [selectedDivisions, setselectedRole] = useState<selectedRole[]>([{ value: "chocolate", label: "Select" }]);

  const [reset, setReset] = useState<SelectOption | null>(null);

  const [dropDownVal, setdropDownVal] = useState<SelectOption[]>([
   // { value: "chocolate", label: "Chocolate" },
  ]);

  interface SelectOption {
    value: string;
    label: string;
  }

  useEffect(() => {
    getDatas();   
});

const getDatas = async () => {
  
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

const ApplicationRoleList = async (a:string) => {
  // alert(a);
   
   var PreValues: any[] = [];
   
   const url = `${appConfig.appUrl}/GetDenyDistrict?applicationId=` + a;
   
   
   axios.get(url,{
     headers: {
       "X-DG-AppToken": appConfig.appToken
     }
   }).then(({ data }) => {
   
     PreValues = data;

     console.log("PreValues", data);
   });
   
 

}



// const Application = () => {
//     useEffect(()=>{
//         console.log(data);
//       })
//       return (
//         <div className='flex'>
//           {" "}
//             <Sidebar />{" "}
//             <div className='p-2 w-full h-full overflow-x-auto'>   
//             <Header/>
//             <label className=" text-xl font-semibold text-gray-700 dark:text-gray-200 text-center flex justify-center">Application Role Configuration</label>
//             <p className='left-10 h-72 flex justify-center items-center flex-grow'> Under construction</p>
               
//             </div>
//         </div>
//       )
// }

export default ApplicationRole

