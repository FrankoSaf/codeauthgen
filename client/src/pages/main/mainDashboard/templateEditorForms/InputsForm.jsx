import '../codeDataProviderSpecialStyles/InputsFormSpecialStyles.css';
import React, { useContext } from 'react';
import { Context } from '../../../../store/Context.js';
import { inputTypes } from '../../../../assets/data/editorData.js';
import CheckboxSwitch from '../codeDataProviderSpecialStyles/CheckboxSwitchShowValidation';
import CheckboxSwitchRequired from '../codeDataProviderSpecialStyles/CheckboxSwitchRequired';
import CheckboxSwitchUnique from '../codeDataProviderSpecialStyles/CheckboxSwitchUnique';
import styled from 'styled-components';

export default function InputsForm() {
  const {
    setInput,
    setArrOfInputs,
    arrOfInputs,
    input,
    inputType,
    setInputType,
    setShowValidation,
    showValidation,
    inputError,
    setInputError,
    setInputsDisplayOpen,
    darkTheme,
  } = useContext(Context);

  // CREATES EACH INPUT AND SET IT TO THE ARRAY OF INPUTS
  const createInputsHandler = (e) => {
    e.preventDefault();
    console.log(input);
    if (input.name === undefined || input.name?.trim().length === 0) {
      setInputError('Name should not be empty and unique');
      return arrOfInputs;
    } else if (
      arrOfInputs.filter((item) => item.name === input.name).length > 0
    ) {
      setInputError('Name should not be empty and unique');
      return arrOfInputs;
    } else if (input.type === undefined) {
      setInputError('Please select a type');
      return arrOfInputs;
    } else {
      setInputsDisplayOpen(true);
      setArrOfInputs((prev) => {
        setInputError('');
        setShowValidation((prev) => ({ ...prev, isChecked: false }));
        setInput({ required: false, unique: false, type: 'button' });
        return [...prev, input];
      });
    }
    e.target.reset();
  };

  // TRACKING THE CHANGE OF INPUT TYPES AND SETTING THEM TO THE STATE
  const onInputChangeHandler = (e) => {
    let inputValue = e.target.value;

    if (e.target.name === 'required' || e.target.name === 'unique')
      inputValue = e.target.checked;
    if (e.target.name === 'type') setInputType(inputValue);
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: inputValue,
      };
    });
  };

  return (
    <Form
      onSubmit={createInputsHandler}
      className={darkTheme ? 'editor-on dark-theme' : 'editor-on light-theme'}
    >
      <InnerFormWrapper className={darkTheme ? 'dark-theme' : 'light-theme'}>
        <LabelInputWrapper
          id={darkTheme ? 'nameInputDark' : 'nameInputLight'}
          className={darkTheme ? 'dark-theme' : 'light-theme'}
        >
          {/* <label htmlFor="">Name: </label> */}
          <input
            type='text'
            name='name'
            placeholder={inputType}
            onChange={onInputChangeHandler}
          />
        </LabelInputWrapper>
        <LabelInputWrapper className={darkTheme ? 'dark-theme' : 'light-theme'}>
          {' '}
          <select
            name='type'
            id='type'
            onChange={onInputChangeHandler}
            style={{
              backgroundColor: !darkTheme ? 'white' : 'var(--backgroundColor)',
            }}
          >
            <option value='' selected disabled>
              {' '}
              SELECT INPUT TYPE
            </option>
            {inputTypes.map((el, i) => {
              return (
                <option value={el} key={i}>
                  {el}
                </option>
              );
            })}
          </select>
        </LabelInputWrapper>
        {inputError && <span className='error'>{inputError}</span>}

        <LabelInputWrapper className={darkTheme ? 'dark-theme' : 'light-theme'}>
          {' '}
          <span>WANT VALIDATION ?</span>
          <CheckboxSwitch name='validation' />
        </LabelInputWrapper>
        {/* show validation part */}
        {showValidation.isChecked && (
          <>
            <LabelInputWrapper
              className={darkTheme ? 'dark-theme' : 'light-theme'}
            >
              <span>REQUIRED ?</span>
              <CheckboxSwitchRequired
                name='required'
                checked={input.required}
              />
            </LabelInputWrapper>
            <LabelInputWrapper
              className={darkTheme ? 'dark-theme' : 'light-theme'}
            >
              {' '}
              <span>UNIQUE ?</span>
              <CheckboxSwitchUnique name='unique' checked={input.unique} />
            </LabelInputWrapper>
          </>
        )}
        <SubmitBtn className={darkTheme ? 'dark-theme' : 'light-theme'}>
          Generate
        </SubmitBtn>
      </InnerFormWrapper>
    </Form>
  );
}

// STYLED COMPONENTS

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InnerFormWrapper = styled.div`
  margin: 0rem auto;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  .error {
    color: tomato;
    margin-bottom: 1rem;
  }
`;

const LabelInputWrapper = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  input,
  select {
    width: 100%;
    border: none;
    background: none;
    border-radius: 0.2rem;
    padding: 0.4rem;
    font-size: 1rem;
  }
  input[type='text']:focus {
    background: none;
    border: #0ba47e 1px solid;
    outline: none;
  }
  select:focus {
    border: #0ba47e 1px solid;
    outline: none;
  }
  &.light-theme {
    label {
      color: var(--backgroundColor);
    }
    input,
    select {
      border: solid 1px var(--backgroundColor);
      color: var(--backgroundColor);
    }
  }
  &.dark-theme {
    label {
      color: var(--textColor);
    }
    input,
    select {
      border: solid 1px var(--textColor);
      color: var(--textColor);
    }
  }
`;

const SubmitBtn = styled.button`
  background: var(--warningColor);
  width: 10rem;
  height: 1.2rem;
  border-radius: 0.2rem;
  color: white;
  font-weight: 600;
  font-family: 'Helvetica', sans-serif;
  font-size: 0.7rem;
  transition: ease-in 0.1s all;
  letter-spacing: 2px;
  cursor: pointer;
  border: none;
  &:hover {
    box-shadow: 0 0 15px var(--warningColor);
  }
  &.light-theme {
    color: var(--backgroundColor);
    background-color: var(--warningColorLighterHover);
    &:active {
      background-color: var(--backgroundColor);
    }
    &:hover {
      background-color: var(--warningColor);
      color: white;
    }
  }
  &.dark-theme {
    &:active {
      background-color: white;
    }
    &:hover {
      background-color: var(--warningColorLighterHover);
      color: white;
    }
  }
`;
