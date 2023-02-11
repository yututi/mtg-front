import useCardDetail from '@/hooks/useCardDetail';
import { Card } from '@/lib/gen/axios';
import CardDetailModalContext from '@/state/CardDetailModalContext';
import { useContext } from 'react';
import CardImage from '../CardImage';
import Skeleton from '../Skeleton';
import style from "./style.module.scss"

type Props = {
  card: Card
}

const CardDetail: React.FC<Props> = ({ card }) => {

  return (
    <div className={style.detailWrapper}>
      <div className={style.body}>
        <div className={style.image}>
          <CardImage card={card} height={680} width={488} />
        </div>
        <div className={style.description}>
          <CardDescription card={card} />
        </div>
      </div>
    </div>
  )
}

const CardDescription: React.FC<Props> = ({ card }) => {

  const { data } = useCardDetail({
    uuid: card.uuid
  })

  if (!data) {
    return (
      <div>
        <Skeleton />
      </div>
    )
  }

  return (
    <div>
      {data.text}
    </div>
  )
}

export default CardDetail