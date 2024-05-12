import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);

const BarChart = () => {
  const [labels,setLabels]=useState([]);
  const [dataVentes,setDataVentes]=useState([]);
  const [dataClients,setDataClients]=useState([]);
  useEffect(()=>{
    const mostpieces = async () => {
      try {
        const res = await axios.get("http://localhost:5000/mostpieces/");
        const data = await res.data;
        setLabels(data.map(f=>f.Nom));
      } catch (error) {
        console.log(error);
      }
    };
    const sumquantitefournisseurs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/sumquantitefournisseur/");
        const data = await res.data;
        setDataVentes(data.map(s=>s.total_vendu));
      } catch (error) {
        console.log(error);
      }
    };
    const countclientfournisseurs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/countclientfournisseur/");
        const data = await res.data;
        setDataClients(data.map(c=>c.nb_clients));
      } catch (error) {
        console.log(error);
      }
    };

    mostpieces();
    sumquantitefournisseurs();
    countclientfournisseurs();
  },[])
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Quantités Pièces",
        data: dataVentes,
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        stack: "Stack 0",
      },
      {
        label: "Clients",
        data: dataClients,
        backgroundColor: "#8b5cf6",
        borderColor: "#8b5cf6",
        borderWidth: 1,
        stack: "Stack 0",
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Relation entre fournisseurs , pieces et clients",
        },
      },
      responsive: true,
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          grid: {
            display: false,
          },
        },
      },
    },
  };
  return (
    <Bar
      data={config.data}
      options={config.options}
      height="100%"
      width="180%"
    />
  );
};

export default BarChart;
