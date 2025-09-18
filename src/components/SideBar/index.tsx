import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import menus from '../../configs/menus.json';
import type { MenuItem } from './types';
import './styles.scss';

const SideBar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const items: MenuItem[] = useMemo(() => menus, []);

  const toggle = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <aside className="sidebar flex flex--column p--24 fixed">
      <nav className="sidebar__nav flex flex--column">
        {items.map((item: MenuItem) => {
          const hasChildren = Array.isArray(item.children);
          if (!hasChildren) {
            return (
              <NavLink
                key={item.label}
                to={item.to!}
                className="sidebar__link py--8 px--16"
              >
                {item.label}
              </NavLink>
            );
          } else {
            const isOpen = openDropdown === item.label;
            return (
              <div
                key={item.label}
                className="sidebar__dropdown flex flex--column"
              >
                <div
                  className="sidebar__link py--8 px--16 text--left pointer flex align--center"
                  role="button"
                  onClick={() => toggle(item.label)}
                >
                  {item.label}
                </div>
                {isOpen && (
                  <div className="sidebar__submenu pl--8 flex flex--column ml--16">
                    {item.children!.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className="sidebar__link py--8 px--16"
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
