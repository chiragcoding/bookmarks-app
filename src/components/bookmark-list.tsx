'use client'

import { useState } from 'react'
import { BookmarkItem } from './bookmark-item'
import { EditBookmarkModal } from './edit-bookmark-modal'

export type Bookmark = {
  id: string
  title: string
  url: string
  is_public: boolean
  created_at: string
  user_id: string
}

export function BookmarkList({ bookmarks }: { bookmarks: Bookmark[] }) {
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null)

  return (
    <>
      <ul className="space-y-2">
        {bookmarks.map((bookmark) => (
          <BookmarkItem
            key={bookmark.id}
            bookmark={bookmark}
            onEdit={() => setEditingBookmark(bookmark)}
          />
        ))}
      </ul>

      {editingBookmark && (
        <EditBookmarkModal
          bookmark={editingBookmark}
          onClose={() => setEditingBookmark(null)}
        />
      )}
    </>
  )
}
