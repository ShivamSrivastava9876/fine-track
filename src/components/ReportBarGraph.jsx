import { useEffect, useRef } from "react"
import { Chart } from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { getDailyReportAsync, getMonthlyReportAsync, getReportData, getWeeklyReportAsync, getYearlyReportAsync } from "../redux/slice/report/reportSlice";
import { useState } from "react";
import Link from "next/link";

// import { Bar } from "react-chartjs-2";
function ReportBarGraph() {
    const dispatch = useDispatch();
    const chartRef = useRef(null);
    const [keysData, setKeysData] = useState([]);
    const [valuesData, setValuesData] = useState([]);
    const [title, setTitle] = useState("");
    const [active, setActive] = useState("daily");

    useEffect(() => {
        dispatch(getDailyReportAsync());
    },[])

    const handleDailyData = () => {
        dispatch(getDailyReportAsync());
        setActive("daily")
    }

    const handleWeeklyData = () => {
        dispatch(getWeeklyReportAsync())
        setActive("weekly")
    }

    const handleMonthlyData = () => {
        dispatch(getMonthlyReportAsync())
        setActive("monthly")
    }

    const handleYearlyData = () => {
        dispatch(getYearlyReportAsync())
        setActive("yearly")
    }

    const reportData = useSelector(getReportData);
    console.log("report data",reportData)

    useEffect(() => {
        if (reportData && reportData.daily_report) {
            setTitle("Daily")
            const keys = Object.keys(reportData.daily_report);
            setKeysData(keys);

            const values = Object.values(reportData.daily_report);
            setValuesData(values);
            console.log("keys", keys);
            console.log("values", values);
        }
        if (reportData && reportData.weekly_report) {
            setTitle("Weekly")
            const keys = Object.keys(reportData.weekly_report);
            setKeysData(keys);

            const values = Object.values(reportData.weekly_report);
            setValuesData(values);
            console.log("keys", keys);
            console.log("values", values);
        }
        if (reportData && reportData.monthly_report) {
            setTitle("Monthly")
            const keys = Object.keys(reportData.monthly_report);
            setKeysData(keys);

            const values = Object.values(reportData.monthly_report);
            setValuesData(values);
            console.log("keys", keys);
            console.log("values", values);
        }
        if (reportData && reportData.yearly_report) {
            setTitle("Yearly")
            const keys = Object.keys(reportData.yearly_report);
            setKeysData(keys);

            const values = Object.values(reportData.yearly_report);
            setValuesData(values);
            console.log("keys", keys);
            console.log("values", values);
        }
    }, [reportData]);

    useEffect(() => {
        if (chartRef.current && keysData.length > 0 && valuesData.length > 0) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            const context = chartRef.current.getContext("2d");
            const newChart = new Chart(context, {
                type: "bar",
                data: {
                    labels: keysData,
                    datasets: [
                        {
                            label: title,
                            data: valuesData,
                            backgroundColor: [
                                "rgb(219, 138, 77, 0.6)",
                                "rgb(219, 138, 77, 0.6)",
                                "rgb(219, 138, 77, 0.6)",
                                "rgb(219, 138, 77, 0.6)",
                                "rgb(219, 138, 77, 0.6)",
                                "rgb(219, 138, 77, 0.6)",
                                "rgb(219, 138, 77, 0.6)",
                                "rgb(219, 138, 77, 0.6)",
                                "rgb(219, 138, 77, 0.6)",
                                "rgb(219, 138, 77, 0.6)",
                                "rgb(219, 138, 77, 0.6)",
                                "rgb(219, 138, 77, 0.6)",
                            ],
                            borderColor: [
                                "rgb(219, 138, 77)",
                                "rgb(219, 138, 77)",
                                "rgb(219, 138, 77)",
                                "rgb(219, 138, 77)",
                                "rgb(219, 138, 77)",
                                "rgb(219, 138, 77)",
                                "rgb(219, 138, 77)",
                                "rgb(219, 138, 77)",
                                "rgb(219, 138, 77)",
                                "rgb(219, 138, 77)",
                                "rgb(219, 138, 77)",
                                "rgb(219, 138, 77)",
                            ],
                            borderWidth: 1,
                        },
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: "category",
                            // title: {
                            //     display: true,
                            //     text: "Hello"
                            // }
                        },
                        y: {
                            beginAtZero: true,
                            // title: {
                            //     display: true,
                            //     text: "Revenue"
                            // }
                        }
                    }
                }
            })

            chartRef.current.chart = newChart
        }
    }, [keysData])

    return (
        <>
            {/* Bar chart */}
            <h1 className="w-[150px] mx-auto mb-5 flex justify-center text-2xl font-bold capitalize ">Report</h1>
            <div className="flex justify-center space-x-1 ">
                <button onClick={handleDailyData} className={`px-4 py-2 ${active === "daily" ? "bg-orange-800" : "bg-[#DB8A4D]"}  hover:bg-orange-800 border border-black text-white rounded`}>Daily</button>
                <button onClick={handleWeeklyData} className={`px-4 py-2 ${active === "weekly" ? "bg-orange-800" : "bg-[#DB8A4D]"}  hover:bg-orange-800 border border-black text-white rounded`}>Weekly</button>
                <button onClick={handleMonthlyData} className={`px-4 py-2 ${active === "monthly" ? "bg-orange-800" : "bg-[#DB8A4D]"}  hover:bg-orange-800 border border-black text-white rounded`}>Monthly</button>
                <button onClick={handleYearlyData} className={`px-4 py-2 ${active === "yearly" ? "bg-orange-800" : "bg-[#DB8A4D]"}  hover:bg-orange-800 border border-black text-white rounded`}>Yearly</button>
            </div>
            <h1 className="w-[150px] mx-auto m-5 flex justify-center text-s font-bold ">{title} report</h1>
            <div className="w-4/5 mx-auto mt-4 flex flex-col">
                <div className='border relative border-gray-400 rounded-xl overflow-hidden my-auto shadow-xl'>
                    <canvas ref={chartRef} className="w-full h-auto"></canvas>
                </div>
                <Link href={`/${active}Reports`} className="mt-3 text-blue-500 underline ml-auto">View more ...</Link>
            </div>
            
        </>
    )
}

export default ReportBarGraph;