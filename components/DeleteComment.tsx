import { useContext, useState } from 'react';
import { AuthContext } from '../lib/context';
import { useGiscusTranslation } from '../lib/i18n';
import { deleteDiscussionComment } from '../services/github/deleteDiscussionComment.mjs';

export default function DeleteComment({
  id,
  allowed,
  onDeleted,
}: {
  id: string;
  allowed?: boolean;
  onDeleted?: () => void;
}) {
  const { token } = useContext(AuthContext);
  const { lang } = useGiscusTranslation();
  const chinese = lang.startsWith('zh');
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  if (!token || !allowed) return null;
  const remove = async () => {
    if (
      busy ||
      !window.confirm(
        chinese
          ? '删除这条留言？此操作无法撤销，已有回复会保留。'
          : 'Delete this comment? This cannot be undone. Existing replies will remain.',
      )
    )
      return;
    setBusy(true);
    setFailed(false);
    try {
      await deleteDiscussionComment(id, token);
      onDeleted?.();
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };
  return (
    <span className="franklin-moderation">
      <button type="button" disabled={busy} onClick={remove}>
        {busy ? (chinese ? '删除中…' : 'Deleting…') : chinese ? '删除' : 'Delete'}
      </button>
      {failed ? (
        <span role="alert">
          {chinese ? '删除失败，请重试。' : 'Could not delete. Please retry.'}
        </span>
      ) : null}
    </span>
  );
}
