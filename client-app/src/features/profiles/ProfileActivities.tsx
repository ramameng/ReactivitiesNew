import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { useEffect } from "react";
import { Card, Grid, Header, Tab, TabProps } from "semantic-ui-react";
import { UserActivity } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import ProfileActivitiesCard from "./ProfileActivitiesCard";

const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } },
];

export default observer(function ProfileActivities() {
    const { profileStore } = useStore();
    const { loadUserActivities, userActivities, loadingActivities } = profileStore

    useEffect(() => {
        loadUserActivities();
    }, [loadUserActivities])

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadUserActivities(panes[data.activeIndex as number].pane.key);
    };

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated='left'
                        icon='calendar'
                        content='Activities' />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        menu={{ secondary: true, pointing: true }}
                        panes={panes}
                        onTabChange={(e, data) => handleTabChange(e, data)}
                    />
                    <br />
                    <Tab.Pane loading={loadingActivities}>
                        <Card.Group itemsPerRow={4}>
                            {userActivities.map((activity: UserActivity) => (
                                <ProfileActivitiesCard key={activity.id} activity={activity} />
                            ))}
                        </Card.Group>
                    </Tab.Pane>
                </Grid.Column>
            </Grid>
        </Tab.Pane >
    )
})