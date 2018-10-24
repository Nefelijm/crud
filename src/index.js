import React from 'react'; //Es la que nos permite crear nuestras interfaces
import ReactDOM from 'react-dom'; //este esta enfocado en el navegador
import './index.css'; //esto es posible gracias al compilador babel
import App from './App';
import * as serviceWorker from './serviceWorker'; //simular datos de manera local
//Gracias a esto se puede a un guardar los datos en la memoria local del computador
//Cuano vuelvan los datos van a volver a actualizar.

ReactDOM.render(<App />, document.getElementById('app')); //ayuda a React a pinta la interfaz en pantalla
serviceWorker.unregister();
