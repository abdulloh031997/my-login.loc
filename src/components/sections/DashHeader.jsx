import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import UserImg from '../../assets/img/Avatar.png';
import RingBell from '../../assets/svg/ringbell.svg';
import { GetAuthInstance } from '../../helpers/httpClient';
import {removeToken, setRole, setToken} from '../../helpers/tokenStorage';

const Style = createGlobalStyle`
	body{
		overflow: hidden
	}
`;

const useDetect = (ref, state) => {
    const [active, setActive] = useState(state);
    useEffect(() => {
        const onClick = () => {
            if (active) {
                setActive(!active);
            }
        };
        window.addEventListener('click', onClick);
        return () => {
            window.removeEventListener('click', onClick);
        };
    }, [active, ref]);
    return [active, setActive];
};

const DashHeaderStyle = styled.section`
  width: 100%;
  margin-bottom: 30px;
  & .dashHeaderflex {
    display: flex;
    align-items: center;
    width: 100%;
    @media (max-width: 576px) {
      flex-direction: column;
      .dashHeaderRight {
        margin-top: 20px;
      }
    }
    & .dashHeaderLeft {
      width: 100%;
      margin-right: 12px;
      & .dashHeaderflexSub {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        & .searchflex {
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: space-between;
          padding: 12px 27px;
          .search {
            cursor: pointer;
          }
          input {
            margin-left: 21px;
            width: 100%;
            border: none;
            outline: none;
            outline-color: none;
            box-shadow: none;
          }
        }
        & .div11 {
          width: 100%;
          width: 100%;
          background: var(--white);
          margin-right: 12px;
          box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
          border-radius: 5px;
        }
        & .div22 {
          padding:0 10px;
          display: flex;
          width: auto;
          align-items: center;
          background: var(--white);
          box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
          border-radius: 5px;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #000;
          p {
            width: calc(100% - 24px);
            white-space: nowrap;
            margin-right: 20px !important;
          }
          img {
            width: 24px;
            height: 24px;
            object-fit: cover;
            border-radius: 50%;
          }
        }
      }
    }
    & .dashHeaderRight {
      & .dashHeaderflexSub {
        display: flex;
        width: 100%;
        & .div1 {
          cursor: pointer;
          padding: 12px 15px;
          position: relative;
          width: 48px;
          background: var(--white);
          margin-right: 12px;
          box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
          border-radius: 5px;
          & .redLine {
            width: 6px;
            height: 6px;
            position: absolute;
            top: 11px;
            right: 16px;
            border-radius: 50%;
            background: var(--danger);
          }
        }
        & .div2 {
          width: 144px;
          margin-right: 12px;
        }
      }
    }
  }
`;

const Container = styled.div`
  & .iconn {
    margin-right: 10px;
    background: #cf9338;
  }
  & button {
    background: transparent;
    border: none;
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    padding: 0;
    transition: 0.4s;
    display: flex;
    height: 100%;
    align-items: center;
    width: 100%;
    padding: 15px 16px;
    background: var(--warningbold);
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    color: var(--white);
    cursor: pointer;
    & svg {
      margin-left: 18px;
    }
  }
  & ul {
    background-color: var(--white);
    border: 1px solid #e2e4ea;
    list-style: none;
    margin: 0;
    overflow: hidden;
    position: absolute;
    border-radius: 6px;
    top: 70px;
    right: 32px;
    z-index: 10;
    @media (max-width: 576px) {
      top: 135px;
    }
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    &[data-active='active'] {
      opacity: 1;
      background: #fff;
      transform: translateY(0);
      visibility: visible;
    }
    &[data-active='inactive'] {
      opacity: 0;
      transform: translateY(-5px);
      visibility: hidden;
    }
    & li {
      /* border-top: 1px solid rgba(110, 120, 146, 0.15); */
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      padding: 15px 20px;
      transition: 0.4s;
      white-space: nowrap;
      &:first-child {
        border-top: none;
        @media (max-width: 576px) {
          border-top: 1px solid rgba(110, 120, 146, 0.15);
        }
      }
      &:last-child {
        border-bottom: none;
        @media (max-width: 576px) {
          border-bottom: 1px solid rgba(110, 120, 146, 0.15);
        }
      }
    }
  }
`;

const FormModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9997;
  display: flex;
  align-items: center;
  justify-content: center;
  & .formModalBack {
    position: fixed;
    background: rgba(0, 0, 0, 0.77);
    width: 100%;
    height: 100%;
    z-index: 9997;
  }
  & .formModalCard {
    position: absolute;
    z-index: 9998;
    width: 722px;
    margin: 0 15px;
    position: relative;
    background: var(--white);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & .closeMain {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding: 16px 26px;
      cursor: pointer;
    }
    & .groupStickerMain {
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 16px 141px;

      @media (max-width: 991px) {
        padding: 5px 30px;
      }
    }
    & .textFlex {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      padding: 5px 125px;
      color: #222222;
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      & p:nth-child(2) {
        margin-left: 17px !important;
        font-weight: 600;
      }

      @media (max-width: 991px) {
        padding: 5px 30px;
      }
    }
    & h2 {
      padding: 16px 125px;
      text-align: center;
      @media (max-width: 991px) {
        padding: 5px 30px;
      }
    }
    & a {
      display: flex;
      justify-content: center;
      margin: 36px 39px;
      color: #cf9338;
      font-weight: 500;
      font-size: 22px;
      line-height: 150%;
      @media (max-width: 991px) {
        margin: 25px;
      }
    }
  }
