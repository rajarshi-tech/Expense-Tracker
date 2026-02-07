import { useContext, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ExpenseContext, ExpenseProvider } from "../context/ExpenseContext";
import { Header } from "../components/Header";

import "./Chart.css";

export function Charts() {
  const { expenses } = useContext(ExpenseContext);

  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  // Line chart: total expense per date
  const expensesByDate = {};
  expenses.forEach(({ date, cost }) => {
  expensesByDate[date] =
    (expensesByDate[date] || 0) + Number(cost);
});


  const lineLabels = Object.keys(expensesByDate).sort();
  const lineData = lineLabels.map(date => expensesByDate[date]);

  // Pie chart: total expense per category
  const expensesByCategory = {};
  expenses.forEach(({ category, cost }) => {
    expensesByCategory[category] =
      (expensesByCategory[category] || 0) + Number(cost);
  });

  const pieLabels = Object.keys(expensesByCategory);
  const pieData = pieLabels.map(cat => expensesByCategory[cat]);

  // LINE CHART
  useEffect(() => {
    if (!lineChartRef.current) return;

    const chart = new Chart(lineChartRef.current, {
      type: "line",
      data: {
        labels: lineLabels,
        datasets: [
          {
            label: "Expenses Over Time",
            data: lineData,
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Amount" },
          },
          x: {
            title: { display: true, text: "Date" },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [lineData, lineLabels]);

  // PIE CHART
  useEffect(() => {
    if (!pieChartRef.current) return;

    const chart = new Chart(pieChartRef.current, {
      type: "pie",
      data: {
        labels: pieLabels,
        datasets: [
          {
            label: "Category-wise Expenses",
            data: pieData,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    return () => chart.destroy();
  }, [pieData, pieLabels]);

  return (
    <>
    <title>Charts</title>
      <Header />
      <div className="canvas">
        <div className="line-container">
          <canvas ref={lineChartRef} className="chart-canvas" />
        </div>

        <div className="pie-container">
          <canvas ref={pieChartRef} className="chart-canvas" />
        </div>
      </div>
    </>
  );
}
