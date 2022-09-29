const getUserInfo = () => {
  return fetch("https://ipinfo.io/?token=e97126d0212658")
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Something went wrong on API server!");
      }
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      document.querySelector(".continer").innerHTML = "";
      const message = document.createElement("p");
      message.classList.add("error");
      message.innerHTML = " يجب عليكم إطفاء مانع الإعلانات لجب البيانات";

      document.querySelector("body").appendChild(message);
      throw new Error("URL is not courrect");
    });
};

const getCountryNameInArabic = (country) => {
  return fetch(
    "https://raw.githubusercontent.com/AnasSbeinati/A-list-of-countries-Arabic-names-and-codes-in-JSON/master/countries.json"
  )
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Something went wrong on API server!");
      }
    })
    .then((data) => {
      let countryName = "";
      data.forEach((element) => {
        if (element.code.toLowerCase() === country.toLowerCase()) {
          countryName = element.name;
        }
      });
      return countryName;
    })
    .catch((e) => {
      throw new Error("URL is not courrect");
    });
};

getUserInfo().then((d) => {
  console.log(d);
  document.querySelector("#ip").innerHTML = d.ip;
  document.querySelector("#city").innerHTML = d.city;
  document.querySelector("#internet_provider").innerHTML = d.org;
  const urlLocation = document.querySelector("#url_location");
  urlLocation.setAttribute("href", `https://www.google.com/maps/@${d.loc}`);

  const Image = document.querySelector("#flag");
  Image.setAttribute("src", `https://countryflagsapi.com/png/${d.country}`);
  getCountryNameInArabic(d.country).then((data) => {
    document.querySelector("h1").innerHTML = data;
  });
});
