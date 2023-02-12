import { useSelectedCardId, useUpdateSelectedCardId } from '@/hooks/useSelectedCardId';
import { useEffect } from 'react';
import { useModal } from 'react-hooks-use-modal'; // TODO ダイアログ部品は自作する
import CardDetail from '../CardDetail';
import Button from '../ui/Button';

const CardDetailDialog = () => {

  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
  });

  const id = useSelectedCardId()

  useEffect(() => {
    if (id) !isOpen && open()
    else isOpen && close()
  }, [id])

  const updateSelectedCardId = useUpdateSelectedCardId()

  const onClose = () => {
    updateSelectedCardId()
  }

  return (
    <Modal>
      <header><Button onClick={onClose}>x</Button></header>
      {id && <CardDetail uuid={id} />}
    </Modal>
  )
}

export default CardDetailDialog