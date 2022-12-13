import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Table from './Table';
import { BASE_URL_WS } from '../../constants';

const TableContainer: FC = () => {
  const [data, setData] = useState<any>(null);
  const ws = useRef<WebSocket | null>(null);

  const getData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e: { data: string }) => {
      //подписка на получение данных по вебсокету
      const message = JSON.parse(e.data);
      setData(message);
    };
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(BASE_URL_WS);
    getData();
    return () => ws.current?.close();
  }, [ws, getData]);

  return (
    <div>
      {data && <h1>{JSON.stringify(data)}</h1>}
      <h2>
        Ход торгов Тестовые торги на аппарат ЛОТОС №1234567 (20.01.2023 10:00)
      </h2>
      <h3>
        Уважаемые участники, во время вашего хода вы можете изменить параметры
        торгов, указанных в таблице:
      </h3>
      {data && <Table data={data} />}
    </div>
  );
};

export default TableContainer;
