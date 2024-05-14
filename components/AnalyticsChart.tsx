'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { EmployeeSchema, DepartmentSchema } from '../lib/types';

const AnalyticsCharts = ({ employees, departments }: { employees: EmployeeSchema[], departments: DepartmentSchema[] }) => {
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const scatterPlotRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (employees.length === 0 || departments.length === 0) return;

    const joinTrend: { [key: number]: number } = {};
    const scatterData: any[] = [];
    const departmentEmployeeCount: { [key: string]: number } = {};
    const experienceDistribution: { [key: number]: number } = {};

    employees.forEach(employee => {
      const experience = Math.floor(employee.yearsOfExperience / 5) * 5;
      experienceDistribution[experience] = (experienceDistribution[experience] || 0) + 1;

      const departmentName = departments.find(dep => dep.departmentId === employee.departmentId)?.departmentName || 'Unknown';
      console.log('Employee ID:', employee.id, 'Department Name:', departmentName);
      departmentEmployeeCount[departmentName] = (departmentEmployeeCount[departmentName] || 0) + 1;
      scatterData.push({ x: employee.yearsOfExperience, y: departmentName });

      const joinYear = new Date(employee.dateOfJoin).getFullYear();
      joinTrend[joinYear] = (joinTrend[joinYear] || 0) + 1;
    });
    
    renderChart(barChartRef, 'bar', Object.keys(departmentEmployeeCount), Object.values(departmentEmployeeCount), 'Employee Count per Department');
    renderChart(pieChartRef, 'pie', Object.keys(experienceDistribution), Object.values(experienceDistribution), 'Distribution of Employees by Years of Experience');
    renderChart(lineChartRef, 'line', Object.keys(joinTrend), Object.values(joinTrend), 'Trend of Employee Joining Over Time');
    renderChart(scatterPlotRef, 'scatter', scatterData.map(({ x, y }) => ({ x, y })), null, 'Relationship Between Years of Experience and Department');

    return () => {
      destroyChart(barChartRef);
      destroyChart(pieChartRef);
      destroyChart(lineChartRef);
      destroyChart(scatterPlotRef);
    };
  }, [employees, departments]);

  const renderChart = (ref: any, type: any, labels: any, data: any, title: string) => {
    if (!ref.current) return;

    const ctx = ref.current.getContext('2d');
    if (!ctx) return;

    if (ref.current.chart) {
      ref.current.chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          backgroundColor: type === 'bar' ? 'rgba(54, 162, 235, 0.5)' : type === 'pie' ? ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 205, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'] : 'rgba(255, 99, 132, 0.5)',
          borderColor: type === 'bar' ? 'rgba(54, 162, 235, 1)' : type === 'pie' ? ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'] : 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          fill: type === 'line' ? false : type === 'scatter' ? true : undefined,
          tension: type === 'line' ? 0.1 : undefined,
          pointRadius: type === 'scatter' ? 5 : undefined
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: type === 'scatter' ? false : true,
            position: type === 'scatter' ? 'none' : 'top',
          },
          title: {
            display: true,
            text: title
          }
        }
      }
    });

    // Store the chart instance in the ref
    ref.current.chart = newChart;
  };

  const destroyChart = (ref: any) => {
    if (ref.current && ref.current.chart) {
      ref.current.chart.destroy();
    }
  };

  return (
    <div>
      <canvas ref={barChartRef} id="barChart" />
      <canvas ref={pieChartRef} id="pieChart" />
      <canvas ref={lineChartRef} id="lineChart" />
      <canvas ref={scatterPlotRef} id="scatterPlot" />
    </div>
  );
};

export default AnalyticsCharts;