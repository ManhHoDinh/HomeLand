"use client";
import { useTranslation } from "react-i18next";
import styles from "./page.module.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { UserProfile } from "@/libs/UserProfile";
import { Col, Container, Form, Row } from "react-bootstrap";
import { futuna } from "../../../../../../public/fonts/futura";
const AdminDashboard = () => {
  const [t, i18n] = useTranslation();
  type FilterParams = {
    start_at: string;
    end_at: string;
  };
  const [filterParams, setFilterParams] = useState<FilterParams>({
    start_at: "",
    end_at: "",
  });

  useEffect(() => {
    const fetchAPI = async () => {
      let chart;
      try {
        const res = await axios.get("/api/building/report");
        const buildingsData: any[] = res.data;
        const labelsConfig = buildingsData.map(
          (building) => building.building_name
        );
        let data: any[] = [];
        const graph: any = document.getElementById("building-chart");
        let total = 0;

        buildingsData.forEach(
          (building) => (total += parseInt(building.count))
        );
        buildingsData.forEach((building) => {
          data.push((parseInt(building.count) * 100) / total);
        });
        const config: any = {
          type: "doughnut",
          data: {
            labels: labelsConfig,
            datasets: [
              {
                label: "%resident",
                data: data,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Population distribution by building",
              },
            },
            zoom: {
              pan: {
                enabled: false,
              },
              zoom: {
                enabled: false,
              },
            },
          },
        };
        let oldChart = Chart.getChart("building-chart");
        if (oldChart) {
          oldChart.destroy();
          chart = new Chart(graph, config);
        } else chart = new Chart(graph, config);
      } catch (e) {
        throw e;
      }
    };
    fetchAPI();
  }, []);
  useEffect(() => {
    const fetchAPI = async () => {
      let chart;
      try {
        const data = new FormData();
        data.append("startDate", filterParams.start_at);
        data.append("endDate", filterParams.end_at);
        const res = await axios.post("/api/service/report", data);
        console.log(res.data);
        const statisticalData: any[] = res.data;
        const labelsConfig = statisticalData.map((data) => data.name);
        let chartData: any[] = [];
        const graph: any = document.getElementById("invoice-chart");
        statisticalData.forEach((data) => {
          chartData.push(parseInt(data.revenue));
        });
        const config: any = {
          type: "bar",
          data: {
            labels: labelsConfig,
            datasets: [
              {
                data: chartData,
                backgroundColor: statisticalData.map(() => {
                  return (
                    "#" + Math.floor(Math.random() * 16777215).toString(16)
                  ); // Generate a random color for each bar
                }),
                barPercentage: 0.5,
              },
            ],
          },
          options: {
            interaction: {
              mode: "nearest",
              axis: "x",
              intersect: false,
            },
            plugins: {
              zoom: {
                pan: {
                  enabled: false,
                },
                zoom: {
                  enabled: false,
                },
              },
              title: {
                display: true,
              },
            },
          },
        };
        let oldChart = Chart.getChart("invoice-chart");

        if (oldChart) {
          oldChart.destroy();
          chart = new Chart(graph, config);
        } else chart = new Chart(graph, config);
      } catch (e) {
        throw e;
      }
    };
    fetchAPI();
  }, [filterParams]);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newObj = {
        ...filterParams,
        [e.target.name]: e.target.value,
      };
      setFilterParams(newObj);
      console.log(newObj);
    },
    [filterParams]
  );

  return (
    <main style={futuna.style}>
      <Container>
        <Row>
          <Col>
            <Row className="align-items-center">
              <Col md="auto">
                <p
                  style={{
                    width: "100px",
                    alignItems: "center",
                    display: "flex",
                    padding: 0,
                    margin: 0,
                    marginRight: "20px",
                  }}
                >
                  {"Ngày bắt đầu:"}
                </p>
              </Col>
              <Col>
                <Form.Group style={{ width: "100%" }}>
                  <Form.Control
                    size="lg"
                    type="date"
                    name="start_at"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col>
            <Row className="align-items-center">
              <Col md="auto">
                <p
                  style={{
                    width: "100px",
                    alignItems: "center",
                    display: "flex",
                    padding: 0,
                    margin: 0,
                    marginRight: "20px",
                  }}
                >
                  {"Ngày kết thúc:"}
                </p>
              </Col>
              <Col>
                <Form.Group style={{ width: "100%" }}>
                  <Form.Control
                    size="lg"
                    type="date"
                    name="end_at"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>

        <Row style={{ marginTop: "50px" }}>
          <Col md={8} >
            <canvas
              style={{
                width: "120%",
                display: "block",
              }}
              id="invoice-chart"
            ></canvas>
          </Col>
          <Col md={4}>
            <Row>
              <canvas
                id="building-chart"
                style={{ display: "block" }}
              ></canvas>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminDashboard;
