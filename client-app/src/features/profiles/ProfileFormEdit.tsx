import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Profile } from "../../app/models/profile";
import * as Yup from 'yup';
import { useStore } from "../../app/stores/store";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileFormEdit({ setEditMode }: Props) {
    const { profileStore: { profile, updateProfile } } = useStore();

    const validationSchema = Yup.object({
        displayName: Yup.string().required()
    })

    function handleFormSubmit(profile: Partial<Profile>) {
        updateProfile(profile).then(() => {
            setEditMode(false);
        });
    }

    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{
                displayName: profile?.displayName, bio:
                    profile?.bio
            }}
            onSubmit={values => handleFormSubmit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='Display Name' name='displayName' />
                    <MyTextArea rows={3} placeholder='Add bio here' name='bio' />
                    <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting}
                        floated='right' positive type='submit' content='Update profile' />
                </Form>
            )}
        </Formik>
    )
})