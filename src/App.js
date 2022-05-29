import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';

import JobAdsListTable from "./components/JobAdsTable";
import JobAdsDetails from "./components/JobAdsDetails";
import SelectBox from "./components/Shared/SelectBox";
import { APP_VIEWS } from "./constants";
import API from "./services/API";
import { RECRUITMENT_ADS, SERVICES } from "./services/API/endpoints";

export default function App(props) {
  const globalConfig = typeof jobAdsPluginSettings !== "undefined" ? jobAdsPluginSettings : {};
  const [jobAdsList, setJobAdsList] = useState([]);
  const [jobAdsListAll, setJobAdsListAll] = useState([]);
  const [jobAdsUsedServicesIDs, setJobAdsUsedServicesIDs] = useState([]);
  const [servicesListFromAPI, setServicesListFromAPI] = useState([]);
  const [professionListFromAPI, setProfessionListFromAPI] = useState([]);
  const [servicesListForDropdown, setServicesListForDropdown] = useState([]);
  const [professionListForDropdown, setProfessionListForDropdown] = useState([]);
  const [locationListForDropdown, setLocationListForDropdown] = useState([]);
  const [groupedLocations, setGroupedLocations] = useState([]);
  const [activeView, setActiveView] = useState(APP_VIEWS.JOB_ADS_LIST);
  const [selectedJobAd, setSelectedJobAd] = useState({});
  const [selectedService, setSelectedService] = useState(0);
  const [selectedProfession, setSelectedProfession] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [jobAdsDataFilter, setJobAdsDataFilter] = useState({service:0, profession:0 ,location:0});
  
  let allProfessions = [];

  const customConfigStyling = {
    getPrimaryButtonStyling: () => {
      let styling = {};
      if (globalConfig?.primaryButtonBackgroundColor)
        styling.backgroundColor = globalConfig?.primaryButtonBackgroundColor;
      if (globalConfig?.primaryButtonTextColor) 
        styling.color = globalConfig?.primaryButtonTextColor;

      return styling;
    },
    getSecondaryButtonStyling: () => {
      let styling = {};
      if (globalConfig?.secondaryButtonBackgroundColor)
        styling.backgroundColor = globalConfig?.secondaryButtonBackgroundColor;
      if (globalConfig?.secondaryButtonTextColor) 
        styling.color = globalConfig?.secondaryButtonTextColor;

      return styling;
    },
    getLinkElementStyling: () => {
      let styling = {};
      if (globalConfig?.linkElementTextColor) 
        styling.color = globalConfig?.linkElementTextColor;

      return styling;
    },
  };

  const handleJobAdDetailsURLParams = (shouldReset, jobAdID) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.delete("jobadid");
    var newurl = document.location.origin;

    if (!shouldReset) urlSearchParams.set("jobadid", jobAdID);

    newurl += document.location.pathname + "?" + urlSearchParams.toLocaleString();
    window.history.pushState(newurl, "", newurl);
  };

  const handleFilterJobAdsURLParams = (shouldReset, filterType, paramValue) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.delete(filterType);
    var newurl = document.location.origin;

    if (!shouldReset) 
      urlSearchParams.set(filterType, paramValue);
    else{
      urlSearchParams.delete('service');
      urlSearchParams.delete('profession');
      urlSearchParams.delete('location');
    }

    newurl += document.location.pathname + "?" + urlSearchParams.toLocaleString();
    window.history.pushState(newurl, "", newurl);
  }

  const handleUserNavigation = (targetView, data) => {
    if (targetView === APP_VIEWS.JOB_ADS_LIST) {
      handleJobAdDetailsURLParams(true);
    } else if (targetView === APP_VIEWS.JOB_DETAILS) {
      handleJobAdDetailsURLParams(false, data);
    }
    setActiveView(targetView);
  };

  const handleJobAdSelection = (selectedItem) => {
    let selectedJobFullData = jobAdsList.find((item) => item.id === selectedItem.id);
    setSelectedJobAd(selectedJobFullData);
  };
  const getJobAdByID = (id) => {
    return jobAdsList.find((item) => item.id === id);
  };

  const filterJobAdsTable = () => {
    
    let filteredData = [];
    
    if(!jobAdsDataFilter.service && !jobAdsDataFilter.profession && !jobAdsDataFilter.location){
      setJobAdsList(jobAdsListAll);
      return;
    }

    if(jobAdsDataFilter.service > 0){
      let selectedParentService = getServiceByID(jobAdsDataFilter.service)
      let allChildItemsFromService = []
      if(selectedParentService){
        allChildItemsFromService = getAllProfessionsForService(selectedParentService, true)        
      }
      jobAdsListAll.forEach(item => {
        if(item.service.id == jobAdsDataFilter.service || allChildItemsFromService.includes(item.service.id))
          filteredData.push(item)
      })      
      setTimeout(function () {
        handleDropdownChange('service', jobAdsDataFilter.service)
      },0)
    }

    if(jobAdsDataFilter.service > 0 && jobAdsDataFilter.profession > 0){
      filteredData = filteredData.filter(item => item.service.id == jobAdsDataFilter.profession);
      setTimeout(function () {
        handleDropdownChange('profession', jobAdsDataFilter.profession)
      },0)
    }
    else if(jobAdsDataFilter.profession > 0){
      filteredData = jobAdsListAll.filter(item => item.service.id == jobAdsDataFilter.profession);
    }
    if(!jobAdsDataFilter.service && !jobAdsDataFilter.profession){
      filteredData = [...jobAdsListAll]
    }

    if(jobAdsDataFilter.location > 0){
      setTimeout(function () {
        handleDropdownChange('location', jobAdsDataFilter.location)
      },0)
      let allGroupedCounties = [...groupedLocations];
      if(!allGroupedCounties.length)
        allGroupedCounties = updateGroupedLocations()

      let selectedCounty = allGroupedCounties.find(item => item.id == jobAdsDataFilter.location)
      if(selectedCounty){
        filteredData = filteredData.filter(item => selectedCounty.locationIDs.includes(item.municipality.id));
      }  
    }

    setJobAdsList(filteredData);
  }

  const setDataBasedOnEndpoint = (endpoint, data) => {
    switch (endpoint) {
      case RECRUITMENT_ADS:
        setJobAdsListAll(data);
        setJobAdsList(data);
        break;
      case SERVICES:
        setServicesListFromAPI(data);
        break;
      default:
        break;
    }
  };

  const getAllDataFromAPICall = (endpoint) => {
    API.get(endpoint).then(function (result) {
      // check if response is with pagination.
      if (result.pageCount > 1) {
        let allApiCalls = [];
        for (var page = 1; page <= result.pageCount; page++) {
          allApiCalls.push(API.get(endpoint + "/?page=" + page));
        }

        Promise.all(allApiCalls)
          .then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(
              responses.map(function (response) {
                return response;
              })
            );
          })
          .then(function (data) {
            //Loop through each of the responses and combine them into one array
            var allItems = [];
            data.forEach(function (dataBatch) {
              allItems = allItems.concat(dataBatch.items);
            });
            setDataBasedOnEndpoint(endpoint, allItems);
          })
          .catch(function (error) {
            setDataBasedOnEndpoint(endpoint, []);
          });
      } else if (result.items) {
        setDataBasedOnEndpoint(endpoint, result.items);
      } else setDataBasedOnEndpoint(endpoint, []);
    });
  };

  const prepareProfessionsFromServices = (service) => { 
    if(service instanceof Array) {
        for(var i = 0; i < service.length; i++) {
          prepareProfessionsFromServices(service[i]);
        }
    }
    else
    {
        for(var prop in service) {
            if(prop == 'children') {
                if(service[prop].length) {
                   allProfessions = allProfessions.concat(service[prop]);
                }
            }
            if(service[prop] instanceof Object || service[prop] instanceof Array){
              prepareProfessionsFromServices(service[prop]);}
        }
    }
  }
 
  const filterDropdownsBasedOnJobAds = () => {
    let filteredServicesList = []
    let filteredProfessionList = []
    if(servicesListFromAPI.length){
      servicesListFromAPI.forEach((item)=>{
        if(jobAdsUsedServicesIDs.includes(item.id))
          filteredServicesList.push(item)
      })
    }
    if(professionListFromAPI.length){
      professionListFromAPI.forEach((item)=>{
        if(jobAdsUsedServicesIDs.includes(item.id))
          filteredProfessionList.push(item)
      })
    }

    setServicesListForDropdown(filteredServicesList)
    setProfessionListForDropdown(filteredProfessionList)
  }

  const applyAllURLParams = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const selectedJobAdId = urlSearchParams.get("jobadid");
    if (selectedJobAdId) {
      handleJobAdSelection(getJobAdByID(selectedJobAdId));
      handleUserNavigation(APP_VIEWS.JOB_DETAILS, selectedJobAdId);
    }
    else{
      const selectedServiceID = urlSearchParams.get("service");
      const selectedProfessionID = urlSearchParams.get("profession");
      const selectedLocationID = urlSearchParams.get("location");

      if(selectedServiceID)
        setSelectedService(selectedServiceID)
      if(selectedProfessionID)
        setSelectedProfession(selectedProfessionID)
      if(selectedLocationID)
        setSelectedLocation(selectedLocationID)
    }

    filterJobAdsTable()
  }

  const getServiceByID = (id) => {
    let selectedService = {}
    servicesListFromAPI.forEach(item => {
      if(item.id == id) selectedService = item
    })
    return selectedService
  }

  const getAllProfessionsForService = (service, onlyIDs) => {
    let allChildItemsFromService = []
    let allUsedServicesIDs = [...jobAdsUsedServicesIDs]
    if(!allUsedServicesIDs.length){
      jobAdsList.forEach((item) => {
        if (item.service && item.service.id && !allUsedServicesIDs.includes(item.service.id))
        allUsedServicesIDs.push(item.service.id);       
      });
    }
    professionListFromAPI.forEach(item=>{
      if(item.path.split('>')[0].indexOf(service.name)!==-1){
        if(allUsedServicesIDs.includes(item.id))
          if(onlyIDs)
            allChildItemsFromService.push(item.id)
          else
            allChildItemsFromService.push(item)
      }
    })
    return allChildItemsFromService;
  }

  const handleDropdownChange = (type, value) => {
    switch(type){
      case 'service':
        setSelectedService(value)
        setSelectedProfession(0)
        setSelectedLocation(0)
        if(value){
          let selectedParentService = getServiceByID(value)
          let allChildItemsFromService = []
          if(selectedParentService)
            allChildItemsFromService = getAllProfessionsForService(selectedParentService)
          setProfessionListForDropdown(allChildItemsFromService)
        }
        break;
      case 'profession':
        setSelectedProfession(value);
        break;
      case 'location':
        setSelectedLocation(value);
        break;
      default:
        break;
    }
    handleFilterJobAdsURLParams(false, type, value)
  }

  const clearFilters = () => {
    handleFilterJobAdsURLParams(true)
    setSelectedService(0)
    setSelectedProfession(0)
    setSelectedLocation(0)
    filterDropdownsBasedOnJobAds()
    setJobAdsList(jobAdsListAll)
  }

  useEffect(() => {
    getAllDataFromAPICall(RECRUITMENT_ADS);
    getAllDataFromAPICall(SERVICES);
  }, []);

  useEffect(() => {
    if(jobAdsUsedServicesIDs.length){
      filterDropdownsBasedOnJobAds()
    }
  }, [jobAdsUsedServicesIDs]);

  useEffect(() => {
    if (servicesListFromAPI) {
      prepareProfessionsFromServices(servicesListFromAPI)
      setProfessionListFromAPI(allProfessions)
    }
  }, [servicesListFromAPI]);

  const updateGroupedLocations = () => {
    let locationItems = [];
    let countyListWithChildItemIDs = {}

    jobAdsList.forEach((item) => {
      if (item.municipality && item.municipality.county && !locationItems.some(e => e.id === item.municipality.id)) {
        locationItems.push(item.municipality)
        if(!countyListWithChildItemIDs[item.municipality.county])
          countyListWithChildItemIDs[item.municipality.county] = { name: item.municipality.county, children: [item.municipality.id] }
        else
          countyListWithChildItemIDs[item.municipality.county].children.push(item.municipality.id)
      }        
    });
    locationItems = Object.keys(countyListWithChildItemIDs).map((key,index) => {
      return {
        id: index+1,
        name: countyListWithChildItemIDs[key].name,
        locationIDs: countyListWithChildItemIDs[key].children
      }
    });

    setLocationListForDropdown(locationItems)
    setGroupedLocations(locationItems)

    return locationItems
  }

  useEffect(() => {
    window.addEventListener("popstate", function (e) {
      var state = e.state;
      if (state !== null) {
        handleUserNavigation(APP_VIEWS.JOB_ADS_LIST);
      }
    });

    applyAllURLParams()

    let jobAdsServicesIDs = [];
    jobAdsList.forEach((item) => {
      if (item.service && item.service.id && !jobAdsServicesIDs.includes(item.service.id))
        jobAdsServicesIDs.push(item.service.id);
    });

    updateGroupedLocations()

    setJobAdsUsedServicesIDs(jobAdsServicesIDs)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobAdsListAll]);

  useEffect(() => {
    filterJobAdsTable()
  }, [jobAdsDataFilter]);

  useEffect(() => {
    setJobAdsDataFilter({
      service: selectedService,
      profession: selectedProfession,
      location: selectedLocation,
    })
  }, [selectedService, selectedProfession, selectedLocation]);

  return (
    <div className={"JobAdsApplication " + (globalConfig?.cssPluginWrapperClass ? globalConfig.cssPluginWrapperClass : "")}>
      {activeView === APP_VIEWS.JOB_ADS_LIST && (
        <div className="jobAdsListWrapper">
          {!globalConfig?.hideFilters &&
            <div className="dropdownControlsWrapper">
              <SelectBox
                id="serviceDropdown"
                type="service"
                label="Service Group"
                options={servicesListForDropdown}
                className="dropdown serviceDropdown"
                handleDropdownChange={handleDropdownChange}
                value={selectedService}
              />
              <SelectBox
                id="professionDropdown"
                type="profession"
                label="Profession"
                options={professionListForDropdown}
                className="dropdown professionDropdown"
                handleDropdownChange={handleDropdownChange}
                value={selectedProfession}
              />
              <SelectBox
                id="locationDropdown"
                type="location"
                label="Location"
                options={locationListForDropdown}
                className="dropdown locationDropdown"
                handleDropdownChange={handleDropdownChange}
                value={selectedLocation}
              />
              <Button 
                variant="outlined"
                className="btnClearFilters"
                onClick={clearFilters}
              >Clear</Button>
            </div>
          }
          <JobAdsListTable
            jobAdsList={jobAdsList}
            globalConfig={globalConfig}
            handleUserNavigation={handleUserNavigation}
            handleJobAdSelection={handleJobAdSelection}
          />
        </div>
      )}
      {activeView === APP_VIEWS.JOB_DETAILS && (
        <JobAdsDetails
          selectedJobAd={selectedJobAd}
          handleUserNavigation={handleUserNavigation}
          getJobAdByID={getJobAdByID}
          globalConfig={globalConfig}
          customConfigStyling={customConfigStyling}
        />
      )}
    </div>
  );
}
