import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export interface weatherState {
  status: string;
  allCity: Array<any>;
  isExistsCity: boolean;
}

export interface nameCity {
  id: number;
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
}
const initialState: weatherState = {
  status: "",
  allCity: [],
  isExistsCity: false,
};

export const getAllCity = createAsyncThunk(
  "weatherSlice/getAllCity",
  async (nameCity: Array<string>) => {
    let requests = nameCity.map((name) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
      )
    );
    return Promise.all(requests).then((responses) =>
      Promise.all(responses.map((item) => item.json()))
    );
  }
);
export const getOneCity = createAsyncThunk(
  "weatherSlice/getOneCity",
  async (nameCity: string) => {
    let requests = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
    )
      .then((responses) => responses.json())
      .then((result) => result);
    return requests;
  }
);
export const addCity = createAsyncThunk(
  "weatherSlice/getAddCity",
  async (nameCity: string) => {
    let requests = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
    )
      .then((responses) => responses.json())
      .then((result) => result);
    return requests;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    delCity: (state, action) => {
      state.allCity = state.allCity.filter(
        (item) => item.name !== action.payload
      );
      let allCity = JSON.parse(localStorage.cityName);
      let delCity = allCity.filter((item: string) => item !== action.payload);
      localStorage.setItem("cityName", JSON.stringify(delCity));
    },
    updateOneCity: (state, action) => {
      let result = state.allCity.map((item) =>
        item.name === action.payload.name ? action.payload : item
      );
      state.allCity = result;
    },
    addOneCity: (state, action) => {
      let city = JSON.parse(localStorage.getItem("cityName"));
      let isExistsCity = city.some(
        (item: string) => item === action.payload.name
      );
      if (action.payload.cod === 200 && isExistsCity) {
        state.isExistsCity = true;
      }
      if (action.payload.cod === 200 && !isExistsCity) {
        state.isExistsCity = false;
        localStorage.setItem(
          "cityName",
          JSON.stringify([...city, action.payload.name])
        );
        state.allCity.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCity.pending, (state) => {
      state.status = "pending";
    }),
      builder.addCase(getAllCity.rejected, (state) => {
        state.status = "rejected";
      });
    builder.addCase(getAllCity.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.allCity = action.payload;
    });

    builder.addCase(getOneCity.pending, (state) => {
      state.status = "pending";
    }),
      builder.addCase(getOneCity.rejected, (state) => {
        state.status = "rejected";
      });
    builder.addCase(getOneCity.fulfilled, (state, action) => {
      state.status = "fulfilled";
      weatherSlice.caseReducers.updateOneCity(state, action);
    });

    builder.addCase(addCity.pending, (state) => {
      state.status = "pending";
    }),
      builder.addCase(addCity.rejected, (state) => {
        state.status = "rejected";
      });
    builder.addCase(addCity.fulfilled, (state, action) => {
      state.status = "fulfilled";
      weatherSlice.caseReducers.addOneCity(state, action);
    });
  },
});

export const { delCity, addOneCity } = weatherSlice.actions;

export default weatherSlice.reducer;
