import React, { useEffect, useState } from 'react'; 
import {
  Routes,
  Route
} from "react-router-dom";

import JobAdsListTable from "./components/JobAdsTable"
import JobAdsDetails from "./components/JobAdsDetails"

import MOCKED_DATA from './services/API/mock_data/job-ads.json';

export default function App(props) {
  const globalConfig = (typeof jobAdsSettings !== 'undefined') ? jobAdsSettings : {}
  const [jobAdsListAPIData, setJobAdsListAPIData] = useState([]);
  const [jobAdsList, setJobAdsList] = useState([]);

  const getJobAdByID = (id) => {
    return jobAdsList.find(item => item.id === id);
  }
  useEffect(() => {		
    setJobAdsListAPIData(MOCKED_DATA)
    /* 
      let apiResponse = API.get('https://staging.leanlink.io/public/api/recruitment-ads')
      apiResponse.then(function(result) {
        console.log('result')
        console.log(result)
      })
   */
	}, []);

  useEffect(() => {
    if (jobAdsListAPIData && jobAdsListAPIData.items)
      setJobAdsList(jobAdsListAPIData.items);
    else 
      setJobAdsList([]);
  }, [jobAdsListAPIData]);

  return (
      <div className={"JobAdsApplication "+ (globalConfig?.cssWrapperClass ? globalConfig?.cssWrapperClass : '') }>
        <Routes>
          <Route path="/" element={
            <JobAdsListTable 
              jobAdsList={jobAdsList} 
            />
          }>
          </Route>
          <Route path="/JobAdDetails/:jobAdID" element={
            <JobAdsDetails getJobAdByID={getJobAdByID} globalConfig={globalConfig}/>
          }>
          </Route>
          <Route path="/*" element={
            <JobAdsListTable 
              jobAdsList={jobAdsList} 
            />
          }>
          </Route>
        </Routes>
      </div>
  );
}