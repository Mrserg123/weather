import React from "react";
import "./style/style.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "../Home/Header";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
interface State {
  state: {
    [key: string]: any;
  };
}
const City: React.FC = () => {
  let location = useLocation();
  const cityState: State = location;
  const city = cityState.state.city;
  return (
    <>
      <Header />
      <Container
        sx={{ py: 2, display: "flex", justifyContent: "center" }}
        maxWidth="md"
      >
        <Box>
          <Typography variant="h3" color="inherit" sx={{ textAlign: "center" }}>
            {city.name}
          </Typography>
          <ul className="border">
            <li>Temperature: {city.main.temp}&#8451;</li>
            <li>Feels like: {city.main.feels_like}&#8451;</li>
            <li>Humidity: {city.main.humidity}% </li>
            <li>Visibility: {city.visibility}m</li>
            <li>Clouds: {city.clouds.all}%</li>

            <li>Weather: {city.weather[0].main}</li>
            <li style={{ display: "flex", alignItems: "center" }}>
              Description: {city.weather[0].description}{" "}
              <img
                width={45}
                src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`}
                alt={city.weather[0].main}
              />
            </li>

            <li>Country: {city.sys.country}</li>
          </ul>
        </Box>
      </Container>
    </>
  );
};
export default City;
