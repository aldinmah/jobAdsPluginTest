import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControl
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";

import "./style.css";

export default function ApplyForJobForm(props) {
  const [jobAdDetailsData, setjobAdDetailsData] = useState(props.jobAdDetailsData);
  const [firstName, setFirstName] = useState("");
  const [firstNameValidationFailed, setFirstNameValidationFailed] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameValidationFailed, setLastNameValidationFailed] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValidationFailed, setEmailValidationFailed] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneValidationFailed, setPhoneValidationFailed] = useState(false);
  const [isTocPrivacyAdded, setIsTocPrivacyAdded] = useState(false);
  const [companyTocPrivacyAccepted, setCompanyTocPrivacyAccepted] = useState(false);
  const [companyTocPrivacyValidationFailed, setCompanyTocPrivacyValidationFailed] = useState(false);
  

  useEffect(() => {
    setjobAdDetailsData(props.jobAdDetailsData);
    if(props.globalConfig?.companyTermsAndConditionsURL && props.globalConfig?.companyPrivacyPolicyURL)
      setIsTocPrivacyAdded(true)
    else
      setIsTocPrivacyAdded(false)
  }, [props.jobAdDetailsData]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isFormValid = () => {
    let isValid = true;

    if (firstName === "") {
      isValid = false;
      setFirstNameValidationFailed(true);
    } else setFirstNameValidationFailed(false);

    if (lastName === "") {
      isValid = false;
      setLastNameValidationFailed(true);
    } else setFirstNameValidationFailed(false);

    if (email === "") {
      setEmailErrorMsg("Email is required");
      setEmailValidationFailed(true);
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailErrorMsg("Enter valid email address");
      setEmailValidationFailed(true);
      isValid = false;
    } else {
      setEmailErrorMsg("");
      setEmailValidationFailed(false);
    }

    if (phone === "") {
      setPhoneValidationFailed(true);
      isValid = false;
    } else setPhoneValidationFailed(false);

    return isValid;
  };

  const isSubmitBtnDisabled = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      !validateEmail(email) ||
      phone === "" ||
      (isTocPrivacyAdded && !companyTocPrivacyAccepted)
    )
      return true;
    return false;
  };

  const submitJobApplicationHandler = () => {
    if (isFormValid()) {
      console.log("submit form");
    }
  };

  return (
    <Box component="form" className="fullRow applyForJobFormWrapper">
      {jobAdDetailsData?.title &&
        <div className="fullRow formTitleWrapper">
          <h2>{jobAdDetailsData.title}</h2>
        </div>
      }
      <div className="inputTextWrapper">
        <TextField
          required
          id="outlined-required"
          label="First name"
          className="inputField fnameInputField"
          value={firstName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon />
              </InputAdornment>
            ),
          }}
          helperText={
            firstNameValidationFailed ? "First name is required" : undefined
          }
          onChange={(event) => {
            setFirstName(event.target.value);
            setFirstNameValidationFailed(
              event.target.value === "" ? true : false
            );
          }}
          onBlur={(event) => {
            let newValue = event.target.value;
            if (newValue && newValue.length) {
              newValue = newValue.trimStart().trimEnd();
            }

            setFirstName(newValue);
            setFirstNameValidationFailed(newValue === "" ? true : false);
          }}
          error={firstNameValidationFailed}
        />
      </div>
      <div className="inputTextWrapper">
        <TextField
          required
          id="outlined-required"
          label="Last name"
          className="inputField lnameInputField"
          value={lastName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon />
              </InputAdornment>
            ),
          }}
          helperText={
            lastNameValidationFailed ? "Last name is required" : undefined
          }
          onChange={(event) => {
            setLastName(event.target.value);
            setLastNameValidationFailed(
              event.target.value === "" ? true : false
            );
          }}
          onBlur={(event) => {
            let newValue = event.target.value;
            if (newValue && newValue.length) {
              newValue = newValue.trimStart().trimEnd();
            }

            setLastName(newValue);
            setLastNameValidationFailed(newValue === "" ? true : false);
          }}
          error={lastNameValidationFailed}
        />
      </div>
      <div className="inputTextWrapper">
        <TextField
          required
          id="outlined-required"
          label="Email"
          className="inputField emailInputField"
          value={email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
          helperText={emailErrorMsg}
          onChange={(event) => {
            setEmail(event.target.value);
            if (event.target.value === "") {
              setEmailErrorMsg("Email is required");
              setEmailValidationFailed(true);
            } else {
              setEmailErrorMsg("");
              setEmailValidationFailed(false);
            }
          }}
          onBlur={(event) => {
            let newValue = event.target.value;
            if (newValue && newValue.length) {
              newValue = newValue.trimStart().trimEnd();
            }

            setEmail(newValue);
            if (newValue === "") {
              setEmailErrorMsg("Email is required");
              setEmailValidationFailed(true);
            } else if (!validateEmail(newValue)) {
              setEmailErrorMsg("Enter valid email address");
              setEmailValidationFailed(true);
            } else {
              setEmailErrorMsg("");
              setEmailValidationFailed(false);
            }
          }}
          error={emailValidationFailed}
        />
      </div>
      <div className="inputTextWrapper">
        <TextField
          required
          id="outlined-required"
          label="Phone"
          className="inputField phoneInputField"
          value={phone}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIphoneOutlinedIcon />
              </InputAdornment>
            ),
          }}
          helperText={phoneValidationFailed ? "Phone is required" : undefined}
          onChange={(event) => {
            setPhone(event.target.value);
            setPhoneValidationFailed(event.target.value === "" ? true : false);
          }}
          onBlur={(event) => {
            let newValue = event.target.value;
            if (newValue && newValue.length) {
              newValue = newValue.trimStart().trimEnd();
            }

            setPhone(newValue);
            setPhoneValidationFailed(newValue === "" ? true : false);
          }}
          error={phoneValidationFailed}
        />
      </div>
      {isTocPrivacyAdded &&
          <div className="fullRow companyPrivacyWrapper">
            <FormControl
              required
              error={companyTocPrivacyValidationFailed}
            >
              
            <FormControlLabel
              control={
                <Checkbox 
                  onChange={(e)=>{
                    setCompanyTocPrivacyAccepted(!companyTocPrivacyAccepted)
                    if(!e.currentTarget.checked){
                      setCompanyTocPrivacyValidationFailed(true)
                    }
                    else
                      setCompanyTocPrivacyValidationFailed(false)
                  }}
                  checked={companyTocPrivacyAccepted}
                />
              }            
              label={
                <div className="checkBoxLabel">
                  <span>I agree to the </span>
                  {props.globalConfig?.companyTermsAndConditionsURL && (
                    <a
                      href={props.globalConfig?.companyTermsAndConditionsURL}
                      target="_blank"
                      style={props.customConfigStyling.getLinkElementStyling()}
                    >
                      Terms & Conditions
                    </a>
                  )}
                  {props.globalConfig?.companyTermsAndConditionsURL &&
                    props.globalConfig?.companyPrivacyPolicyURL && (
                      <span> and </span>
                    )}
                  {props.globalConfig?.companyPrivacyPolicyURL && (
                    <a
                      href={props.globalConfig?.companyPrivacyPolicyURL}
                      target="_blank"
                      style={props.customConfigStyling.getLinkElementStyling()}
                    >
                      Privacy Policy
                    </a>
                  )}
                </div>
              }
            />
            {companyTocPrivacyValidationFailed &&
              <FormHelperText className="companyAcceptErrorMsg">
                You must accept the {props.globalConfig?.companyTermsAndConditionsURL ? 'Terms & Conditions' : ''}
                    {(props.globalConfig?.companyTermsAndConditionsURL && props.globalConfig?.companyPrivacyPolicyURL) ? ' and ' : ''}
                    {props.globalConfig?.companyPrivacyPolicyURL ? 'Privacy Policy' : ''}
              </FormHelperText>
             }
            </FormControl>
          </div>
        }
      <div className="submitJobBtnWrapper">
        <Button
          size="medium"
          className="floatLeft navBackBtn"
          onClick={() => {
            props.setShowApplyToJobForm(false);
          }}
          style={props.customConfigStyling.getSecondaryButtonStyling()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
          Back
        </Button>
        <Button
          variant="contained"
          size="large"
          className="floatLeft submitJobApplicationBtn"
          style={props.customConfigStyling.getPrimaryButtonStyling()}
          onClick={submitJobApplicationHandler}
          disabled={isSubmitBtnDisabled()}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}
