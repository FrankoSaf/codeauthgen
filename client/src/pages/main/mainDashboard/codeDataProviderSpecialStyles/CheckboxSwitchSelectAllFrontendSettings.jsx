import React, { useContext } from 'react';
import { Context } from '../../../../store/Context.js';
import { Input, Slider, InputWrapper } from './CheckboxSwitchStyles';
export default function CheckboxSwitchSelectAllBackendSettings() {
  const { setArrOfFrontEnd } = useContext(Context);

  // SELECT ALL FRONTEND CHECKBOXES
  const selectAllFrontendHandler = (e) => {
    let selectAll = document.querySelector('.selectAllCheckBoxesFrontend');
    if (selectAll.checked) {
      document.querySelectorAll('.checkBoxFrontEnd').forEach((el) => {
        el.checked = true;
        setArrOfFrontEnd((prev) => {
          return [...prev, { [el.name]: el.checked }];
        });
      });
    } else if (selectAll.checked === false) {
      document.querySelectorAll('.checkBoxFrontEnd').forEach((el) => {
        el.checked = false;
        setArrOfFrontEnd([]);
      });
    }
  };
  return (
    <InputWrapper>
      <Input
        type='checkbox'
        name='selectAll'
        id=''
        onChange={selectAllFrontendHandler}
        className='selectAllCheckBoxesFrontend'
      />
      <Slider />
    </InputWrapper>
  );
}
