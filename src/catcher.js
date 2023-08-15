const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Cambia esto al puerto que desees

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_c96846aa8fe9d25a9689f5c6892d2cab032c6afc03fa0e5035e522f4e9ebb02f";

// Ruta para el endpoint de Webhook
app.post('/stripe-webhook', (req, res) => {
  const event = req.body;
  
  // Verificar la firma del evento si es necesario
  // Esto es importante para asegurarte de que la notificación proviene realmente de Stripe

  //Aquí agrego la parte de server 4242 para probarlo aquí en el 3000: 
  //let event;

  try {
    console.log("ENTRE AL ENDPOINT SECRET")
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Procesar el evento
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Aquí puedes realizar acciones en respuesta al evento, como actualizar la base de datos, enviar correos, etc.
    console.log('Compra completada:', session.id);
  }

  // Responder con un código de estado 200 para indicar que la notificación se ha procesado
  res.sendStatus(200);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
