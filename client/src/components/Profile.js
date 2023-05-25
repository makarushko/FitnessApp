import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Typography} from '@mui/material';

const Profile = () => {
    const [user, setUser] = useState(localStorage.getItem('token'));
    const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [chest, setChest] = useState('');
    const [waist, setWaist] = useState('');
    const [hips, setHips] = useState('');
    const [bodyMassIndex, setBodyMassIndex] = useState('');

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user');
            setUser(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setAge(response.data.age);
            setGender(response.data.gender);
            setHeight(response.data.height);
            setWeight(response.data.weight);
            setChest(response.data.chest);
            setWaist(response.data.waist);
            setHips(response.data.hips);
            setBodyMassIndex(response.data.bodyMassIndex);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put('http://localhost:8080/api/user', {
                firstName,
                lastName,
                age,
                gender,
                height,
                weight,
                chest,
                waist,
                hips,
                bodyMassIndex,
            });
            // Обработка успешного обновления данных
        } catch (error) {
            console.error(error);
        }
    };

    function handleWeightChange() {

    }

    return (
        <div>
            <div>
                <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '40px' } }} mb="23px" mt="30px">
                    About you:
                </Typography>
                <Typography fontWeight="600" fontSize="20px">
                <p>First Name:</p>
                <p>Last Name:</p>
                <p>Age:</p>
                <p>Gender:</p>
                <p>Height:</p>
                <p>Weight:</p>
                </Typography>
                {/*<p>BMI (Body Mass Index): {bodyMassIndex.toFixed(2)}</p>*/}
            </div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <TextField
                            label="First Name"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Last Name"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            size="medium"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Gender"
                            onChange={(event) => setGender(event.target.value)}
                            required
                        >
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Age"
                            value={age}
                            onChange={(event) => setAge(event.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Height (cm)"
                            value={height}
                            onChange={(event) => setHeight(event.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Weight (kg)"
                            value={weight}
                            onChange={(event) => setWeight(event.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Chest Circumference"
                            value={chest}
                            onChange={(event) => setChest(event.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Waist Circumference"
                            value={waist}
                            onChange={(event) => setWaist(event.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Hip Circumference"
                            value={hips}
                            onChange={(event) => setHips(event.target.value)}
                            required
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                    Save
                </Button>
            </form>

            <div>
                <h2>Weight Change Chart</h2>
                {/* Implement a chart based on weightHistory */}
            </div>
        </div>
    );
};

export default Profile;
