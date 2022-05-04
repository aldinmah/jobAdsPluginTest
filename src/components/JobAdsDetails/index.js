import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { JOB_IMAGES_LIST } from "../../constants";

import "./style.css";

export default function JobAdsDetails(props) {
  const [jobAdsDetailsData, setJobAdsDetailsData] = useState({});
  const [randomImgURL, setRandomImgURL] = useState(0);
  const reqParams = useParams();

  useEffect(() => {
    setJobAdsDetailsData(props.getJobAdByID(reqParams?.jobAdID));
    //set random image from image list
    let randomImagePath =
      JOB_IMAGES_LIST[Math.floor(Math.random() * JOB_IMAGES_LIST.length)];
    setRandomImgURL(randomImagePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqParams]);

  return (
    <Box className="fullRow jobAdsDetailsWrapper">
      <Link to="/">Back to list</Link>
      <h1 className="fullRow jobTitle">{jobAdsDetailsData?.title}</h1>
      <div className="fullRow locationDurationContainer">
        <div className="floatLeft locationBox">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.594 9.972a.584.584 0 1 1-1.167.046.584.584 0 0 1 1.167-.046zm-3.57 4.227l4.033-2.34c.292-.168.536-.412.705-.705l2.362-4.07c.466-.801-.447-1.65-1.211-1.212L8.878 8.213a1.943 1.943 0 0 0-.705.705l-2.362 4.07c-.456.787.43 1.662 1.213 1.211zm3.89-3.537a.958.958 0 0 1-.348.348l-3.73 2.164L9.022 9.41a.955.955 0 0 1 .348-.348l3.743-2.186-2.199 3.787zm7.74 4.35A10.01 10.01 0 0 0 17.077 2.93C13.888-.252 8.924-.94 4.987 1.345-.65 4.617-1.749 12.364 2.931 17.06c4.756 4.739 12.492 3.522 15.723-2.048zm-2.27-11.388a9.03 9.03 0 0 1 1.422 10.896c-2.92 5.033-9.897 6.115-14.182 1.847C-.597 12.131.394 5.143 5.479 2.193 9.078.104 13.553.797 16.384 3.623zm-2.19 12.644c.525-.352.72-1.046.433-1.601.588.235 1.305.038 1.666-.495 1.955-3.16 1.571-6.986-.957-9.52-2.448-2.441-6.387-2.888-9.53-.928-.52.353-.713 1.05-.436 1.606-.58-.24-1.297-.034-1.64.477-2.02 3.026-1.637 6.941.933 9.522a7.504 7.504 0 0 0 5.322 2.216c1.5 0 2.956-.44 4.209-1.277zM6.26 5.047c-.097-.18-.054-.412.08-.502 2.728-1.698 6.172-1.327 8.304.8 2.233 2.24 2.554 5.502.827 8.294-.098.145-.346.194-.519.099-.855-.459-1.686.353-1.206 1.225.094.171.05.392-.097.49a6.575 6.575 0 0 1-3.665 1.112 6.534 6.534 0 0 1-4.63-1.93c-2.233-2.245-2.566-5.65-.808-8.285.102-.152.328-.186.49-.096.867.477 1.689-.346 1.224-1.207z"
              fill="#666"
              fillRule="evenodd"
            />
          </svg>

          <span className="locationValue">
            {jobAdsDetailsData?.municipality?.county || " - "}
          </span>
        </div>
        <div className="floatLeft durationBox">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.44 1.742h-2.042v-.516c0-.676-.53-1.226-1.18-1.226-.65 0-1.18.55-1.18 1.226v.516H6.145v-.516C6.145.55 5.615 0 4.965 0c-.65 0-1.18.55-1.18 1.226v.516h-2.07C.77 1.742 0 2.54 0 3.523v14.568c0 .983.77 1.782 1.715 1.782H17.44c.945 0 1.716-.799 1.716-1.782V3.523c0-.982-.77-1.781-1.716-1.781zm-3.52-.516c0-.172.133-.31.298-.31.164 0 .299.138.299.31v2.84c0 .171-.135.31-.299.31a.305.305 0 0 1-.299-.31v-2.84zm-9.254 0c0-.172.134-.31.299-.31.165 0 .299.138.299.31v2.84c0 .171-.134.31-.3.31a.305.305 0 0 1-.298-.31v-2.84zM18.274 18.09c0 .478-.374.867-.834.867H1.715c-.46 0-.834-.39-.834-.867V7.327h17.393v10.764zm0-11.68H.881V3.524c0-.478.375-.866.834-.866h2.07v1.41c0 .675.53 1.224 1.18 1.224.65 0 1.18-.549 1.18-1.224v-1.41h6.893v1.41c0 .675.53 1.224 1.18 1.224.65 0 1.18-.549 1.18-1.224v-1.41h2.042c.46 0 .834.388.834.866v2.889zM4.256 15.969c-.533 0-.968-.452-.968-1.006v-.813c0-.555.435-1.006.968-1.006h.782c.535 0 .97.451.97 1.006v.813c0 .554-.435 1.006-.97 1.006h-.782zm-.087-1.82c0-.049.04-.089.087-.089h.782a.09.09 0 0 1 .088.09v.813c0 .049-.04.09-.088.09h-.782a.089.089 0 0 1-.087-.09v-.813zm3.365 1.82c-.534 0-.97-.452-.97-1.006v-.813c0-.555.436-1.006.97-1.006h.78c.535 0 .969.451.969 1.006v.813c0 .554-.434 1.006-.968 1.006h-.78zm-.089-1.82c0-.049.04-.089.09-.089h.78c.047 0 .087.04.087.09v.813c0 .049-.04.09-.087.09h-.78a.09.09 0 0 1-.09-.09v-.813zm.09-1.584c-.535 0-.971-.452-.971-1.006v-.813c0-.555.436-1.005.97-1.005h.78c.535 0 .969.45.969 1.005v.813c0 .554-.434 1.006-.968 1.006h-.78zm-.09-1.82c0-.049.04-.089.09-.089h.78c.047 0 .087.04.087.09v.813a.09.09 0 0 1-.087.09h-.78a.091.091 0 0 1-.09-.09v-.813zm3.367 1.82c-.535 0-.97-.452-.97-1.006v-.813c0-.555.435-1.005.97-1.005h.781c.534 0 .969.45.969 1.005v.813c0 .554-.435 1.006-.969 1.006h-.781zm-.088-1.82c0-.049.04-.089.088-.089h.781c.048 0 .087.04.087.09v.813c0 .048-.04.09-.087.09h-.781a.091.091 0 0 1-.088-.09v-.813zm.088 5.224c-.535 0-.97-.452-.97-1.006v-.813c0-.555.435-1.006.97-1.006h.781c.534 0 .969.451.969 1.006v.813c0 .554-.435 1.006-.969 1.006h-.781zm-.088-1.82c0-.049.04-.089.088-.089h.781c.048 0 .087.04.087.09v.813c0 .049-.04.09-.087.09h-.781a.09.09 0 0 1-.088-.09v-.813zm3.364 1.82c-.534 0-.969-.452-.969-1.006v-.813c0-.555.435-1.006.969-1.006h.781c.535 0 .97.451.97 1.006v.813c0 .554-.435 1.006-.97 1.006h-.781zM14 14.148c0-.048.04-.089.088-.089h.781a.09.09 0 0 1 .088.09v.813c0 .049-.04.09-.088.09h-.781a.09.09 0 0 1-.088-.09v-.813zm.088-1.584c-.534 0-.969-.452-.969-1.006v-.813c0-.555.435-1.005.969-1.005h.781c.535 0 .97.45.97 1.005v.813c0 .554-.435 1.006-.97 1.006h-.781zM14 10.744c0-.048.04-.089.088-.089h.781a.09.09 0 0 1 .088.09v.813c0 .048-.04.09-.088.09h-.781a.091.091 0 0 1-.088-.09v-.813z"
              fill="#666"
              fillRule="evenodd"
            />
          </svg>

          <span className="durationValue">
            {jobAdsDetailsData?.employmentDescription || " - "}
          </span>
        </div>
      </div>

      <div className="fullRow applyBtnWrapper">
        <Button variant="outlined" size="large" className="floatLeft applyBtn">
          Apply for the job
        </Button>
        <div className="floatLeft socialIconsWrapper">
          <a
            target="_blank"
            rel="noreferrer"
            href={
              "https://www.facebook.com/sharer/sharer.php?u=" +
              window.location.href
            }
            title={"Dela " + jobAdsDetailsData?.title + " på Facebook"}
            className="social-icon facebook-icon"
          >
            <svg width="7" height="15" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.525 14.586H1.508V7.293H0V4.779h1.508V3.27c0-2.05.852-3.27 3.27-3.27H6.79v2.514H5.533c-.941 0-1.004.352-1.004 1.007l-.004 1.258h2.281L6.54 7.293H4.525v7.293"
                fillRule="evenodd"
              />
            </svg>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={
              "https://www.linkedin.com/shareArticle?mini=true&url=" +
              window.location.href
            }
            title={"Dela " + jobAdsDetailsData?.title + " på LinkedIn"}
            className="social-icon linkedin-icon"
          >
            <svg width="13" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M.159 12h2.69V3.903H.159V12zm1.345-9.202c.938 0 1.522-.621 1.522-1.399C3.01.605 2.442 0 1.522 0 .6 0 0 .605 0 1.4c0 .777.583 1.398 1.486 1.398h.018zM4.34 12s.036-7.337 0-8.096h2.692v1.173h-.019c.354-.552.992-1.363 2.443-1.363 1.77 0 3.1 1.156 3.1 3.644V12H9.862V7.669c0-1.089-.39-1.831-1.364-1.831-.743 0-1.186.5-1.38.984-.072.173-.088.415-.088.657V12H4.339z"
                fillRule="evenodd"
              />
            </svg>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={
              "https://twitter.com/intent/tweet?url=" + window.location.href
            }
            title={"Dela " + jobAdsDetailsData?.title + " på Twitter"}
            className="social-icon twitter-icon"
          >
            <svg width="15" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.905 2.91c.005.126.008.254.008.382 0 3.897-2.966 8.391-8.391 8.391A8.354 8.354 0 0 1 0 10.358a5.917 5.917 0 0 0 4.367-1.222 2.951 2.951 0 0 1-2.755-2.048 2.967 2.967 0 0 0 1.331-.05A2.95 2.95 0 0 1 .578 4.146V4.11c.398.22.852.353 1.336.369A2.949 2.949 0 0 1 1 .54 8.374 8.374 0 0 0 7.08 3.622a2.95 2.95 0 0 1 5.026-2.69A5.907 5.907 0 0 0 13.98.216a2.955 2.955 0 0 1-1.297 1.631 5.876 5.876 0 0 0 1.694-.464 5.997 5.997 0 0 1-1.471 1.527"
                fillRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="fullRow desriptionWrapper">
        <h2 className="fullRow descriptionTitle">Your work task</h2>
        {jobAdsDetailsData?.description && (
          <div
            className="fullRow descriptionBody"
            dangerouslySetInnerHTML={{ __html: jobAdsDetailsData?.description }}
          ></div>
        )}
        {!jobAdsDetailsData?.description && (
          <div className="jobDescriptionEmptyWrapper">
            Nu söker vi en engagerad och professionell konsult inom
            {jobAdsDetailsData?.service?.name.toLowerCase()} till uppdrag för
            oss hos vår kund. Dina arbetsuppgifter består av sedvanliga
            arbetsuppgifter som konsult inom
            {jobAdsDetailsData?.service?.name.toLowerCase()}. Det är meriterande
            om du har erfarenhet inom denna typ av uppdrag och bemanning.
          </div>
        )}
      </div>
      {!props.globalConfig?.disableDynamicImagesOnJobDetails && randomImgURL && (
        <div className="fullRow randomImageWrapper">
          <img src={require("../../" + randomImgURL)} alt="random_img" />
        </div>
      )}
      {props.globalConfig?.companyName && (
        <div className="fullRow companyInfoWrapper">
          <h2 className="fullRow companyName">{props.globalConfig.companyName}</h2>
          {props.globalConfig?.companyDetails && (
            <div className="fullRow companyDetails">
              {props.globalConfig.companyDetails}
            </div>
          )}
        </div>
      )}
      {jobAdsDetailsData?.contacts && (
        <div className="fullRow contactInfoWrapper">
          <h2>Contact person(s)</h2>
          <div className="fullRow contactList">
            {jobAdsDetailsData.contacts.map((item, index) => {
              return (
                <div
                  className="fullRow contactPersonInfo"
                  key={"person_" + index}
                >
                  <div className="fullRow personInfoRow contactPersonName">
                    <span className="contactLabel">Name: </span>
                    <span className="nameInfo">
                      {item.title ? item.title + " " : ""}
                      {item.firstName + " " + item.lastName}
                    </span>
                  </div>
                  {item?.phone && (
                    <div className="fullRow personInfoRow contactPersonPhone">
                      <span className="contactLabel">Phone: </span>
                      <a
                        href={item.phone ? "tel:" + item.phone : "#"}
                        className="phoneInfo"
                      >
                        {item.phone}
                      </a>
                    </div>
                  )}
                  {item?.email && (
                    <div className="fullRow personInfoRow contactPersonEmail">
                      <span className="contactLabel">Email: </span>
                      <a
                        href={item.email ? "mailto:" + item.email : "#"}
                        className="emailInfo"
                      >
                        {item.email}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Box>
  );
}
