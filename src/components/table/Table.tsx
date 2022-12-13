import { FC, useEffect, useState } from 'react';
import { getFormattedMinutesAndSeconds } from '../../utils';

interface ITableProps {
  data: {
    participants: string[];
    activeParticipant: string;
    startTime: number;
    delay: number;
  };
}

const Table: FC<ITableProps> = ({ data }) => {
  const { participants, activeParticipant, startTime, delay } = data;

  const [remainedTime, setRemainedTime] = useState<number | null>(null);

  const calcTime = (startTime: number, delay: number): number => {
    return Math.ceil((startTime + delay - Date.now()) / 1000);
  };

  useEffect(() => {
    // setRemainedTime(0);
    setRemainedTime(calcTime(startTime, delay));
    const timer = setInterval(
      () => setRemainedTime(calcTime(startTime, delay)),
      1000
    );
    return () => {
      //   setRemainedTime(null);
      clearInterval(timer);
    };
  }, [data]); // mb individual properties should be included here?

  return (
    <table>
      <thead>
        <tr>
          <th>Ход</th>
          <th>
            {activeParticipant === participants[0] && remainedTime
              ? getFormattedMinutesAndSeconds(remainedTime)
              : null}
          </th>
          <th>
            {activeParticipant === participants[1] && remainedTime
              ? getFormattedMinutesAndSeconds(remainedTime)
              : null}
          </th>
          <th>
            {activeParticipant === participants[2] && remainedTime
              ? getFormattedMinutesAndSeconds(remainedTime)
              : null}
          </th>
          <th>
            {activeParticipant === participants[3] && remainedTime
              ? getFormattedMinutesAndSeconds(remainedTime)
              : null}
          </th>
        </tr>
        <tr>
          <th>Параметры и требования</th>
          <th>Участник №{participants[0]}</th>
          <th>Участник №{participants[1]}</th>
          <th>Участник №{participants[2]}</th>
          <th>Участник №{participants[3]}</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th>
            Наличие комплекса мероприятий, повышающих стандартны качества
            изготовления
          </th>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <th>Срок изготовления лота, дней</th>
          <td>80</td>
          <td>90</td>
          <td>75</td>
          <td>120</td>
        </tr>
        <tr>
          <th>Гарантийные обязательства, мес</th>
          <td>24</td>
          <td>24</td>
          <td>22</td>
          <td>36</td>
        </tr>
        <tr>
          <th>Гарантийные обязательства, мес</th>
          <td>24</td>
          <td>24</td>
          <td>22</td>
          <td>36</td>
        </tr>
        <tr>
          <th>Условия оплаты</th>
          <td>30%</td>
          <td>100%</td>
          <td>60%</td>
          <td>50%</td>
        </tr>
        <tr>
          <th>Стоимость изготовления лота, руб. (без НДС)</th>
          <td>
            <span className='auction-table__amount--blue'>3,700,000 руб.</span>
            <span className='auction-table__amount--red'>-25,000 руб.</span>
            <span className='auction-table__amount--green'>2,475,000 руб.</span>
          </td>
          <td>
            <span className='auction-table__amount--blue'>3,200,000 руб.</span>
            <span className='auction-table__amount--red'>-25,000 руб.</span>
            <span className='auction-table__amount--green'>2,475,000 руб.</span>
          </td>
          <td>
            <span className='auction-table__amount--blue'>2,800,000 руб.</span>
            <span className='auction-table__amount--red'>-25,000 руб.</span>
            <span className='auction-table__amount--green'>2,475,000 руб.</span>
          </td>
          <td>
            <span className='auction-table__amount--blue'>2,500,000 руб.</span>
            <span className='auction-table__amount--red'>-25,000 руб.</span>
            <span className='auction-table__amount--green'>2,475,000 руб.</span>
          </td>
        </tr>
        <tr>
          <th>Действия:</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
