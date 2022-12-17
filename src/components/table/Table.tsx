import { FC, useEffect, useState } from 'react';
import { getFormattedMinutesAndSeconds } from '../../utils';

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
}

const Table: FC<ITableProps> = ({ data }) => {
  const { parameters, participants, activeParticipantId, startTime, waitTime } =
    data;

  const [remainedTime, setRemainedTime] = useState<number | null>(null);

  const calcTime = (startTime: number, delay: number): number => {
    return Math.ceil((startTime + delay - Date.now()) / 1000);
  };

  useEffect(() => {
    // setRemainedTime(0);
    setRemainedTime(calcTime(startTime, waitTime));
    const timer = setInterval(
      () => setRemainedTime(calcTime(startTime, waitTime)),
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
          {participants.map((participant) => (
            <th>
              {activeParticipantId === participant.id && remainedTime
                ? getFormattedMinutesAndSeconds(remainedTime)
                : null}
            </th>
          ))}
        </tr>
        <tr>
          <th>Параметры и требования</th>
          {participants.map((participant) => (
            <th>{participant.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(parameters).map(([key, value]) => (
          <tr>
            <th>{value}</th>
            {participants.map((participant) => (
              <td>
                <>
                  {typeof participant.currentOffer[key] === 'object'
                    ? Object.values(participant.currentOffer[key]).map(
                        (value) => <span>{value}</span>
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
          <th>Действия:</th>
          {participants.map((participant) => (
            <td></td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
