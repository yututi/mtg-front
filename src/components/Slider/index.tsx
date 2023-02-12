import useCardList from '@/hooks/useCardList';
import PaginationContext, { PaginationUpdateContext } from '@/state/PaginationContext';
import CachedPageContext, { CachedPageUpdateContext } from "@/state/CachedPageContext"
import { CSSProperties, memo, useContext, useEffect, useMemo, useRef } from 'react';
import { FixedSizeList, FixedSizeList as List, ListChildComponentProps } from 'react-window';
import styles from "./style.module.css"
import { useHorizontalScroll, useParentWidthSyncronizer } from './hooks';
import { SIZES } from '../CardImage';
import Skeleton from '../Skeleton';
import Card from '../Card';
import { useSearchCondition } from '@/hooks/useSearchCondition';

const Slider = () => {

  const { count } = useContext(PaginationContext)

  const conditions = useSearchCondition()
  const update = useContext(CachedPageUpdateContext)
  const listRef = useRef<FixedSizeList<any>>(null)

  useEffect(() => {
    update({
      value: new Set()
    })
    listRef.current?.scrollTo(0)
    // listRef.current?.forceUpdate()
  }, [JSON.stringify(conditions)])

  const ref = useHorizontalScroll(2)

  const width = useParentWidthSyncronizer(size.w, ref)

  return (
    <List
      height={stepSize * (size.h + spacing) + scrollbarSize}
      useIsScrolling
      itemCount={Math.ceil(count / pageSize) || 1}
      itemSize={colSize * (size.w + spacing)}
      layout="horizontal"
      width={width}
      outerRef={ref}
      ref={listRef}
    >
      {CheckCardBlockRenderable}
    </List>
  )
};
export default Slider

// TODO　この辺もcontextにする
const colSize = 10
const size = {
  h: SIZES.sm.height,
  w: SIZES.sm.width
}
const spacing = 12
const pageSize = 20
const stepSize = Math.ceil(pageSize / colSize)
const scrollbarSize = 24

const rowStyle: CSSProperties = {
  height: `${(size.h + spacing) * stepSize}px`,
}

const cellStyle: CSSProperties = {
  height: `${size.h}px`,
  width: `${size.w}px`,
  marginTop: `${spacing}px`,
  marginLeft: `${spacing}px`
}

const CheckCardBlockRenderable = (props: ListChildComponentProps) => {

  const { value } = useContext(CachedPageContext)

  if (props.isScrolling && !value.has(props.index)) {
    return (
      <div style={props.style} className={styles.row}>
        <CardBlockSkeleton />
      </div>
    )
  }

  return <CardBlock {...props} />
}

const CardBlock = (props: ListChildComponentProps) => {

  const {
    data
  } = useCardList({
    page: props.index
  })

  const updatePage = useContext(PaginationUpdateContext)
  const updateCachedPage = useContext(CachedPageUpdateContext)

  // TODO この辺汚い
  // 読み込み済みのページ番号をキャッシュ
  // Sliderのスクロールサイズを決定するためcountを更新(検索条件ごとに１回呼べば問題ないが…)
  useEffect(() => {
    updateCachedPage(pages => {
      if (pages.value.has(props.index)) return pages
      pages.value.add(props.index)
      return {
        value: pages.value
      }
    })
    if (!data) return
    updatePage(page => ({ ...page, count: data.count }))
  }, [data])

  const _CardBlock = useMemo(() => {

    if (!data) {
      return <CardBlockSkeleton animation />
    }

    return [...Array(colSize).keys()].map(colIndex => (
      <div key={colIndex} className={styles.col} style={rowStyle}>
        {data.list.slice(colIndex * stepSize, colIndex * stepSize + stepSize).map(card => (
          <div key={card.uuid} style={cellStyle} className={styles.cell}>
            <Card card={card} height={size.h} width={size.w} abstract={props.isScrolling} />
          </div>
        ))}
      </div>
    ));
  }, [data, props.isScrolling])

  return (
    <div style={props.style} className={styles.row}>
      {_CardBlock}
    </div>
  )
}

const CardBlockSkeleton = ({ animation = false }: { animation?: boolean }) => {

  return (
    <>
      {[...Array(colSize).keys()].map(colIndex => (
        <div key={colIndex} className={styles.col} style={rowStyle}>
          {[...Array(pageSize).keys()].slice(colIndex * stepSize, colIndex * stepSize + stepSize).map(index => (
            <Skeleton key={index} animation={animation} style={cellStyle} />
          ))}
        </div>
      ))}
    </>
  )
}