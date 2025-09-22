📝 Registro Notas - Client

Client es la parte de la aplicación Register Notes des del lado del Frontend, desarrollado con React + TypeScript y desplegado en Vercel.
Este proyecto consume la API del backend (Spring Boot + MySQL) para gestionar las notas de usuario.

🚀 Características principales

⚛️ Interfaz construida con React + TypeScript

🎨 Estilos modernos con TailwindCSS

🌐 Conexión a la API REST del backend en Spring Boot

🔄 Operaciones CRUD completas sobre las notas

📱 Diseño responsive, adaptable a todos los dispositivos

☁️ Despliegue en Vercel

🏗️ Arquitectura del Proyecto

register-notes-frontend/ 

├── public/                 # Recursos estáticos 

├── src/ 

│   ├── components/         # Componentes reutilizables (UI, formularios, etc.) 

│   ├── pages/              # Vistas principales (Home, Notes, etc.) 

│   ├── services/           # Conexión con el backend (fetch/axios) 

│   ├── hooks/              # Hooks personalizados 

│   ├── App.tsx             # Punto de entrada de la app 

│   └── main.tsx            # Configuración de ReactDOM 

├── package.json            # Dependencias y scripts 

├── tsconfig.json           # Configuración TypeScript 

└── README.md               # Documentación del proyecto 


⚙️ Tecnologías utilizadas

      - Lenguaje: TypeScript
      
      - Framework Frontend: React
      
      - Estilos: TailwindCSS
      
      - Gestión de estado: React Hooks (useState, useEffect)

      - Despliegue: Vercel

📌 Objetivo del proyecto

El propósito de este frontend es proporcionar una interfaz intuitiva y amigable para interactuar con la API del backend.

Desde la aplicación, el usuario puede:

    ➕ Crear nuevas notas
    
    📄 Listar notas existentes
    
    ✏️ Editar notas
    
    ❌ Eliminar notas

Este frontend también refleja buenas prácticas de arquitectura modular y componentización en React.

🚀 Ejecución local

Clonar el repositorio

git clone https://github.com/AlfredoRios24/3.Registro_notas_Client.git
cd register-notes-frontend


Instalar dependencias

npm install


Ejecutar la aplicación

npm run dev


Acceder en:

http://localhost:5173

📂 Proyecto relacionado

👉 El backend de este proyecto está disponible en: https://github.com/AlfredoRios24/3.Registro_notas_Server
