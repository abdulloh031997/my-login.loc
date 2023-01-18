import SidebarItem from './SidebarItem';
import { SideBarData } from './SideBarData';
import styled from 'styled-components';
import Logo from '../../assets/img/Logo.png';
import LogoText from '../../assets/img/text.png';
import { Link, useNavigate } from 'react-router-dom';

const SideBarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  & img:nth-child(1) {
    margin-right: 16px;
  }
`;
const SideBarBottom = styled.div`
  padding: 12px 23px 30px 23px;
  button {
    cursor: pointer;
    background: #ffffff;
    width: 100%;
    border: 1px solid #cf9338;
    box-sizing: border-box;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    padding: 12px 16px;
    color: #cf9338;
    &:hover {
      background: #cf9338;
      border: 1px solid #cf9338;
      color: #fff;
      box-shadow: none;
    }
  }
`;
export default function Sidebar() {
  let navigate = useNavigate();
  return (
    <div className='sidebar'>
      <Link to='/dashboard/main'>
        <SideBarHeader>
          {/*<img src={Logo} style={{width: "38%"}} />*/}
          {/*<img src={LogoText}  style={{width: "38%"}} />*/}
        </SideBarHeader>
      </Link>
      {SideBarData.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </div>
  );
}
