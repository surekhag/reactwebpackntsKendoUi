import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Form, Field, FormElement, FieldRenderProps, FormRenderProps } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from "@progress/kendo-react-buttons";

import { Fade } from "@progress/kendo-react-animation";

const Styles = require("../Styles/BasicForm.css");
const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);
import {
    Notification,
    NotificationGroup,
} from "@progress/kendo-react-notification";

interface State {
    success: boolean;
}

const emailValidator = (value: string) => (emailRegex.test(value) ? "" : "Please enter a valid email.");
const EmailInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
        <div>
            <Input {...others} />
            {
                visited && validationMessage &&
                (<Error>{validationMessage}</Error>)
            }
        </div>
    );
};

const NameRegex: RegExp = new RegExp(/^[A-Za-z]+$/);
const nameValidator = (value: string) => (NameRegex.test(value) ? "" : "Please enter a valid name.");

const FirstNameInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
        <div>
            <Input {...others} />
            {
                visited && validationMessage &&
                (<Error>{validationMessage}</Error>)
            }
        </div>
    );
};

const BasicForm = () => {
    const [state, setState] = React.useState<State>({
        success: false
    });

    const { success } = state;
    const handleSubmit = (dataItem: { [name: string]: any }) => {
        // console.log("data", dataItem)
        const node = document.getElementById("clear")
        node.click();
        setState({ ...state, success: true })
    }

    return (<>
        <h3>Form Implementation in Kendo UI</h3>
        <Form
            onSubmit={handleSubmit}
            render={(formRenderProps: FormRenderProps) => (
                <FormElement style={{ maxWidth: 650 }}>
                    <fieldset className={'k-form-fieldset'}>
                        <legend className={'k-form-legend sub-text'}>Please fill in the details:</legend>
                        <div className="mb-3">
                            <Field name={'firstName'} component={FirstNameInput} label={'First name'}
                                validator={nameValidator} />
                        </div>

                        <div className="mb-3">
                            <Field name={'lastName'} component={Input} label={'Last name'} />
                        </div>
                        <div className="mb-3">
                            <Field name={'desn'} component={Input} label={'Designation'} />
                        </div>
                        <div className="mb-3">
                            <Field name={'empId'} component={Input} label={'Employee Id'} />
                        </div>

                        <div className="mb-3">
                            <Field name={"email"} type={"email"} component={EmailInput} label={"Email"}
                                validator={emailValidator} />
                        </div>
                    </fieldset>
                    <div className="k-form-buttons">
                        <Button
                            type={'submit'}
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                            disabled={!formRenderProps.allowSubmit}
                        >
                            Submit
                        </Button>

                        <Button id="clear" onClick={formRenderProps.onFormReset}>Clear</Button>

                    </div>
                </FormElement>
            )}
        />
        <NotificationGroup
            style={{
                right: 0,
                top: 0,
                alignItems: "flex-start",
                flexWrap: "wrap-reverse",
            }}
        >
            <Fade>
                {success && (
                    <Notification
                        type={{ style: "success", icon: true }}
                        closable={true}
                        onClose={() => setState({ ...state, success: false })}
                    >
                        <span>Form detail has been saved!</span>
                    </Notification>
                )}
            </Fade>
        </NotificationGroup>
    </>
    );
};
export default BasicForm;