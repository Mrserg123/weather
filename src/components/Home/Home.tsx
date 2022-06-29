import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, TextField } from "@mui/material";
import {
  getAllCity,
  getOneCity,
  delCity,
  addCity,
} from "../../redux/slices/weatherSlice";
import { useTypedSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import imgCard from "../../assets/images/weather-images.jpg";
import Header from "./Header";

const theme = createTheme();
const Home: React.FC = () => {
  const stateWeather = useTypedSelector((state) => state.weather);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [city, setCity] = React.useState("");
  console.log(stateWeather, "state");

  React.useEffect(() => {
    if (localStorage.cityName === undefined) {
      localStorage.cityName = JSON.stringify(["Kyiv"]);
    }
    let allCity = JSON.parse(localStorage.cityName);
    dispatch(getAllCity(allCity));
  }, []);
  function handlerClickAddCity() {
    setCity("");
    dispatch(addCity(city));
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pb: 6,
          }}
        ></Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              value={city}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value)
              }
              onKeyPress={(e: React.KeyboardEvent<HTMLImageElement>) => {
                if (e.key === "Enter") {
                  handlerClickAddCity();
                }
              }}
            />
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              disabled={city.length !== 0 ? false : true}
              onClick={() => handlerClickAddCity()}
            >
              Add
            </Button>
          </Box>
          {stateWeather.isExistsCity && (
            <Alert sx={{ m: 2 }} severity="error">
              This city exists. Please enter a new city
            </Alert>
          )}
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent:
                stateWeather.allCity.length <= 2 ? "center" : "space-between",
            }}
          >
            {stateWeather.allCity.map((city) => (
              <Card
                key={city.id}
                sx={{ maxWidth: 250, mb: 2, mr: 2, cursor: "pointer" }}
              >
                <div
                  onClick={() =>
                    navigate(`/weather/${city.name}`, {
                      state: {
                        city: city,
                      },
                    })
                  }
                >
                  <CardMedia
                    component="img"
                    alt={city.name}
                    height="140"
                    image={imgCard}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {city.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Temperature now:</b> {city.main.temp}&#8451;
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Temperature max:</b> {city.main.temp_max}&#8451;
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b> Temperature min:</b> {city.main.temp_min}&#8451;
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b> Feels like:</b> {city.main.feels_like}&#8451;
                    </Typography>
                  </CardContent>
                </div>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => dispatch(getOneCity(city.name))}
                  >
                    Update weather now
                  </Button>
                  <Button
                    size="small"
                    sx={{ color: "red" }}
                    onClick={() => dispatch(delCity(city.name))}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};
export default Home;
