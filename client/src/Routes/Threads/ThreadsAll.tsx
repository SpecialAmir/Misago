import { t } from "@lingui/macro"
import { I18n } from "@lingui/react"
import React from "react"
import { RouteLoader, WindowTitle } from "../../UI"
import { ForumStatsContext, SettingsContext } from "../../Context"
import { HeaderAllThreads } from "./Header"
import LoadMoreButton from "./LoadMoreButton"
import { IThreadsProps } from "./Threads.types"
import ThreadsLayout from "./ThreadsLayout"
import ThreadsList from "./ThreadsList"
import { useThreadsQuery } from "./useThreadsQuery"

const ThreadsAll: React.FC<IThreadsProps> = ({ openCategoryPicker }) => {
  const forumStats = React.useContext(ForumStatsContext)
  const settings = React.useContext(SettingsContext)
  const { data, error, loading, fetchMoreThreads } = useThreadsQuery()

  if (!forumStats || !settings) return <RouteLoader />

  const isIndex = settings.forumIndexThreads
  const { threads } = data || { threads: null }

  return (
    <ThreadsLayout openCategoryPicker={openCategoryPicker}>
      <I18n>
        {({ i18n }) => {
          return (
            <>
              <WindowTitle
                index={isIndex}
                title={i18n._(t("threads.title")`Threads`)}
              />
              <HeaderAllThreads settings={settings} stats={forumStats} />
              <ThreadsList error={error} loading={loading} threads={threads} />
              {threads && threads.nextCursor && (
                <LoadMoreButton loading={loading} onClick={fetchMoreThreads} />
              )}
            </>
          )
        }}
      </I18n>
    </ThreadsLayout>
  )
}

export default ThreadsAll