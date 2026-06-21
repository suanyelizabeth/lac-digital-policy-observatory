document.addEventListener("DOMContentLoaded", () => {

    console.log("Caribbean Digital Policy Observatory ready");

    // Crear mapa
    const map = L.map("map").setView([17.5, -73], 4);

    // Capa base OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // URL CSV publicada desde Google Sheets
const csvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRvAkxBfeRY-PmRspj4rPnVeL8C0ctMgQdegbI72iJmnBMgWQIz2zQefOzto1S_T45Kqe1ZBwkVOxNE/pub?gid=0&single=true&output=csv"; 
    // Leer CSV
    Papa.parse(csvUrl, {

        download: true,

        header: true,

        skipEmptyLines: true,

        complete: function (results) {

            console.log(results.data);

            results.data.forEach(item => {

                const lat = parseFloat(item.latitude);
                const lng = parseFloat(item.longitude);

                // Ignorar filas sin coordenadas
                if (isNaN(lat) || isNaN(lng)) {
                    return;
                }

                const popup = `
                    <strong>${item.name}</strong><br>
                    <b>Type:</b> ${item.asset_type}<br>
                    <b>Topic:</b> ${item.topic}<br>
                    <b>Description:</b><br>
                    ${item.description}
                `;

                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(popup);

            });

        },

        error: function (error) {

            console.error(error);

        }

    });

});