import React, { useState, useContext, useEffect } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import useStyles from './styles';
import formatDate from '../../../utils/formatDate';
import { ExpenseTrackerContext } from '../../../context/context';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import { useSpeechContext } from '@speechly/react-client';
import CustomizedSnackbar from '../../Snackbar/Snackbar';

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()),
}


const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const { addTransaction } = useContext(ExpenseTrackerContext);
    // Our speech words stored in segment below
    const { segment } = useSpeechContext();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense' });
            } else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income' });
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                createTransaction();
            } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                setFormData(initialState);
            }

            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value });
                        break;
                    case 'category':
                        if (incomeCategories.map((iC) => iC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Income', category });
                        } else if (expenseCategories.map((eC) => eC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Expense', category });
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: e.value });
                        break;
                    default:
                        break;
                }
            });

            if (segment.isFinal && formData.amount && formData.type && formData.date && formData.category) {
                createTransaction();
            }
        }
    }, [segment]);


    const createTransaction = async () => {
        // console.log();
        if (formData.amount === '' || !formData.date.includes('-') || formData.category === '') {
            setOpen(true);
            setError(true);
            return;
        };

        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }

        setOpen(true);
        addTransaction(transaction);
        setFormData(initialState);
    }

    const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories;

    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen} error={error} setError={setError} />
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle1" gutterBottom style={{ marginTop: '10px' }}>
                    {segment && <> {segment.words.map((w) => w.value).join(' ')}  </>}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} >
                        <MenuItem value="Income" >Income</MenuItem>
                        <MenuItem value="Expense" >Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} >
                <FormControl fullWidth >
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} >
                        {
                            selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })} />
            </Grid>
            <Button classname={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction} >Create</Button>
        </Grid>
    )
}

export default Form;
