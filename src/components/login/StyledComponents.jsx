import styled from 'styled-components';
export const LoginStyle = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  //background: red;
  & .containerLogin {
    max-width: 722px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    background: var(--white);
    box-shadow: 0px 6px 18px rgba(196, 203, 214, 0.75);
    border-radius: 15px;
    padding: 53px 90px;

    @media (max-width: 991px) {
      background: transparent;
      box-shadow: none;
      padding: 15px;
    }
    & .loginLogoMain {
      display: flex;
      justify-content: center;
      width: 100%;
      & .loginLogo {
        width: 80px;
        //height: 100px;
        border-radius: 50%;
      }
    }
    h2 {
      color: #475569;
      text-align: center;
      margin-top: 10px !important;
    }
    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: #475569;
      text-align: center;
      a {
        color: #475569;

        &:focus-visible {
          outline-color: var(--warningbold);
        }
      }
    }
    & .loginForm {
      margin-top: 12px;
      & .loginFormSub {
        display: flex;
        justify-content: center;
        width: 100%;
        position: relative;
        
        & input {
          box-sizing: border-box;
          background: #f5f6f8;
          border-radius: 5px;
          padding: 12px 17px;
          width: 300px;
          border: none;
          margin: 12px 0;
          &:focus-visible {
            outline-color: var(--warningbold);
          }
          & .chaptchaInput{
            & input{
              width: 100px;
            }
          }
        }
        & button {
          &:hover {
            border: 1px solid var(--warningbold);
            box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
            background: var(--white);
            color: var(--warningbold);
          }
        }
        & .loadBtn {
          width: 300px;
          box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
          background: var(--warningbold);
          border: 1px solid var(--warningbold);
          border-radius: 5px;
          padding: 12px 17px;
          margin-top: 12px;
          color: var(--white);
          transition: 400ms;
          cursor: pointer;
          &:focus-visible {
            outline-color: var(--warningbold);
          }
        }
        & button {
          width: 300px;
          box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
          background: var(--warningbold);
          border: 1px solid var(--warningbold);
          border-radius: 5px;
          padding: 12px 17px;
          margin-top: 12px;
          color: var(--white);
          transition: 400ms;
          cursor: pointer;
          &:focus-visible {
            outline-color: var(--warningbold);
          }
        }
      }
    }
  }

  & .LoginImg {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;

    @media (max-width: 991px) {
      display: none;
    }
  }
`;
