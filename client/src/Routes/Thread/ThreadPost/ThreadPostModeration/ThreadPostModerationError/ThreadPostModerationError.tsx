import { ApolloError } from "apollo-client"
import React from "react"
import { ModalCloseFooter, ModalErrorBody } from "../../../../../UI"
import { IMutationError } from "../../../../../types"
import ThreadPostRootError from "../../ThreadPostRootError"
import ThreadPostModerationErrorHeader from "./ThreadPostModerationErrorHeader"

interface IThreadPostModerationErrorProps {
  graphqlError?: ApolloError | null
  errors?: Array<IMutationError> | null
  forDelete?: boolean
  close: () => void
}

const ThreadPostModerationError: React.FC<IThreadPostModerationErrorProps> = ({
  graphqlError,
  errors,
  forDelete,
  close,
}) => (
  <>
    <ThreadPostRootError graphqlError={graphqlError} dataErrors={errors}>
      {({ message }) => (
        <ModalErrorBody
          header={<ThreadPostModerationErrorHeader forDelete={forDelete} />}
          message={message}
        />
      )}
    </ThreadPostRootError>
    <ModalCloseFooter close={close} />
  </>
)

export default ThreadPostModerationError