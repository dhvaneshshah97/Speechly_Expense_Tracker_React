import React from 'react'
import { Card, CardHeader, Typography, CardContent } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import useStyles from './styles';

const Details = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Card className={props.title === "Income" ? classes.income : classes.expense}>
                <CardHeader title={props.title} />
                <CardContent>
                    <Typography variant="h5">$100</Typography>
                    {/* <Doughnut data="data" /> */}
                </CardContent>
            </Card>
        </div>
    )
}

export default Details;
