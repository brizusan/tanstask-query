import { FiSkipBack } from "react-icons/fi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";

// const comment1 =
//   "It would provide the ability to create a state, read the state \r\nand set the state form anywhere in the code base.\r\n\r\nIt would be something like this:\r\n\r\n## adding the state to the global state\r\n\r\n```js\r\nimport {useGlobalState} from 'react';\r\nconst ProviderComponent = ()=>{\r\n\r\n  const [ceateState, _, _] = useGlobalState();\r\n\r\n  createState('provider', 'stateName', 'state value');\r\n  createState('provider', 'otherStateName', 'another state value');\r\n  // or maybe, set all the states in one line\r\n  createState('provider', {stateName: 'state value', anotherStateName: 'another state value'});\r\n\r\n  return <></>\r\n}\r\n```\r\n\r\n##  now I can use it like so:\r\n\r\n```js\r\nimport {useGlobalState} from 'react';\r\n\r\nconst ConsumerComponent = ()=>{\r\n  \r\n  const [_, getState, setState] = useGlobalState();\r\n\r\n  const providerStateCpy = getState('key', 'stateName');\r\n\r\n  const changeProviderState = ()=>{\r\n    setState('key', 'stateName', 'new state value');\r\n  }\r\n  return <p onClick={changeProviderState}>{providerStateCpy}</p>\r\n}\r\n```\r\nI wonder if it's a possible thing without making major changes though.";
// const comment2 =
//   "In order to familiarize myself with react codebase, I wrote a small test that fails on this pattern. (even if it is expected so)\r\n\r\nHere is it fwiw (in `packages/react-reconciler/src/__tests__/useSyncExternalStore-test.js`):\r\n\r\n```js\r\ntest('store value is correctly stored in current hook instance even with interleaved effects occurring', async () => {\r\n    const store = createExternalStore('value:initial');\r\n\r\n    function App() {\r\n      const value = useSyncExternalStore(store.subscribe, store.getState);\r\n      const [sameValue, setSameValue] = useState(value);\r\n      if (value !== sameValue) setSameValue(value);\r\n      return <Text text={value} />;\r\n    }\r\n\r\n    const root = ReactNoop.createRoot();\r\n    act(() => {\r\n      // Start a render that reads from the store and yields value\r\n      root.render(<App />);\r\n    });\r\n    expect(Scheduler).toHaveYielded(['value:initial']);\r\n\r\n    await act(() => {\r\n      store.set('value:changed');\r\n    });\r\n    expect(Scheduler).toHaveYielded(['value:changed']);\r\n\r\n    await act(() => {\r\n      store.set('value:initial');\r\n    });\r\n    expect(Scheduler).toHaveYielded(['value:initial']); \r\n  });\r\n});\r\n```\r\n\r\nThe last assertion fails with the `setSameValue` line, and passes without.";
// const comment3 =
//   "What I don't understand is that in `renderWithHooks`, there is the following block:\r\n\r\n```js\r\n// Check if there was a render phase update\r\n  if (didScheduleRenderPhaseUpdateDuringThisPass) {\r\n```\r\n\r\nWhich runs if `setState` was called in render. Then, it calls again component function - but to do so, it resets the `workInProgress` state, including `updateQueue`. IIUC this discards the effects pushed by previous hooks, without flushing them?\r\n\r\nThat's why `useSyncExternalStore` effect to update store value is not run, in that case.\r\n\r\nThe fact that there is code written to manage `setState` calls in render, seem to acknowledge it is a legit use case?\r\n\r\nI must be missing something 😅 how to make sure those effects are run even if component function is called again before end of work?";

export const IssueView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const { issueQuery, commentsQuery } = useIssue({ issueID: Number(id) });

  const isEmptyComments = commentsQuery.data?.length === 0;

  if (issueQuery.isLoading) return <div>Loading...</div>;
  if (!issueQuery.data) return <Navigate to={`/404`} />;
  if (issueQuery.data)
    return (
      <div className="mb-5">
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="hover:underline text-blue-400 flex items-center"
          >
            <FiSkipBack />
            Regresar
          </button>
        </div>

        {/* Primer comentario */}

        {commentsQuery.isLoading ? (
          <div>loading....</div>
        ) : (
          commentsQuery.data?.map((comment) => (
            <IssueComment key={comment.id} issue={comment} />
          ))
        )}

        {isEmptyComments && <p>No tenemos contenido para mostrar</p>}

        {/* Comentario de otros */}
        {/* <IssueComment body={comment2} /> */}
        {/* <IssueComment body={comment3} /> */}
      </div>
    );
};
