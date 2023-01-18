import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Sidebar from '../components/layout/SideBar';
import DashHeader from '../components/sections/DashHeader';

const Style = createGlobalStyle`
	body{
		overflow: hidden
	}
`;

const DashStyle = styled.section`
  position: relative;
  display: flex;

  & .left {
    position: fixed;
    width: 250px;
    height: 100vh;
    overflow-y: auto;
    background-color: white;
    z-index: 10;
    overflow-x: hidden;
    transition: 500ms;
    box-shadow: -2px -6px 8px rgba(125, 134, 125, 0.6);
  }

  & .right {
    position: absolute;
    width: calc(100% - 300px);
    padding: 20px;
    right: 0;
  }

  @media (max-width: 992px) {
    & .left {
      display: none;
    }

    & .right {
      width: 100%;
    }
  }
`;

const MobileFilter = styled.section`
  @media (max-width: 992px) {
    .overlay {
      height: 100vh;
      width: 250px;
      margin-left: -250px;
      position: fixed;
      z-index: 11;
      /* top: 55px; */
      top: 0;
      left: 0;
      background: var(--white);
      border: 1px solid #e0e4ea;
      box-sizing: border-box;
      overflow-x: hidden;
      transition: 500ms;
      &[data-active='active'] {
        margin-left: 0;
      }
      &[data-active='inactive'] {
        margin-left: -250px;
      }
    }
    .overlay2 {
      z-index: 3;
    }
    .overlayBack {
      height: 100vh;
      width: 100%;
      position: fixed;
      z-index: 10;
      /* top: 55px; */
      top: 0;
      left: 0;
      background: var(--light);
      opacity: 0.9;
      overflow-x: hidden;
      transition: 0.5s;
    }

    .overlay-content-sub {
      width: 250px;
    }
  }
`;

export const Dashboard = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [buttonShow, setButtonShow] = useState(false);
  const openMenu = () => {
    setShowMenu(!showMenu);
  };
  const closeMenu = () => {
    setShowMenu(!showMenu);
  };

  const showButton = () => {
    if (window.innerWidth > 991) {
      setButtonShow(true);
    } else {
      setButtonShow(false);
    }
  };
  window.addEventListener('resize', showButton);

  useEffect(() => {
    showButton();
  }, []);

  return (
    <DashStyle>
      <div className='left'>
        <Sidebar />
      </div>
      <div className='right'>
        <DashHeader
          showMenu={showMenu}
          openMenu={openMenu}
          closeMenu={closeMenu}
          buttonShow={buttonShow}
        />

        {props.children}
      </div>
      {showMenu ? (
        <MobileFilter>
          <div
            data-active={showMenu ? 'active' : 'inactive'}
            className='overlay'
          >
            <div className='overlay-content'>
              <div className='overlay-content-sub'>
                <Sidebar />
              </div>
            </div>
          </div>
          {showMenu ? (
            <div className='overlayBack' onClick={closeMenu} />
          ) : null}
          {showMenu ? <Style /> : null}
        </MobileFilter>
      ) : null}
    </DashStyle>
  );
};
