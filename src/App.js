import React from 'react'
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import Details from './components/Details/Details';
import Main from './components/Main/Main';

const App = () => {
    const classes = useStyles();
    return (
        <div>
            <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{ height: '85vh', marginBottom: '50px' }} >
                <Grid item xs={12} sm={3} className={classes.mobile} >
                    <Details title="Income" />
                </Grid>
                <Grid item xs={12} sm={4} className={classes.main}>
                    <Main />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.desktop}>
                    <Details title="Income" />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.last}>
                    <Details title="Expense" />
                </Grid>
            </Grid>
            <PushToTalkButtonContainer >
                <PushToTalkButton size="5rem" />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </div>
    );
}

export default App;
