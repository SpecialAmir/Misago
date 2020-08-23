import { Trans } from "@lingui/macro"
import React from "react"
import { useModalContext } from "../../../../Context"
import { Modal, ModalDialog } from "../../../../UI"
import { IPost, IThread } from "../../Thread.types"
import ThreadPostsModerationDeleteForm from "./ThreadPostsModerationDeleteForm"

interface IThreadPostsModerationDeleteProps {
  thread: IThread
  posts: Array<IPost>
  page: number | undefined
}

const ThreadPostsModerationDelete: React.FC<IThreadPostsModerationDeleteProps> = ({
  thread,
  posts,
  page,
}) => {
  const { isOpen, closeModal } = useModalContext()

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <ModalDialog
        title={<Trans id="moderation.delete_posts">Delete posts</Trans>}
        close={closeModal}
      >
        <ThreadPostsModerationDeleteForm
          thread={thread}
          posts={posts}
          page={page}
          close={closeModal}
        />
      </ModalDialog>
    </Modal>
  )
}

export default ThreadPostsModerationDelete