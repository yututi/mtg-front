import useCardList from '@/hooks/useCardList';
import PaginationContext, { PaginationUpdateContext } from '@/state/PaginationContext';
import CachedPageContext, { CachedPageUpdateContext } from "@/state/CachedPageContext"
import Image from 'next/image';
import { CSSProperties, memo, useContext, useEffect, useRef, useState } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import styles from "./style.module.css"
import { useHorizontalScroll, useWidthSyncronizer } from './hooks';

const Slider = () => {

  const {
    count
  } = useContext(PaginationContext)

  const width = useWidthSyncronizer()

  const ref = useHorizontalScroll(0.1)

  return (
    <List
      height={stepSize * (size.h + spacing) + scrollbarSize}
      useIsScrolling
      itemCount={(count / pageSize) || 10}
      itemSize={colSize * (size.w + spacing)}
      layout="horizontal"
      width={width}
      outerRef={ref}
    >
      {CheckCardBlockRenderable}
    </List>
  )
};
export default Slider

// TODO　この辺もcontextにする
const colSize = 10
const size = {
  h: 150 * 1.5,
  w: 150
}
const spacing = 12
const pageSize = 20
const stepSize = Math.ceil(pageSize / colSize)
const scrollbarSize = 15

const CheckCardBlockRenderable = (props: ListChildComponentProps) => {

  const { value } = useContext(CachedPageContext)

  if (props.isScrolling && !value.has(props.index)) {
    return (
      <div style={props.style}></div>
    )
  }

  return <CardBlock {...props} />
}

const CardBlock = memo((props: ListChildComponentProps) => {

  const {
    data
  } = useCardList({
    page: props.index
  })

  const updatePage = useContext(PaginationUpdateContext)
  const updateCachedPage = useContext(CachedPageUpdateContext)

  useEffect(() => {
    if (!data) return

    updateCachedPage(pages => {
      if (pages.value.has(props.index)) return pages
      pages.value.add(props.index)
      return {
        value: pages.value
      }
    })
    updatePage(page => ({ ...page, count: data.count }))
  }, [data])

  const rowStyle: CSSProperties = {
    height: `${size.h}px`,
    marginTop: "6px"
  }

  const cellStyle: CSSProperties = {
    height: `${size.h}px`,
    width: `${size.w}px`
  }

  return (
    <div style={props.style} className={styles.col}>
      {data && [...Array(stepSize).keys()].map(step => (
        <div key={step} className={styles.row} style={rowStyle}>
          {data.list.slice(step * colSize, step * colSize + colSize).map(card => (
            <div key={card.uuid} style={cellStyle} className={styles.cell}>
              <Image src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${card.uuid}.jpeg`} alt={card.name} height={size.h} width={size.w} />
            </div>
          ))}
        </div>
      ))
      }
    </div>
  )
})