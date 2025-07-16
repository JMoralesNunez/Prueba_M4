# link Repositorio: https://github.com/JMoralesNunez/Prueba_M4
# Nombre: Jhonatan Morales
## Clan: Van Rosssum
## Correo: jhonatanmorales99@gmail.com
## c.c: 1000565363

# 📋 Gestión de Eventos - CRUD con API Local

Este proyecto es una aplicación web para gestionar eventos mediante operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar), conectada a una API local basada en **JSON Server**. La interfaz está construida con **HTML**, **Bootstrap 5**, y **JavaScript puro**.

##  Comenzar

### ⚙️ Requisitos

- Tener [Node.js](https://nodejs.org/) instalado.
- Tener JSON Server instalado globalmente:

### 2. Levantar el servidor JSON
- Ubicado en el archivo db.json ejecuta en la terminal:
```bash
json-server --watch db.json --port 3000
```

## 🖱️ Instrucciones de uso

- Inicia sesión con tu cuenta, en caso de no tener una, crea una accediendo al formulario presionando **Crea una cuenta** y rellena el formulario.
- Si se inicia sesión como usuario admin se tendrán las opciones de crear eventos usando el botón **+Nuevo Evento**, una vez creado un evento, podrás ver 2 botones al lado de este, uno para **editar** el evento seleccionado, y otro para **eliminarlo**.
- Si se inicia sesión como usuario normal, podrás ver los eventos creados por el usuario admin, al final de cada evento, habrá un botón para **suscribirse**.
- Después de suscribirse en los eventos deseados, presiona **Confirmar suscripciones** para confirmar tus eventos, que serán cargados en la sección **Suscripciones**.
- En la sección **Suscripciones**, que se encuentra en el navbar lateral, podrás ver los eventos en los que el usuario se subscribió exitosamente.
- Si deseas salir, ubicado en la esquina inferior izquierda, encontrarás el botón **Salir**, al presionarlo, se cerrará sesión y volverás al login.