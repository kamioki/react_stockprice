import React from "react";
import { useState, useEffect } from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from 'react-chartjs-2';

function Graph({ data }) {
    const labels = data.map(history => history.date).reverse();
    const chartData = {
        labels: labels,
        datasets: [
            {
                type: 'line',
                label: "Close",
                data: data.map(history => history.close).reverse(),
                backgroundColor: "rgba(250, 50, 50, 0.2)",
                borderColor: "grey",
                borderWidth: 1,
                fill: true,
                pointRadius: 0,
            },
            {
                type: 'line',
                label: "High",
                data: data.map(history => history.high).reverse(),
                backgroundColor: ["red"],
                borderColor: "red",
                borderWidth: 1,
                pointRadius: 2,
            },
            {
                type: 'line',
                label: "Low",
                data: data.map(history => history.low).reverse(),
                backgroundColor: ["blue"],
                borderColor: "blue",
                borderWidth: 1,
                pointRadius: 2,
            }
        ]
    }
    const options = {
        legend: {
            display: false,
        },
    }
    console.log(data)
    return (
        <div className="graph">
            <div style={{ width: '100%' }}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}

export default Graph;