import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

export const MultiSelectWithSearch = (props: any) => {
  const optionLabel = (option: any) => {
    return props.label === 'Courses' || props.label === 'Lessons'
      ? option.name
      : props.label === 'Contracts'
      ? option.full_name
      : props.label === 'Videos'
      ? option.video_file_name
      : props.label === 'Teams'
      ? option.name
      : option;
  };
  const isMultiple = props.multiple || props.multiple === undefined ? true : false;

  const filterOptions = (options: any[], state: { inputValue: string; }) => {
   if(state.inputValue){
    let newOptions: any[] = [];
    options.forEach((element) => {
      let lable = optionLabel(element)
      if (
        lable
          .replace(",", "")
          .toLowerCase()
          .includes(state.inputValue.toLowerCase())
      )
        newOptions.push(element);
    });    
    return newOptions;
  }
  return options;
  };
  return (
    <Autocomplete
      disabled={props.disabled}
      multiple={isMultiple}
      id={props.id}
      options={props.option}
      filterOptions={filterOptions}
      value={isMultiple ? props.value : props.value?.length > 0 ? props.value[0] : null}
      onChange={(_: any, newValue: any) => {
        if (isMultiple) props.setOnChange(newValue);
        else props.setOnChange([newValue]);
      }}
      // onInputChange={(_: any, newValue: any) => {
      //   if (isMultiple) props.setOnChange(newValue);
      //   else props.setOnChange([newValue]);
      // }}
      getOptionLabel={(option: any) => optionLabel(option)}
      renderOption={(props, option) => {
        return ( <li {...props} key={props.id}>
          {  optionLabel(option)}
         </li>);
      }}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          id={props.id}
          name={props.name}
          size={props.size}
          error={props.error}
          label={props.label}
          helperText={props.helperText}
        />
      )}
    />
  );
};
