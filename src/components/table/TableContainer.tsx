import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Table from './Table';
import { BASE_URL_WS } from '../../constants';

const TableContainer: FC = () => {
  const [data, setData] = useState<any>(null);
  const [usersOnline, setUsersOnline] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const getUid = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');
    return uid;
  };

  const getData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e: { data: string }) => {
      //подписка на получение данных по вебсокету
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
    ws.current = new WebSocket(BASE_URL_WS + (uid ? `/${uid}` : null));
    getData();
    return () => ws.current?.close();
  }, [ws, getData]);

  return (
    <div>
      <h2>
        Ход торгов Тестовые торги на аппарат ЛОТОС №1234567 (20.01.2023 10:00)
      </h2>
      <h3>
        Уважаемые участники, во время вашего хода вы можете изменить параметры
        торгов, указанных в таблице:
      </h3>
      {data && <Table data={data} usersOnline={usersOnline} />}
    </div>
  );
};

export default TableContainer;
