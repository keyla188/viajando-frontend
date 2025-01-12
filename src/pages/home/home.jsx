import  { useState } from 'react';
import { generateItinerary } from '../../services/itineraryService'; // Importa el servicio
import './home.css'
import { useNavigate } from 'react-router-dom';
import Map from '../../components/map/map';
const Home = () => {
    const navigate = useNavigate();
    // Estados para los campos del formulario
    const [destination, setDestination] = useState('');
    const [days, setDays] = useState(undefined);
    const [budget, setBudget] = useState(undefined);
    const [loading, setLoading] = useState(false); // Estado para gestionar el estado de carga
    const [error, setError] = useState(null); // Para manejar errores
  
    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setLoading(true); // Activar estado de carga
      setError(null); // Limpiar errores previos
  
      // Asegurarnos de que 'days' y 'budget' sean números válidos
      const daysNum = Number(days);
      const budgetNum = Number(budget);
  
      if (isNaN(daysNum) || isNaN(budgetNum) || !destination) {
        setError('Por favor, ingresa valores válidos para todos los campos.');
        setLoading(false);
        return;
      }
  
      try {
        const data = await generateItinerary(destination, daysNum, budgetNum); 
        navigate('/itinerary', {state: data});
        //alert('Itinerario generado con éxito');
        console.log(data);
        localStorage.setItem('itineraryData', JSON.stringify(data));
      } catch (error) {
        setError('Hubo un error al generar el itinerario: ' + error);
      } finally {
        setLoading(false); 
      }
    };
  
    return (
      <div className="home">
        <div>
          <img src="/assets/photos.jpg" alt="Photos" />
        </div>
        <div>
          <h1>Generando las mejores experiencias</h1>
          <p>Somos Viajando y te ayudamos a generar un itinerario para tu siguiente destino.</p>
  
          {/* Formulario para ingresar los datos */}
          <form onSubmit={handleSubmit}>
            <div className='input'>
              <label htmlFor="destination">Destino:</label>
              <input
                type="text"
                id="destination"
                value={destination}
                placeholder='Cusco, Perú'
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
            <div className='numbers-container'>
            <div className='input'>
              <label htmlFor="days">Días:</label>
              <input
                type="number"
                id="days"
                value={days}
                placeholder='2'
                onChange={(e) => setDays(e.target.valueAsNumber)}
                required
              />
            </div>
  
            <div className='input'>
              <label htmlFor="budget">Presupuesto en dolares:</label>
              <input
                type="number"
                id="budget"
                value={budget}
                placeholder='2000'
                onChange={(e) => setBudget(e.target.valueAsNumber)}
                required
              />
            </div>
  
            {error && <p className="error">{'Intentalo nuevamente.'}</p>} {/* Mostrar error si existe */}
  
            </div>
            <div className='button-form'>
              <button className='primary-button' type="submit" disabled={loading}>
                {loading ? 'Generando...' : 'Generar itinerario'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Home;