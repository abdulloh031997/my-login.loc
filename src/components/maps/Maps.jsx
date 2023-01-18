import React, { useState, useEffect } from 'react';
import BukharaMap from './BukharaMap';
import KarakalpakstanMap from './KarakalpakstanMap';
import AndijanMap from './AndijanMap';
import JizzakhMap from './JizzakhMap';
import KashkadaryaMap from './KashkadaryaMap';
import NavoiyMap from './NavoiyMap';
import NamanganMap from './NamanganMap';
import SamarqandaMap from './SamarqandaMap';
import SurxondaryoMap from './SurxondaryoMap';
import SirdaryoMap from './SirdaryoMap';
import TashkentMap from './TashkentMap';
import FargonaMap from './FargonaMap';
import XorazmMap from './XorazmMap';
import TashkentCityMap from './TashkentCityMap';
import UzbMap from './UzbMap';
import _ from 'lodash';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RegionMaps = styled.div`
  width: 100%;
  height: 100%;
  float: left;
  position: relative;
  & .map_tooltip {
    position: absolute;
    cursor: default;
    & .map_tooltip_item {
      max-width: 629px !important;
      min-width: 0 !important;
      max-height: 439px !important;
      min-height: 0 !important;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      padding: 15px 27px;
      background: #ffffff;
      border: 1px solid #e7e7e7;
      color: #0f172a;
      cursor: default;
      @media (max-width: 991px) {
        display: none;
      }
      p {
        text-align: center;
        font-weight: 500;
        font-size: 19px;
        line-height: 24px;
        color: #0f172a;
      }
      & .map_progress_flex {
        display: flex;
        justify-content: center;
        width: 100%;
        & .div1 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
        }
        p {
          text-align: center;
          margin-top: 17px !important;
          margin-bottom: 13px !important;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: #0f172a;

          width: 100%;
          min-width: 123px;
        }
        & div:nth-child(1) {
          margin-right: 28px;
        }

        .map_progress_card {
          width: 123px;
          height: 123px;
          display: flex;
          justify-content: center;
          width: 100%;
        }
      }
    }
  }
  & .map_tooltip2 {
    display: none;
    @media (max-width: 991px) {
      display: block;
    }
    & .map_tooltip_item {
      max-width: 100% !important;
      min-width: 0 !important;
      max-height: 439px !important;
      min-height: 0 !important;
      border-radius: 5px;
      padding: 15px 27px;
      background: #ffffff;
      border: 1px solid #e7e7e7;
      color: #0f172a;
      cursor: default;

      p {
        text-align: center;
        font-weight: 500;
        font-size: 19px;
        line-height: 24px;
        color: #0f172a;
      }
      & .map_progress_flex {
        display: flex;
        justify-content: center;
        width: 100%;
        @media (max-width: 576px) {
          flex-direction: column;
        }
        & .div1 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
        }
        p {
          text-align: center;
          margin-top: 17px !important;
          margin-bottom: 13px !important;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: #0f172a;

          width: 100%;
          min-width: 123px;
        }
        & div:nth-child(1) {
          margin-right: 28px;
        }

        .map_progress_card {
          width: 123px;
          height: 123px;
          display: flex;
          justify-content: center;
          width: 100%;
        }
      }
    }
  }
`;

