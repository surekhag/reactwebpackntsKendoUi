import React,{useState} from 'react';
import { Form, Field, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import SharedButtons from "../SharedComps/SharedButtons"

import {
    FormInput,
    FormMaskedTextBox, FormTextArea
} from '../SharedComps/FormComponents'

import {
     emailValidator, userNameValidator,
    phoneValidator, 
} from '../SharedComps/SharedValidators'

const MultiInputForm = () => {
    const [isDisplayed, setIsDisplayed] = useState(false);
    const HandleShowClick = () => {
        setIsDisplayed(true);
    }
    const HandleHideClick = () => {
        setIsDisplayed(false);
    }
    const handleSubmit = (dataItem: {[name: string]: any}) => alert(JSON.stringify(dataItem, null, 2));
    return (
        <>
        <SharedButtons
            isDisplayed={isDisplayed}
            HandleShowClick={HandleShowClick}
            HandleHideClick={HandleHideClick}
            title1={"Show Validation Form"}
            title2={"Hide Validation Form"} />
      {isDisplayed &&       
      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{width: 400}}>
            <fieldset className={'k-form-fieldset'}>
              <legend className={'k-form-legend'}>Form Details</legend>
              <Field
                id={'userName'}
                name={'userName'}
                label={'User Name'}
                component={FormInput}
                validator={userNameValidator}
                        />
              <Field
                id={'phoneNumber'}
                name={'phoneNumber'}
                label={'Phone Number'}
                mask={'(999) 000-00-00-00'}
                hint={'Hint: Your active phone number.'}
                component={FormMaskedTextBox}
                validator={phoneValidator}
                        />
              <Field
                id={'email'}
                name={'email'}
                label={'Email'}
                hint={'Hint: Enter your personal email address.'}
                type={'email'}
                component={FormInput}
                validator={emailValidator}
                        />
             
              <Field
                id={'comments'}
                name={'comments'}
                label={'Comments'}
                optional={true}
                component={FormTextArea}
                        />
              <span className={'k-form-separator'} />
              
              <div className="k-form-buttons">
                <Button
                  themeColor={'primary'}
                  type={'submit'}
                  disabled={!formRenderProps.allowSubmit}
                            >
                  Submit
                </Button>
                <Button onClick={formRenderProps.onFormReset}>
                  Clear
                </Button>
              </div>
            </fieldset>
          </FormElement>
            )}
        />
        }
        </>
    );
};
export default MultiInputForm