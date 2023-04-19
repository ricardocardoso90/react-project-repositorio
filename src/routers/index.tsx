import { useRoutes } from 'react-router-dom';

import { Menu } from '../pages/Menu';
import { Repository } from '../pages/Repository';

export const MainRoutes = () => {
  return (
    useRoutes([
      { path: '/', element: <Menu /> },
      { path: '/repository/:repositorio', element: <Repository /> }
    ])
  )
};