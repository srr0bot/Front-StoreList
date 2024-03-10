import { useState, useEffect } from 'react';

import SvgColor from 'src/components/svg-color';

// Función para obtener el ícono
const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

// Función para generar el menú según el tipo de usuario
const generateMenu = (userType) => {
  const navConfig = [
    {
      title: 'Productos',
      path: '/products',
      icon: icon('ic_cart'),
    },
  ];

  if (userType === 'admin') {
    navConfig.unshift(
      {
        title: 'Estadísticas',
        path: '/app',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Crear usuario',
        path: '/register',
        icon: icon('ic_lock'),
      },
      {
        title: 'Ventas',
        path: '/sales',
        icon: icon('ic_Sales'), 
      }
     
    );
  }

  return navConfig;
};

export default function useDynamicMenu() {
  const [menu, setMenu] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('type');
    const newMenu = generateMenu(userType);
    
    setIsAdmin(userType === 'admin'); 
    setMenu(newMenu);
  }, []);

  return {menu, isAdmin};
}
