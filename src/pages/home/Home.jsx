import { useReducer } from "react";
import PageHeader from "../../components/pageHeader/PageHeader";

// counter Reducer function
const counterReducer = (state, { type, payload }) => {
  switch (type) {
    case "RESET":
      return { ...state, counter: 0 };

    case "INC":
      return { ...state, counter: state.counter + 1 };

    case "DESC":
      return { ...state, counter: state.counter - 1 };

    case "RANDOM":
      return { ...state, counter: payload };

    case "AUTO":
      return { ...state, auto: payload };

    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(counterReducer, {
    counter: 0,
    auto: null,
  });

  // handle random counter
  const handleRandomCounter = () => {
    dispatch({ type: "RANDOM", payload: Math.floor(Math.random() * 100) });
  };

  // handle auto increament
  const handleAutoInc = (val) => {
    if (val === "Auto Inc") {
      const autoInc = setInterval(() => {
        dispatch({ type: "INC" });
      }, 1000);

      dispatch({ type: "AUTO", payload: autoInc });
    } else {
      clearInterval(state.auto);
      dispatch({ type: "AUTO", payload: null });
    }
  };

  return (
    <>
      <PageHeader title="Starter" />

      <div className="conatainer">
        <div className="row justify-content-center  py-5">
          <div className="col-md-5">
            <h2>{state.counter}</h2>
            <hr />
            <button
              className="btn btn-sm btn-danger"
              onClick={() => dispatch({ type: "RESET", payload: "" })}
            >
              Reset
            </button>
            &nbsp;
            <button
              className="btn btn-sm btn-primary"
              onClick={() => dispatch({ type: "INC", payload: "" })}
            >
              ++
            </button>
            &nbsp;
            <button
              className="btn btn-sm btn-info"
              onClick={() => dispatch({ type: "DESC", payload: "" })}
            >
              --
            </button>
            &nbsp;
            <button
              className="btn btn-sm btn-info"
              onClick={handleRandomCounter}
            >
              Random
            </button>
            &nbsp;
            <button
              className="btn btn-sm btn-warning"
              onClick={() => handleAutoInc(state.auto ? "Stop" : "Auto Inc")}
            >
              {state.auto ? "Stop" : "Auto Inc"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
