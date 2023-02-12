import useCardDetail from '@/hooks/useCardDetail';
import { Card, CardDetail as CardDetailType } from '@/lib/gen/axios';
import CardImage from '../CardImage';
import Skeleton from '../Skeleton';
import style from "./style.module.scss"
import flex from "@/styles/flex.module.scss"

type Props = {
  uuid: string
}

const CardDetail: React.FC<Props> = ({ uuid }) => {


  const { data } = useCardDetail({
    uuid
  })

  return (
    <section className={style.container}>
      <div className={[style.body, flex.horizontal].join(" ")}>
        <div className={style.image}>
          <CardImage uuid={uuid} name={data?.name || "-"} size="lg" />
        </div>
        <div className={[style.description, flex.itemGrow].join(" ")}>
          <CardDescription detail={data} />
        </div>
      </div>
    </section>
  )
}

type DescriptionProps = {
  detail?: CardDetailType
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
    <div className={style.descriptions}>
      <h1 className={style.title}>
        {detail.name}
      </h1>
      <div>
        {detail.text?.split(/\n/g).map(line => <p>{line}</p>)}
      </div>
    </div>
  )
}

export default CardDetail