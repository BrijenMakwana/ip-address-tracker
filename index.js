var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var myIcon = L.icon({
  iconUrl: "images/icon-location.svg",
});

const inputAddress = document.getElementById("input");
const submitBtn = document.getElementById("btn-container");
const displayIP = document.getElementById("ip-text");
const displayLocation = document.getElementById("location-text");
const displayTime = document.getElementById("time-text");
const displayISP = document.getElementById("isp-text");

submitBtn.addEventListener("click", () => {
  if (
    inputAddress.value &&
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      inputAddress.value
    )
  ) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_2zIPEPMq2NULbbt7U5pe0iK9RCkRC&ipAddress=${inputAddress.value}`
    )
      .then((res) => res.json())
      .then((result) => {
        displayIP.innerHTML = result.ip;
        displayLocation.innerHTML = `${result.location.city}, ${result.location.region} ${result.location.postalCode}`;
        displayTime.innerHTML = `UTC ${result.location.timezone}`;
        displayISP.innerHTML = result.isp;
        // set map
        map.panTo([result.location.lat, result.location.lng]);
        L.marker([result.location.lat, result.location.lng], {
          icon: myIcon,
        }).addTo(map);
      });
  } else {
    alert("please enter a valid IP address");
  }
});
