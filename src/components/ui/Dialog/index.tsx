import FocusTrap from 'focus-trap-react';
import { useModal } from 'react-hooks-use-modal';
import style from "./style.module.scss"

const Dialog = () => {

  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
  });


  return (
    <div>
      <div className={style.overlay} />
      <FocusTrap>

      </FocusTrap>
    </div>
  )
}

export default Dialog