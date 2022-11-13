import { useContext } from "react";
import { Context } from "../../../../store/Context";
import styled from "styled-components";
import { backendTemplates } from "../../../../assets/data/backendFormData";
import {
  Input,
  Slider,
} from "../codeDataProviderSpecialStyles/CheckboxSwitchStyles";

export default function MainTemplateToChoseForm() {
  const { mainTemplateSelectedRadio, setMainTemplateSelectedRadio } =
    useContext(Context);

  return (
    <Form className="editor-on">
      <InnerFormWrapper>
        {backendTemplates.map((el, i) => {
          return (
            <EditorInputWrapper key={i}>
              <InputWrapper>
                <div onClick={() => setMainTemplateSelectedRadio(el.template)}>
                  <span> WANT TO USE {el.name} ?</span>

                  <Input
                    type="radio"
                    name="name"
                    value={el.template}
                    checked={mainTemplateSelectedRadio === el.template}
                  />
                  <Slider />
                </div>
              </InputWrapper>
            </EditorInputWrapper>
          );
        })}
      </InnerFormWrapper>
    </Form>
  );
}

// STYLED COMPONENTS

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InnerFormWrapper = styled.div`
  margin: 1rem auto;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const EditorInputWrapper = styled.div`
  width: 90%;
  display: flex;
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.label`
  width: 100%;
  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
