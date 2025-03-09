import React from "react";
import s from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import {AppRoutePageNames, AppRoutes} from "../../routes";

interface MenuItem {
  icon: React.ReactNode;
  name: string;
  link: string;
}

const Sidebar: React.FC = () => {
  const routes: MenuItem[] = Object.keys(AppRoutes).map((key) => ({
    icon: <i className="fa fa-cog" />,
    name: AppRoutePageNames[AppRoutes[key]],
    link: AppRoutes[key],
  }));

  return (
    <aside className={s.sidebar}>
      <ul className={s.menuList}>
        {routes.map((item, index) => (
          <li key={index} className={s.menuItem}>
            <NavLink to={item.link} className={s.menuLink}>
              <span className={s.menuIcon}>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
