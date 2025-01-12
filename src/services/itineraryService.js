const API_URL = 'https://viajando-backend.vercel.app/itinerary/generate';

// Función para generar el itinerario
export const generateItinerary = async (destination, days, budget) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destination, days, budget }),
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`Error al generar el itinerario: ${response.status} - ${errorText}`);
    }

    const data = await response.json(); 
    console.log('Respuesta JSON:', data);
    
    return data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error; 
  }
};
