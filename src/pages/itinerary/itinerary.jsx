import { useLocation } from "react-router-dom";
import Map from "../../components/map/map";
import './itinerary.css'
import { useEffect, useState } from "react";
const Itinerary = () => {
    const location = useLocation();
  const itineraryData = location.state;

  /*
  REACT LEAFLET
  const [coordinates, setCoordinates] = useState({
    latitude: itineraryData.itinerary[0].morning[0].latitude,
    longitude: itineraryData.itinerary[0].morning[0].longitude,
  });

  const handleActivityClick = (latitude, longitude) => {
    setCoordinates({ latitude, longitude });
  };
*/

// Estado para la actividad seleccionada, inicializa con null
const [selectedActivity, setSelectedActivity] = useState(itineraryData.itinerary[0].morning[0]);


const handleActivityClick = (activity) => {
  setSelectedActivity(activity); 
};

// Función para generar el mensaje a compartir en WhatsApp
const handleShareClick = () => {
  const message = `✨ *Itinerario para ${itineraryData.city}, ${itineraryData.country}* 🌍\n` +
                  `📅 Días: ${itineraryData.days}\n` +
                  `💰 Presupuesto: ${itineraryData.budget}\n` +
                  itineraryData.itinerary.map(dayPlan => {
                    return `\n🗓 *Día ${dayPlan.day}:*\n` +
                           `🌅 _Mañana:_\n ${dayPlan.morning.map(activity => `- ${activity.name}: ${activity.description}`).join('\n')}\n` +
                           `🌞 _Tarde:_\n ${dayPlan.afternoon.map(activity => `- ${activity.name}: ${activity.description}`).join('\n')}\n` +
                           `🌙 _Noche:_\n ${dayPlan.night.map(activity => `- ${activity.name}: ${activity.description}`).join('\n')}\n`;
                  }).join('\n');

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://web.whatsapp.com/send?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
};

    return (
        <div className="itinerary">
      <div className="map-container">
      {selectedActivity && (
          <Map
            activityName={selectedActivity.name}
            city={itineraryData.city}
            country={itineraryData.country}
          />
        )}
      </div>
      <div className="itinerary-info">
        <h1>Itinerario para {itineraryData.city}, {itineraryData.country}</h1>
        <p>Días: {itineraryData.days}</p>
        <p>Presupuesto: {itineraryData.budget}</p>
        <div className="days-container">
        {itineraryData.itinerary.map((dayPlan, index) => (
          <div key={index}>
            <h3>Día {dayPlan.day}</h3>
            <h4>Mañana</h4>
            <ul>
              {dayPlan.morning.map((activity, idx) => (
                <li
                  key={idx}
                  onClick={() =>
                    handleActivityClick(activity)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="13"  height="13"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                  <strong>{activity.name}</strong>
                  <br />
                  Descripción: {activity.description}
                </li>
              ))}
            </ul>

            <h4>Tarde</h4>
            <ul>
              {dayPlan.afternoon.map((activity, idx) => (
                <li
                  key={idx}
                  onClick={() =>
                    handleActivityClick(activity)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="13"  height="13"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                  <strong>{activity.name}</strong>
                  <br />
                  Descripción: {activity.description}
                </li>
              ))}
            </ul>

            <h4>Noche</h4>
            <ul>
              {dayPlan.night.map((activity, idx) => (
                <li
                  key={idx}
                  onClick={() =>
                    handleActivityClick(activity)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="13"  height="13"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                  <strong>{activity.name}</strong>
                  <br />
                  Descripción: {activity.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>
        <button className="primary-button" onClick={handleShareClick}>
  Compartir por WhatsApp
</button>
      </div>
    </div>
    );
}

export default Itinerary;