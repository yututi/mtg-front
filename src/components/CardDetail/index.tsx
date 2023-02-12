import useCardDetail from '@/hooks/useCardDetail';
import { Card, CardDetail } from '@/lib/gen/axios';
import CardImage from '../CardImage';
import Skeleton from '../Skeleton';
import style from "./style.module.scss"

type Props = {
  uuid: string
}

const CardDetail: React.FC<Props> = ({ uuid }) => {


  const { data } = useCardDetail({
    uuid
  })

  return (
    <div className={style.container}>
      <div className={style.body}>
        <div className={style.image}>
          <CardImage uuid={uuid} name={data?.name || "-"} size="lg" />
        </div>
        <div className={style.description}>
          <CardDescription detail={data} />
        </div>
      </div>
    </div>
  )
}

type DescriptionProps = {
  detail?: CardDetail
}

const CardDescription: React.FC<DescriptionProps> = ({ detail }) => {

  if (!detail) {
    return (
      <div>
        <Skeleton />
      </div>
    )
  }

  return (
    <div>
      {detail.text}
    </div>
  )
}

export default CardDetail