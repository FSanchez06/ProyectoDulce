Buenos dias, tardes o noches

para ejecutar este codigo de manera correcta debes seguir estos pasos:

1. Clona el repositorio de git en una carpeta de tu preferencia.
2. Cuando el repositorio sea clonado ingresar desde la terminal a la carpeta 'API' y ejecutar el script "npm install json-server"
3. Al terminar la instalacion escribir este codigo en el archivo llamado package.json: {
  "dependencies": {
    "json-server": "^1.0.0-beta.2"
  },
  "scripts": {
    "start": "json-server --watch db.json --port 3002"
  }
}
4. Despues de ingresar ese codigo ejecutar en la terminal el comando npm start
5. Ahora ingresar en la carpeta front y ejecutar el comando npm install npm
6. terminada la descarga ejecutar el comando npm run y esperar a que cargue el proyecto
7. Listo ya deberia ejecutarse de forma correcta el codigo