const Map = ({
  map_id,
  map_key,
  data,
  map_select = '',
  exceptEnter = () => {
    return 0;
  },
  exceptLeave = () => {
    return 0;
  },
}) => {
  const [show_tooltip, setShow_tooltip] = useState('');
  const [tooltip, setTooltip] = useState({});
  const [active_map, setActive_map] = useState({});
  useEffect(() => {
    let show_map = {},
      new_data = [];
    if (map_id === 0) show_map = UzbMap;
    if (map_id === 41) show_map = BukharaMap;
    if (map_id === 100) show_map = KarakalpakstanMap;
    if (map_id === 233) show_map = AndijanMap;
    if (map_id === 53) show_map = JizzakhMap;
    if (map_id === 67) show_map = KashkadaryaMap;
    if (map_id === 82) show_map = NavoiyMap;
    if (map_id === 93) show_map = NamanganMap;
    if (map_id === 94) show_map = SamarqandaMap;
    if (map_id === 95) show_map = SurxondaryoMap;
    if (map_id === 96) show_map = SirdaryoMap;
    if (map_id === 97) show_map = TashkentMap;
    if (map_id === 98) show_map = FargonaMap;
    if (map_id === 99) show_map = XorazmMap;
    if (map_id === 101) show_map = TashkentCityMap;

    if (!show_map.map_data) show_map = UzbMap;
    if (data) {
      _.get(show_map, 'map_data', []).forEach((item) => {
        const d = _.get(data, _.findKey(data, ['slug', item.slug]), {});
        new_data.push({ ...item, ...d, value: _.get(d, 'value', 0) });
      });
      setActive_map({ ...show_map, map_data: new_data });
    } else {
      setActive_map(show_map);
    }
  }, [map_id]);

  const handleMove = (e) => {
    const clientWidth = _.get(e, 'target.parentElement.clientWidth', 0);
    const clientHeight = _.get(e, 'target.parentElement.clientHeight', 0);
    const x = e.nativeEvent.layerX;
    const y = e.nativeEvent.layerY;
    if (x < clientWidth / 2) {
      document.getElementById('map_tooltip_' + map_key).style.left =
        x + 20 + 'px';
      document.getElementById('map_tooltip_' + map_key).style.right = null;
    } else {
      document.getElementById('map_tooltip_' + map_key).style.right =
        clientWidth - x + 10 + 'px';
      document.getElementById('map_tooltip_' + map_key).style.left = null;
    }
    if (y < clientHeight / 2) {
      document.getElementById('map_tooltip_' + map_key).style.top =
        y + 20 + 'px';
      document.getElementById('map_tooltip_' + map_key).style.bottom = null;
    } else {
      document.getElementById('map_tooltip_' + map_key).style.bottom =
        clientHeight - y + 10 + 'px';
      document.getElementById('map_tooltip_' + map_key).style.top = null;
    }
  };

  return (
    <RegionMaps>
      <svg
        className='svg_target'
        width='100%'
        height='100%'
        viewBox={_.get(active_map, 'viewBox')}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{ maxHeight: 452 }}
      >
        {_.get(active_map, 'map_data', []).map((item, index) => (
          <React.Fragment key={index}>
            <path
              id={item.slug + map_key}
              onMouseMove={(e) => {
                handleMove(e);
                exceptEnter(item);
                setShow_tooltip(item.slug + map_key);
                setTooltip({
                  city_name: item.city_name,
                  activation_cupon_text: "0%",
                  activation_cupon: 0,
                  activation_sticker_text: "0%",
                  activation_sticker: 0,
                });
              }}
              onMouseLeave={() => {
                exceptLeave();
                setShow_tooltip('');
              }}
              style={
                map_select === item.slug
                  ? { fill: '#4B4BFF' }
                  : show_tooltip === item.slug + map_key
                  ? { fill: '#5C8AFF' }
                  : { fill: '#fff', stroke: '#C4C4C4', strokeWidth: '1' }
              }
              stroke='white'
              strokeWidth='0.8'
              d={item.data}
            />
            <text
              x={item.textX + '%'}
              y={item.textY + '%'}
              dominantBaseline='middle'
              textAnchor='middle'
              onMouseMove={(e) => {
                handleMove(e);
                exceptEnter(item);
                setShow_tooltip(item.slug + map_key);
                setTooltip({
                  city_name: item.city_name,
                  activation_cupon_text: item.activation_cupon_text,
                  activation_cupon: item.activation_cupon,
                  activation_sticker_text: item.activation_sticker_text,
                  activation_sticker: item.activation_sticker,
                });
              }}
              onMouseLeave={() => {
                exceptLeave();
                setShow_tooltip('');
              }}
            >
              {item.value}
            </text>
          </React.Fragment>
        ))}
      </svg>
      <div id={'map_tooltip_' + map_key} className='map_tooltip'>
        {show_tooltip ? (
          <div className='map_tooltip_item'>
            <p>{tooltip.city_name}</p>
            <div className='map_progress_flex'>
              <div className='div1'>
                <p>{tooltip.activation_cupon_text}</p>
                <div className='map_progress_card'>
                  <CircularProgressbar
                    value={tooltip.activation_cupon}
                    text={`${tooltip.activation_cupon}%`}
                    styles={buildStyles({
                      textColor: '#475569',
                      pathColor: '#00D097',
                      trailColor: '#b3f1e0',
                    })}
                  />
                </div>
              </div>
              <div className='div1'>
                <p>{tooltip.activation_sticker_text}</p>
                <div className='map_progress_card'>
                  <CircularProgressbar
                    value={tooltip.activation_sticker}
                    text={`${tooltip.activation_sticker}%`}
                    styles={buildStyles({
                      textColor: '#475569',
                      pathColor: '#00D097',
                      trailColor: '#b3f1e0',
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div id={'map_tooltip_' + map_key} className='map_tooltip2'>
        {show_tooltip ? (
          <div className='map_tooltip_item'>
            <p>{tooltip.city_name}</p>
            <div className='map_progress_flex'>
              <div className='div1'>
                <p>{tooltip.activation_cupon_text}</p>
                <div className='map_progress_card'>
                  <CircularProgressbar
                    value={tooltip.activation_cupon}
                    text={`${tooltip.activation_cupon}%`}
                    styles={buildStyles({
                      textColor: '#475569',
                      pathColor: '#00D097',
                      trailColor: '#b3f1e0',
                    })}
                  />
                </div>
              </div>
              <div className='div1'>
                <p>{tooltip.activation_sticker_text}</p>
                <div className='map_progress_card'>
                  <CircularProgressbar
                    value={tooltip.activation_sticker}
                    text={`${tooltip.activation_sticker}%`}
                    styles={buildStyles({
                      textColor: '#475569',
                      pathColor: '#00D097',
                      trailColor: '#b3f1e0',
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </RegionMaps>
  );
};
export default Map;
