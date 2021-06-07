import React from 'react'
import { Card, CardHeader, Typography, CardContent } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import useStyles from './styles';
import useTransactions from '../../useTransactions';

const Details = (props) => {
    const classes = useStyles();
    const { total, chartData } = useTransactions(props.title);

    return (
        <div>
            <Card className={props.title === "Income" ? classes.income : classes.expense}>
                <CardHeader title={props.title} />
                <CardContent>
                    <Typography variant="h5">${total}</Typography>
                    <Doughnut data={chartData} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Details;