`;

const DashHeader = ({ showMenu, openMenu, closeMenu, buttonShow }) => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const [active, setActive] = useDetect(ref, false);
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState();

    const showHandle = () => setShowModal(!showModal);

    const getUser = () => {
        GetAuthInstance()
            .get(`/my/group`)
            .then((res) => {
                if (_.get(res, 'status')) {
                    setRole(res.data.group, true);
                    setUser(_.get(res, 'data', {}));
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <DashHeaderStyle>
            <div className='dashHeaderflex'>
                <div className='dashHeaderLeft'>
                    <div className='dashHeaderflexSub'>
                        <div className='div11'>
                            <form>
                                <div className='searchflex'>
                                    <span className='icon search' />
                                    <input
                                        type='text'
                                        placeholder='Поиск компаний, категорий, призов и т.д.'
                                    />
                                </div>
                            </form>
                        </div>
                        <div className='div22'>
                            <p style={{paddingTop:"15px"}} className="font-weight-bold">{user?.group}</p>
                            <svg style={{ width: 24, height: 24, flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.8633 0.412147C9.45876 0.579505 8.28704 0.889754 7.1463 1.39638C3.98807 2.79901 1.53324 5.58261 0.529668 8.8991C0.34117 9.52204 0.149906 10.4634 0.082683 11.0993C0.0206161 11.6859 0.0206161 13.1224 0.082683 13.7091C0.376563 16.4882 1.63909 19.068 3.67361 21.047C5.4975 22.8211 7.63862 23.8888 10.2305 24.3167C10.6401 24.3843 11.0113 24.4019 12.0353 24.4019C13.4439 24.4019 13.8225 24.3613 14.9318 24.0915C19.0015 23.1016 22.3184 19.9492 23.5409 15.9092C23.8872 14.765 24.0361 13.7105 24.0361 12.4042C24.0361 11.4223 23.987 10.8839 23.8199 10.0343C23.3485 7.63748 22.1796 5.49523 20.397 3.76136C18.6037 2.01711 16.4973 0.951551 13.9833 0.517004C13.533 0.439148 13.1755 0.416608 12.2228 0.405949C11.5653 0.398624 10.9536 0.401394 10.8633 0.412147ZM12.9729 4.11955C13.6487 4.29189 14.4162 4.7385 14.874 5.22569C15.637 6.03777 16.0168 7.06338 15.9581 8.15355C15.9286 8.70206 15.896 8.86021 15.7099 9.35895C15.2922 10.4786 14.2618 11.4217 13.0918 11.7554C12.55 11.91 11.5201 11.9111 10.9903 11.7578C10.1151 11.5045 9.34991 10.9614 8.82427 10.2206C7.89336 8.90858 7.85745 7.17673 8.73309 5.82088C9.33055 4.89572 10.2456 4.28311 11.3556 4.06518C11.7623 3.9853 12.5502 4.01178 12.9729 4.11955ZM15.0309 13.9563C16.8735 14.2558 18.3212 15.9559 18.3159 17.8141C18.314 18.4517 18.1133 18.8468 17.5709 19.2803C15.9502 20.5756 14.0833 21.2347 12.0353 21.2347C10.3275 21.2347 8.85478 20.8158 7.39434 19.9146C6.45537 19.3352 5.96642 18.8554 5.80244 18.3522C5.68572 17.9941 5.74999 17.1633 5.93647 16.6204C6.39878 15.2744 7.65456 14.1835 9.00029 13.9588C9.35882 13.899 14.6644 13.8967 15.0309 13.9563Z" fill="#94A3B8" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='dashHeaderRight'>
                    <div className='dashHeaderflexSub'>
                        <div className='div1' style={{ display: 'flex', alignItems: 'center' }}>

                            <a role={"button"} style={{ display: 'flex', alignItems: 'center' }} onClick={() => {
                                removeToken();
                                navigate('/');
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.876419 0.373393C0.60658 0.436717 0.337397 0.640045 0.174378 0.903744L0.0327326 1.13285L0.0212491 9.78429L0.00976562 18.4358L0.149396 18.6789C0.226218 18.8126 0.357927 18.9739 0.442108 19.0374C0.526289 19.1008 2.62004 20.2016 5.09485 21.4837C10.004 24.0268 9.85249 23.9597 10.1652 23.7278C10.417 23.5409 10.4133 23.5795 10.4141 21.0723L10.4148 18.7404L13.1685 18.7394C15.8374 18.7384 15.9287 18.7354 16.1331 18.6429C16.3931 18.5252 16.5791 18.3531 16.7116 18.1077C16.8122 17.9212 16.8128 17.9024 16.8256 14.5103L16.8385 11.1004H15.6421H14.4457V13.5188C14.4457 15.6734 14.4374 15.9513 14.369 16.0669C14.2016 16.3504 14.2043 16.35 12.2482 16.35H10.4636L10.4509 11.2527C10.4388 6.40008 10.434 6.1459 10.3509 5.95588C10.1821 5.56989 9.96095 5.43396 7.24325 4.04624L4.67301 2.73384L9.3025 2.72189C14.4059 2.70872 14.1648 2.69541 14.3507 3.00054C14.4393 3.14575 14.4454 3.23466 14.4455 4.38606L14.4457 5.61644H15.6422H16.8388L16.8257 3.40176C16.8138 1.38061 16.8054 1.17232 16.7285 1.01797C16.6096 0.779206 16.3793 0.556239 16.1331 0.441591L15.9222 0.343396L8.49303 0.336412C4.00246 0.332193 0.989754 0.346817 0.876419 0.373393ZM18.3908 3.39487C17.8584 3.66021 17.6405 4.26508 17.851 4.8933C17.917 5.09035 18.0627 5.26002 18.8424 6.04798L19.7565 6.97168L16.3395 6.98541L12.9224 6.99914L12.7019 7.10878C11.6851 7.61424 11.7477 9.1706 12.7992 9.52889C12.98 9.59048 13.4855 9.60074 16.4109 9.60206L19.8125 9.60356L18.9068 10.4944C17.8364 11.5473 17.7475 11.6855 17.7836 12.2422C17.8078 12.6146 17.8846 12.7978 18.1115 13.0248C18.4394 13.3526 19.0303 13.4655 19.4413 13.2787C19.6513 13.1832 23.6565 9.22994 23.8547 8.92247C23.9431 8.78541 23.9806 8.65296 23.9974 8.41846C24.0399 7.82403 24.1014 7.90301 21.7867 5.57978C20.2289 4.01634 19.6616 3.47572 19.4869 3.38854C19.1584 3.22463 18.7275 3.22712 18.3908 3.39487Z" fill="#94A3B8" />
                                </svg>
                            </a>
                        </div>

                        <div className='div3'>
                            {!buttonShow ? (
                                <button
                                    className='saveEditBtn'
                                    style={{
                                        marginTop: '0',
                                        background: '#CF9338',
                                    }}
                                    type='button'
                                    onClick={!showMenu ? openMenu : closeMenu}
                                >
                                    <span className='menuline' />
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            {showModal ? (
                <FormModal>
                    <div className='formModalBack' onClick={() => setShowModal(false)} />
                    <Style />
                </FormModal>
            ) : null}
        </DashHeaderStyle>
    );
};

export default DashHeader;
