import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Table from './Table';
import { BASE_URL_WS } from '../../constants';
import { getUid } from '../../utils';
import './style.css';

const TableContainer: FC = () => {
  const [data, setData] = useState<any>(null);
  const [usersOnline, setUsersOnline] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const getData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e: { data: string }) => {
      const message = JSON.parse(e.data);
      if (message.auctionState) {
        setData(message.auctionState);
      }
      if (message.usersOnline) {
        setUsersOnline(message.usersOnline);
      }
    };
  }, []);

  useEffect(() => {
    const uid = getUid();
    console.log(uid);
    ws.current = new WebSocket(BASE_URL_WS + (uid ? `/${uid}` : ''));
    getData();
    return () => ws.current?.close();
  }, [ws, getData]);

  if (!data) {
    return <div>Нет данных...</div>;
  }

  return (
    <div className='container'>
      <h2 className='auction__header'>
        Ход торгов Тестовые торги на аппарат ЛОТОС №1234567 (20.01.2023 10:00)
      </h2>
      <p className='auction__subheader'>
        Уважаемые участники, во время вашего хода вы можете изменить параметры
        торгов, указанных в таблице:
      </p>
      {data && <Table data={data} usersOnline={usersOnline} />}
    </div>
  );
};

export default TableContainer;
