import axios from "axios";

export const fetchMenu = async () => {
  try {
    const config = {
      method: "GET",
      url: "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios(config);
    return res;
  } catch (error) {
    console.error("Failed to fetch menu data:", error);
    return null;
  }
};

export const fetchImageURL = async (url) => {
  //https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true

  try {
    const config = {
      method: "GET",
      url: "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true",
    };

    const res = await axios(config);
    return res;
  } catch (error) {
    console.error("Failed to fetch image data:", error);
    return null;
  }
};
