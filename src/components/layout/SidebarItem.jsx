import {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import styled from 'styled-components';

const role = localStorage.getItem('role')

const SubMenuStyle = styled.div`
  & .linkk {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 18px 14px 28px;
    text-decoration: none;
    color: #94a3b8;
  }

  & .activeLINK {
    color: #cf9338 !important;
    background: rgba(207, 147, 56, 0.2) !important;

    & .sideBarSvg1,
    & .sideBarSvg2,
    & .sideBarSvg3,
    & .sideBarSvg4,
    & .sideBarSvg5,
    & .sideBarSvg6,
    & .sideBarSvg7,
    & .sideBarSvg8,
    & .sideBarSvg9,
    & .sideBarSvg10,
    & .sideBarSvg11 {
      background: #cf9338 !important;
    }
  }
`;
const SubMenuStyle2 = styled.div`
  cursor: pointer;

  & .sidebar-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 18px 14px 28px;
    text-decoration: none;
    color: #94a3b8;
  }

  .sidebar-content {
    height: 0;
    overflow: hidden;

    & .linkk {
      padding: 14px 18px 14px 66px;
    }
  }

  .sidebar-item.open {
    height: auto;
    color: #cf9338 !important;
  }

  .sidebar-item.open > .sidebar-title {
    color: #cf9338 !important;

    & .sideBarSvg1,
    & .sideBarSvg2,
    & .sideBarSvg3,
    & .sideBarSvg4,
    & .sideBarSvg5,
    & .sideBarSvg6,
    & .sideBarSvg7,
    & .sideBarSvg8,
    & .sideBarSvg9,
    & .sideBarSvg10,
    & .sideBarSvg11,
    & .arrowBottom {
      background: #cf9338 !important;
    }
  }

  .sidebar-title-active {
    color: #cf9338 !important;

    & .sideBarSvg1,
    & .sideBarSvg2,
    & .sideBarSvg3,
    & .sideBarSvg4,
    & .sideBarSvg5,
    & .sideBarSvg6,
    & .sideBarSvg7,
    & .sideBarSvg8,
    & .sideBarSvg9,
    & .sideBarSvg10,
    & .sideBarSvg11,
    & .arrowBottom {
      background: #cf9338 !important;
    }
  }

  .sidebar-item.open > .sidebar-content {
    height: auto;
    color: #cf9338 !important;
  }

  .sidebar-item.open > .sidebar-content {
    height: unset !important;
    color: #cf9338 !important;
  }

  .sidebar-title-active {
    color: #cf9338 !important;
    background: rgba(207, 147, 56, 0.2) !important;
  }
`;

export default function SidebarItem({item}) {
    const [open, setOpen] = useState(false);
    const [hide, setHide] = useState(false);

    if (item.childrens) {
        return (
           <div></div>
        );
    } else {
        return (
            <SubMenuStyle>

                {item.role === role ?
                    <NavLink
                        to={item.path}
                        className={(navData) =>
                            navData.isActive ? 'activeLINK linkk' : 'notActiveLINK linkk'
                        }
                    >
                        <div>
                            <span>{item.title}</span>
                        </div>
                    </NavLink>
                    : null}
            </SubMenuStyle>
        );
    }
}
