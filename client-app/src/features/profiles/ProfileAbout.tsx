import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import ProfileFormEdit from "./ProfileFormEdit";

interface Props {
    profile: Profile;
}

export default observer(function ProfileAbout({ profile }: Props) {
    const { profileStore: { isCurrentUser } } = useStore();
    const [editProfile, setEditProfile] = useState(false);

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content={`About ${profile.displayName}`} />
                    {isCurrentUser && (
                        <Button floated='right' basic
                            content={editProfile ? 'Cancel' : 'Edit Profile'}
                            onClick={() => setEditProfile(!editProfile)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    <>
                        {editProfile ? (
                            <ProfileFormEdit setEditMode={setEditProfile} />
                        ) : (
                            <p style={{ whiteSpace: 'pre-wrap' }}>
                                {profile.bio}
                            </p>
                        )}
                    </>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})