import React, { useEffect, useState, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Legend, Tooltip } from 'chart.js';
import { Radio, RadioGroup, FormControlLabel, Slider, TextField, InputAdornment } from '@mui/material';
import "./sipCalculator.css"
Chart.register(DoughnutController, ArcElement, Legend, Tooltip);

function SipCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [investmentPeriod, setInvestmentPeriod] = useState(5);
    const [growthRate, setGrowthRate] = useState(12);
    const [investmentOption, setInvestmentOption] = useState('I know investment amount');
    const [goalAmount, setGoalAmount] = useState(1000000);
    const [futureValue, setFutureValue] = useState(0);
    const [invested, setInvested] = useState(0);
    const [returnedValue, setReturnedValue] = useState(0);
    const chartRef = useRef(null);
    const goalChartRef = useRef(null);

    const handleMonthlyInvestmentChange = (event, newValue) => {
        setMonthlyInvestment(newValue);
    };

    const handleInvestmentPeriodChange = (event, newValue) => {
        setInvestmentPeriod(newValue);
    };

    const handleGrowthRateChange = (event, newValue) => {
        setGrowthRate(newValue);
    };

    const handleGoalAmountChange = (event, newValue) => {
        setGoalAmount(newValue);
    };

    const handleOptionChange = (event) => {
        setInvestmentOption(event.target.value);
    };

    useEffect(() => {
        if (investmentOption === 'I know investment amount') {
            calculateFinalAmount();
        } else {
            calculateInstallmentAmount();
        }
    }, [monthlyInvestment, investmentPeriod, growthRate, investmentOption, goalAmount]);

    const calculateFinalAmount = () => {
        const p = parseFloat(monthlyInvestment);
        const i = (parseFloat(growthRate) / 100) / 12;
        const n = parseFloat(investmentPeriod) * 12;
        const finalAmount = p * (((1 + i) ** n) - 1) * ((i + 1) / i);
        const investedValue = monthlyInvestment * investmentPeriod * 12;
        const returnValue = finalAmount - investedValue;
        generateChart(finalAmount, investedValue, returnValue);
        setFutureValue(finalAmount)
        setInvested(investedValue)
        setReturnedValue(returnValue)

    };

    const calculateInstallmentAmount = () => {
        const i = (parseFloat(growthRate) / 100) / 12;
        const n = parseFloat(investmentPeriod) * 12;
        const monthlyInvestment = goalAmount / ((((1 + i) ** n) - 1) * ((i + 1) / i));
        const investedValue = monthlyInvestment * investmentPeriod * 12;
        const returnValue = goalAmount - investedValue;
        generateChartforGoalAmount(investedValue, returnValue);
        setInvested(monthlyInvestment)
        setReturnedValue(returnValue)
    };

    const generateChart = (a, b, c) => {
        const ctx = document.getElementById('investmentChart').getContext('2d');
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Total', 'Invested', 'Return'],
                datasets: [{
                    label: 'Investment Data',
                    data: [a, b, c],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            }
        });
    };

    const generateChartforGoalAmount = (a, b) => {
        const ctx = document.getElementById('goalChart').getContext('2d');
        if (goalChartRef.current) {
            goalChartRef.current.destroy();
        }
        goalChartRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Invested', 'Return'],
                datasets: [{
                    label: 'Investment Data',
                    data: [a, b],
                    backgroundColor: [
                        'rgb(221,221,221)',
                        'rgb(104,128,200)',

                    ],
                    hoverOffset: 4
                }]
            }
        });
    };



    return (


        <>
            <h1 className="main-title">SIP Calculator</h1>
            <h1 className="sub-title">
                Fiydaa's SIP calculator allows you to calculate the expected amount you will accumulate on your monthly investment.
            </h1>

            <div className="container w-5/6">
                <h1 className="section-title">
                    Calculate the future value of your SIP investment
                </h1>

                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={investmentOption}
                    onChange={handleOptionChange}
                // className="radio-group"
                >
                    <div className="radio-group">
                        <FormControlLabel
                            value="I know investment amount"
                            control={<Radio sx={{ '&.Mui-checked': { color: '#0043e9' }, '& .MuiSvgIcon-root': { color: '#0043e9' } }} />}
                            label={
                                <p className="radio-label">
                                    I know investment amount
                                </p>
                            }
                        />
                        <FormControlLabel
                            value="I know my goal amount"
                            control={<Radio sx={{ '&.Mui-checked': { color: '#0043e9' }, '& .MuiSvgIcon-root': { color: '#0043e9' } }} />}
                            label={
                                <p className="radio-label">
                                    I know my goal amount
                                </p>
                            }
                        /></div>
                </RadioGroup>

                <div className="input-group">
                    {investmentOption === 'I know investment amount' && (
                        <div className="input-wrapper">
                            <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className="input-title">
                                    I want to invest monthly
                                </p>
                                <TextField
                                    id="monthly-investment"
                                    value={monthlyInvestment}
                                    onChange={(e) => handleMonthlyInvestmentChange(e, parseFloat(e.target.value))}
                                    variant="standard"
                                    className="text-field"
                                    InputProps={{
                                        className: 'text-field-input',
                                    }}
                                />
                            </div>
                            <div>
                                <Slider
                                    value={monthlyInvestment}
                                    onChange={handleMonthlyInvestmentChange}
                                    step={500}
                                    min={500}
                                    max={100000}
                                    valueLabelDisplay="auto"
                                    className="slider"
                                />
                            </div>
                        </div>
                    )}

                    {investmentOption === 'I know my goal amount' && (
                        <div className="input-wrapper">
                            <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className="input-title">
                                    I want to save
                                </p>
                                <TextField
                                    id="goal-amount"
                                    value={goalAmount}
                                    onChange={(e) => handleGoalAmountChange(e, parseFloat(e.target.value))}
                                    variant="standard"
                                    className="text-field"
                                    InputProps={{
                                        className: 'text-field-input',
                                    }}
                                />
                            </div>
                            <div>
                                <Slider
                                    value={goalAmount}
                                    onChange={handleGoalAmountChange}
                                    step={500}
                                    min={10000}
                                    max={5000000}
                                    valueLabelDisplay="auto"
                                    className="slider"
                                />
                            </div>
                        </div>
                    )}

                    <div className="input-wrapper">
                        <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p className="input-title">
                                For a period of
                            </p>
                            <TextField
                                id="investment-period"
                                type="number"
                                value={investmentPeriod}
                                onChange={(e) => handleInvestmentPeriodChange(e, parseFloat(e.target.value))}
                                variant="standard"
                                className="text-field"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" style={{ fontFamily: "Poppins", fontSize: 11 }}>Yr</InputAdornment>,
                                }}
                            />
                        </div>
                        <div>
                            <Slider
                                value={investmentPeriod}
                                onChange={handleInvestmentPeriodChange}
                                step={1}
                                min={1}
                                max={50}
                                valueLabelDisplay="auto"
                                className="slider"
                            />
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p className="input-title">
                                Growth Rate
                            </p>
                            <TextField
                                id="growth-rate"
                                value={growthRate}
                                onChange={(e) => handleGrowthRateChange(e, parseFloat(e.target.value))}
                                variant="standard"
                                className="text-field"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" style={{ fontFamily: "Poppins", fontSize: 22 }}>%</InputAdornment>,
                                }}
                            />
                        </div>
                        <div>
                            <Slider
                                value={growthRate}
                                onChange={handleGrowthRateChange}
                                step={1}
                                min={1}
                                max={25}
                                valueLabelDisplay="auto"
                                className="slider"
                            />
                        </div>
                    </div>
                </div>

                <div className="result-container">
                    <div className="chart-container">
                        {investmentOption === 'I know investment amount' && (
                            <div className="chartDiv">
                                <canvas id="investmentChart"></canvas>
                            </div>
                        )}
                        {investmentOption === 'I know my goal amount' && (
                            <div className="chartDiv">
                                <canvas id="goalChart"></canvas>
                            </div>
                        )}
                    </div>
                    <div className="details-container">
                        {investmentOption === 'I know investment amount' && (
                            <>
                                <div className="details-group">
                                    <p className="details-title">Future Value</p>
                                    <p className="details-value">₹{futureValue.toFixed(2)}</p>
                                </div>

                                <div className="details-group">
                                    <p className="details-title">Invested Amount</p>
                                    <p className="details-value">₹{invested.toFixed(2)}</p>
                                </div>

                                <div className="details-group">
                                    <p className="details-title">Estimated Returns</p>
                                    <p className="details-value">₹{returnedValue.toFixed(2)}</p>
                                </div>
                            </>
                        )}
                        {investmentOption === 'I know my goal amount' && (
                            <>
                                <div className="details-group">
                                    <p className="details-title">Goal Amount</p>
                                    <p className="details-value">₹{goalAmount.toFixed(2)}</p>
                                </div>

                                <div className="details-group">
                                    <p className="details-title">Invest Monthly</p>
                                    <p className="details-value">₹{invested.toFixed(2)}</p>
                                </div>

                                <div className="details-group">
                                    <p className="details-title">Interest Earned</p>
                                    <p className="details-value">₹{returnedValue.toFixed(2)}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default SipCalculator
