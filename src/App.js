import React, { useEffect, useState } from 'react'; 

import JobAdsListTable from "./components/JobAdsTable"
import JobAdsDetails from "./components/JobAdsDetails"
import { APP_VIEWS } from "./constants"
import API from "./services/API"

import MOCKED_DATA from './services/API/mock_data/job-ads.json';

export default function App(props) {
  const globalConfig = (typeof jobAdsPluginSettings !== 'undefined') ? jobAdsPluginSettings : {}
  const [jobAdsListAPIData, setJobAdsListAPIData] = useState([]);
  const [jobAdsList, setJobAdsList] = useState([]);
  const [activeView, setActiveView] = useState(APP_VIEWS.JOB_ADS_LIST)
  const [selectedJobAd, setSelectedJobAd] = useState({});

  const customConfigStyling = {
    getPrimaryButtonStyling: () => {
      let styling = {}
      if(globalConfig?.primaryButtonBackgroundColor)
        styling.backgroundColor = globalConfig?.primaryButtonBackgroundColor
      if(globalConfig?.primaryButtonTextColor)
        styling.color = globalConfig?.primaryButtonTextColor
  
      return styling
    },
    getSecondaryButtonStyling: () => {
      let styling = {}
      if(globalConfig?.secondaryButtonBackgroundColor)
        styling.backgroundColor = globalConfig?.secondaryButtonBackgroundColor
      if(globalConfig?.secondaryButtonTextColor)
        styling.color = globalConfig?.secondaryButtonTextColor
        
      return styling
    },
    getLinkElementStyling: () => {
      let styling = {}
      if(globalConfig?.linkElementTextColor)
        styling.color = globalConfig?.linkElementTextColor
        
      return styling
    }
  }

  const handleJobAdURLParams = (shouldReset, jobAdID) => {
    const urlSearchParams = new URLSearchParams(window.location.search);    
    urlSearchParams.delete('jobadid')
    var newurl = document.location.origin;

    if(!shouldReset)
      urlSearchParams.set('jobadid',jobAdID)
    
    newurl += document.location.pathname + '?' + urlSearchParams.toLocaleString();
    window.history.pushState(newurl, "", newurl);
  }

  const handleUserNavigation = (targetView, data) => {
    if(targetView === APP_VIEWS.JOB_ADS_LIST){
      handleJobAdURLParams(true)
    }
    else if(targetView === APP_VIEWS.JOB_DETAILS){
      handleJobAdURLParams(false, data)
    }
    setActiveView(targetView);
  }
  const handleJobAdSelection = (selectedItem) => {
    let selectedJobFullData = jobAdsList.find(item => item.id === selectedItem.id);
    setSelectedJobAd(selectedJobFullData)
  }
  const getJobAdByID = (id) => {
    return jobAdsList.find(item => item.id === id);
  }
  
  useEffect(() => {	
    setJobAdsListAPIData(MOCKED_DATA)
    console.log(MOCKED_DATA);
    /*
      let apiResponse = API.get('http://127.0.0.1:8000/public/api/recruitment-ads')
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

    window.addEventListener('popstate', function (e) {
      var state = e.state;
      if (state !== null) {
        handleUserNavigation(APP_VIEWS.JOB_ADS_LIST);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobAdsListAPIData]);

  useEffect(() => {	
    const urlSearchParams = new URLSearchParams(window.location.search);
    const selectedJobAdId = urlSearchParams.get('jobadid')
    if(selectedJobAdId){
      handleJobAdSelection(getJobAdByID(selectedJobAdId));
      handleUserNavigation(APP_VIEWS.JOB_DETAILS, selectedJobAdId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jobAdsList]);

  return (
      <div className={"JobAdsApplication "+ (globalConfig?.cssPluginWrapperClass ? globalConfig?.cssPluginWrapperClass : '') }>
       
       {activeView === APP_VIEWS.JOB_ADS_LIST && 
          <JobAdsListTable 
            jobAdsList={jobAdsList}
            handleUserNavigation={handleUserNavigation}
            handleJobAdSelection={handleJobAdSelection}
          />
        }
        {activeView === APP_VIEWS.JOB_DETAILS && 
          <JobAdsDetails 
            selectedJobAd={selectedJobAd}
            handleUserNavigation={handleUserNavigation}
            getJobAdByID={getJobAdByID}
            globalConfig={globalConfig}
            customConfigStyling={customConfigStyling}
          />
        }
      </div>
  );
}