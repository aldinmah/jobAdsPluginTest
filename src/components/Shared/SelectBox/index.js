import React, { useState, useEffect } from "react";
import { InputLabel, MenuItem, FormControl, Select, Box } from '@mui/material';

import "./style.css";

export default function SelectBox(props) {
  const [dropdownOptions, setDropdownOptions] = useState(props.options);
  const [selectedValue, setSelectedValue] = useState({});

  useEffect(() => {
    setDropdownOptions(props.options);
  }, [props.options]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box className="selectBoxWrapper">
      {dropdownOptions &&
          <FormControl className="controlWrapper">
            <InputLabel id={props.id ? props.id+"Label" : 'labelDropdown_'+Date.now()}>{props.label ? props.label : ''}</InputLabel>
            <Select
              labelId={props.id ? props.id+"SelectLabel" : 'selectLabelDropdown_'+Date.now()}
              id={props.id ? props.id : 'selectDropdown_'+Date.now()}
              value={selectedValue}
              label={props.label ? props.label : ''}
              onChange={handleChange}
              className={props.className}
            >
              <MenuItem value={0}>No Selection</MenuItem>
              {props.options && props.options.map((item, index) => {
                return (
                  <MenuItem key={'option-key-'+item.id} value={item.id}>{item.name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
      }
    </Box>
  );
}
