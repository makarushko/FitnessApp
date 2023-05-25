import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';

const Chart = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [weightData, setWeightData] = useState([]);
    const [bmiData, setBmiData] = useState([]);

    useEffect(() => {
        axios
            .get('/api/user/1') // Замените "1" на актуальный идентификатор пользователя
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const weightChartData = [];
        const bmiChartData = [];
        user.measurements.forEach((measurement) => {
            weightChartData.push({ x: measurement.date, y: measurement.weight });
            const bmi = measurement.weight / ((user.height / 100) ** 2);
            bmiChartData.push({ x: measurement.date, y: bmi });
        });
        setWeightData(weightChartData);
        setBmiData(bmiChartData);
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <Typography variant="h6">Weight Chart</Typography>
            <Line
                data={{
                    datasets: [
                        {
                            label: 'Weight',
                            data: weightData,
                            fill: false,
                            borderColor: 'blue',
                            tension: 0.1,
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                                tooltipFormat: 'll',
                            },
                            title: {
                                display: true,
                                text: 'Date',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Weight (kg)',
                            },
                        },
                    },
                }}
            />

            <Typography variant="h6">BMI Chart</Typography>
            <Line
                data={{
                    datasets: [
                        {
                            label: 'BMI',
                            data: bmiData,
                            fill: false,
                            borderColor: 'green',
                            tension: 0.1,
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                                tooltipFormat: 'll',
                            },
                            title: {
                                display: true,
                                text: 'Date',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'BMI',
                            },
                        },
                    },
                }}
            />
        </Box>
    );
};

export default Chart;
