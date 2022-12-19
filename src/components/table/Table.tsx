import { FC, useEffect, useState } from 'react';
import { formatTimer, getUid } from '../../utils';

interface IParameters {
  [key: string]: string;
}

interface IAuctionState {
  parameters: IParameters;
  participants: {
    id: string;
    name: string;
    currentOffer: {
      [key: keyof IParameters]:
        | string
        | {
            [key: string]: string;
          };
    };
  }[];
  activeParticipantId: string;
  startTime: number;
  waitTime: number;
}

interface ITableProps {
  data: IAuctionState;
  usersOnline: string[];
}

const Table: FC<ITableProps> = ({ data, usersOnline }) => {
  const { parameters, participants, activeParticipantId, startTime, waitTime } =
    data;

  const [currentUid, setCurrentUid] = useState('');
  const [remainedTime, setRemainedTime] = useState<number | null>(null);

  const calcTime = (startTime: number, delay: number): number => {
    return Math.ceil((startTime + delay - Date.now()) / 1000);
  };

  useEffect(() => {
    setRemainedTime(calcTime(startTime, waitTime));
    const timer = setInterval(() => {
      const currentValue = calcTime(startTime, waitTime);
      if (currentValue >= 0) {
        setRemainedTime(currentValue);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [data]);

  useEffect(() => {
    const uid = getUid();
    if (uid) setCurrentUid(uid);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th className='auction__header--primary auction__header--move'>
            Ход
          </th>
          {participants.map((participant) => (
            <th key={participant.id}>
              {activeParticipantId === participant.id && remainedTime ? (
                <span className='auction__timer'>
                  {formatTimer(remainedTime)}
                </span>
              ) : null}
            </th>
          ))}
        </tr>
        <tr>
          <th className='auction__header--primary'>Параметры и требования</th>
          {participants.map((participant) => (
            <th key={participant.id} className='auction__header--primary'>
              <div className='auction__participant'>
                {participant.name}
                {participant.id === currentUid && ' (вы)'}
                {usersOnline.indexOf(participant.id) !== -1 ? (
                  <span className='online'> </span>
                ) : (
                  <span className='offline'> </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(parameters).map(([key, value], index) => (
          <tr key={index}>
            <th className='auction__header--secondary'>{value}</th>
            {participants.map((participant) => (
              <td key={participant.id}>
                <>
                  {typeof participant.currentOffer[key] === 'object'
                    ? Object.values(participant.currentOffer[key]).map(
                        (value, index) => (
                          <span key={index} className={`color-${index}`}>
                            {value}
                          </span>
                        )
                      )
                    : null}
                  {typeof participant.currentOffer[key] === 'string'
                    ? participant.currentOffer[key]
                    : null}
                </>
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <th className='auction__header--secondary'>Действия:</th>
          {participants.map((participant) => (
            <td key={participant.id}></td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
