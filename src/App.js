import React, { useEffect, useState } from "react";

import JobAdsListTable from "./components/JobAdsTable";
import JobAdsDetails from "./components/JobAdsDetails";
import SelectBox from "./components/Shared/SelectBox";
import { APP_VIEWS } from "./constants";
import API from "./services/API";
import { RECRUITMENT_ADS, SERVICES } from "./services/API/endpoints";

import MOCKED_DATA from "./services/API/mock_data/job-ads.json";

const mockedProfession = [
  {
    id: "4",
    name: "Akutsjukvård",
    parent: 1,
    bookable: false,
    children: [],
    path: "Läkare > Akutsjukvård",
    _type: "Service",
  },
  {
    id: "5",
    name: "Allergologi",
    parent: 1,
    bookable: true,
    children: [],
    path: "Läkare > Allergologi",
    _type: "Service",
  },
  {
    id: "6",
    name: "Allmänmedicin",
    parent: 1,
    bookable: true,
    children: [
      {
        id: "14",
        name: "Europaläkare",
        parent: 6,
        bookable: true,
        children: [
          {
            id: "15",
            name: "Barnspecialist",
            parent: 14,
            bookable: true,
            children: [],
            path: "Läkare > Allmänmedicin > Europaläkare > Barnspecialist",
            _type: "Service",
          },
        ],
        path: "Läkare > Allmänmedicin > Europaläkare",
        _type: "Service",
      },
    ],
    path: "Läkare > Allmänmedicin",
    _type: "Service",
  },
  {
    id: "7",
    name: "Anestesi",
    parent: 1,
    bookable: true,
    children: [],
    path: "Läkare > Anestesi",
    _type: "Service",
  },
  {
    id: "8",
    name: "Barnaålderns invärtes sjukdomar",
    parent: 1,
    bookable: true,
    children: [],
    path: "Läkare > Barnaålderns invärtes sjukdomar",
    _type: "Service",
  },
  {
    id: "9",
    name: "Barnmedicin",
    parent: 1,
    bookable: true,
    children: [],
    path: "Läkare > Barnmedicin",
    _type: "Service",
  },
];

export default function App(props) {
  const globalConfig =
    typeof jobAdsPluginSettings !== "undefined" ? jobAdsPluginSettings : {};
  const [jobAdsList, setJobAdsList] = useState([]);
  const [servicesList, setServicesList] = useState();
  const [activeView, setActiveView] = useState(APP_VIEWS.JOB_ADS_LIST);
  const [selectedJobAd, setSelectedJobAd] = useState({});

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

  const handleJobAdURLParams = (shouldReset, jobAdID) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.delete("jobadid");
    var newurl = document.location.origin;

    if (!shouldReset) urlSearchParams.set("jobadid", jobAdID);

    newurl +=
      document.location.pathname + "?" + urlSearchParams.toLocaleString();
    window.history.pushState(newurl, "", newurl);
  };

  const handleUserNavigation = (targetView, data) => {
    if (targetView === APP_VIEWS.JOB_ADS_LIST) {
      handleJobAdURLParams(true);
    } else if (targetView === APP_VIEWS.JOB_DETAILS) {
      handleJobAdURLParams(false, data);
    }
    setActiveView(targetView);
  };
  const handleJobAdSelection = (selectedItem) => {
    let selectedJobFullData = jobAdsList.find(
      (item) => item.id === selectedItem.id
    );
    setSelectedJobAd(selectedJobFullData);
  };
  const getJobAdByID = (id) => {
    return jobAdsList.find((item) => item.id === id);
  };

  const setDataBasedOnEndpoint = (endpoint, data) => {
    switch (endpoint) {
      case RECRUITMENT_ADS:
        setJobAdsList(data);
        break;
      case SERVICES:
        setServicesList(data);
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

  useEffect(() => {
    getAllDataFromAPICall(RECRUITMENT_ADS);
    getAllDataFromAPICall(SERVICES);
  }, []);

  useEffect(() => {
    if (servicesList) {
      console.log("API services data : ");
      console.log(servicesList);
    }
  }, [servicesList]);

  useEffect(() => {
    window.addEventListener("popstate", function (e) {
      var state = e.state;
      if (state !== null) {
        handleUserNavigation(APP_VIEWS.JOB_ADS_LIST);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobAdsList]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const selectedJobAdId = urlSearchParams.get("jobadid");
    if (selectedJobAdId) {
      handleJobAdSelection(getJobAdByID(selectedJobAdId));
      handleUserNavigation(APP_VIEWS.JOB_DETAILS, selectedJobAdId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobAdsList]);

  return (
    <div
      className={
        "JobAdsApplication " +
        (globalConfig?.cssPluginWrapperClass
          ? globalConfig.cssPluginWrapperClass
          : "")
      }
    >
      <div className="dropdownControlsWrapper">
        <SelectBox
          id="servicesDropdown"
          label="Services"
          options={servicesList}
          className="dropdown servicesDropdown"
        />
        <SelectBox
          id="professionDropdown"
          label="Profession"
          options={mockedProfession}
          className="dropdown professionDropdown"
        />
      </div>
      {activeView === APP_VIEWS.JOB_ADS_LIST && (
        <JobAdsListTable
          jobAdsList={jobAdsList}
          handleUserNavigation={handleUserNavigation}
          handleJobAdSelection={handleJobAdSelection}
        />
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
