import { use, useActionState, useOptimistic } from "react";
import { OpinionsContext } from "../store/opinions-context";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  const [optimisticVotes, setVotesOptimistically] = useOptimistic(
    votes,
    (prevVotes, mode) => (mode === "up" ? prevVotes + 1 : prevVotes - 1)
  );

  const [voteUpFormState, voteUpFormAction, voteUpPending] = useActionState(
    voteUpAction,
    null
  );
  const [voteDownFormState, voteDownFormAction, voteDownPending] =
    useActionState(voteDownAction, null);

  async function voteUpAction() {
    setVotesOptimistically("up");
    await upvoteOpinion(id);
  }

  async function voteDownAction() {
    setVotesOptimistically("down");
    await downvoteOpinion(id);
  }

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button
          formAction={voteUpFormAction}
          disabled={voteUpPending || voteDownPending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              width="18"
              height="18"
              x="3"
              y="3"
              rx="2"
            />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button
          formAction={voteDownFormAction}
          disabled={voteDownPending || voteUpPending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              width="18"
              height="18"
              x="3"
              y="3"
              rx="2"
            />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
