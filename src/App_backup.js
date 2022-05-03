import React, { useEffect, useState } from 'react'; 

import { PAGES } from './constants';
import JobAdsListTable from "./components/JobAdsTable"
import JobAdsDetails from "./components/JobAdsDetails"

import MOCKED_DATA from './services/API/mock_data/job-ads.json';

export default function App(props) {
  const [jobAdsListAPIData, setJobAdsListAPIData] = useState([]);
  const [jobAdsList, setJobAdsList] = useState([]);
  const [selectedJobAd, setSelectedJobAd] = useState([]);
  const [activePage, setActivePage] = useState(PAGES.JOB_ADS_LIST);

  const handleUserNavigation = (targetPage) => {
    setActivePage(targetPage)
  }
  const handleJobAdSelection = (selectedItem) => {
    let selectedJobFullData = jobAdsList.find(item => item.id === selectedItem.id);
    setSelectedJobAd(selectedJobFullData)
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
      <div className="JobAdsApplication">
        


        {activePage===PAGES.JOB_ADS_LIST && 
          <JobAdsListTable 
            jobAdsList={jobAdsList} 
            handleUserNavigation={handleUserNavigation}
            handleJobAdSelection={handleJobAdSelection}
          />
        }
        {activePage===PAGES.JOB_DETAILS && 
          <JobAdsDetails 
            selectedJobAd={selectedJobAd}
            handleUserNavigation={handleUserNavigation}
          />
        }  

      </div>
  );
}