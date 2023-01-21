import useOutsideClick from "@/hooks/useOutsideClick"
import React, { useState } from "react"
import Button from "../Button"
import Popup from "../Popup"
import Sheet from "../Sheet"
import style from "./style.module.scss"
import flex from "@/styles/flex.module.scss"


type Props = {
  options: { [key: string]: string }
  onChange: (values: string[]) => void
  values: string[]
}

const actionsClass = [flex.horizontal, flex.justfyEnd, flex.gap].join(" ")
const optionsClass = [flex.vertical, flex.gap].join(" ")
const popupClass = [flex.vertical, flex.gap2x].join(" ")
const optionClass = (selected: boolean) => [style.option, selected && style.optionSelected].join(" ")

const MultiSelect: React.FC<Props> = ({
  options,
  onChange,
  values = []
}) => {

  const [isVisible, setIsVisible] = useState(false)

  const ref = useOutsideClick(() => setIsVisible(false))

  const createOnSelectHandler = (value: string) => () => {
    onChange(values.includes(value) ? values.filter(v => v !== value) : [...values, value])
  }

  return (
    <div ref={ref} className={style.selectWrapper}>
      <input type="text" readOnly value={values.map(v => options[v])} onClick={() => !isVisible && setIsVisible(true)} />
      <Popup y="bottom" isVisible={isVisible}>
        <Sheet className={popupClass}>
          <div className={optionsClass}>
            {Object.entries(options).map(([key, value]) => (
              <div className={optionClass(values.includes(key))} key={key} onClick={createOnSelectHandler(key)}>{value}</div>
            ))}
          </div>
          <div className={actionsClass}>
            <Button onClick={() => onChange([])}>
              Clear
            </Button>
            <Button onClick={() => setIsVisible(false)}>
              OK
            </Button>
          </div>
        </Sheet>
      </Popup>
    </div>
  )
}

export default MultiSelect