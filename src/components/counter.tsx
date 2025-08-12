import React from 'react';

const Counter = () => {
  //useState can be any type, not just number
  //2 useState because we want to keep the current count and the input value separate, temp var won't cause re-render
  //useState returns an array with two elements: the current state and a function to update

  const [count, setCount] = React.useState(0);
  const [Acount, setAcount] = React.useState(count);

  return (
    <section className="flex w-2/3 flex-col items-center gap-8 border-4 border-primary-500 bg-white p-8 shadow-lg">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count}</p> {/*the vaule here*/}
      <div className="flex gap-2">
        <button onClick={()=>setCount(count -1)}>➖ Decrement</button> {/*set the value with function and it auto re-render*/}
        <button onClick={()=>setCount(0) }>🔁 Reset</button>
        {/*we need arrow function or const when click/onclick,...to
        1. passing vaule to function (setCount(count+1))
        2. call function directly will trigger immediately, arrow function/const prevent that
        3. const functions are event handler and re-create every render different from ReactBuilt-In and Component function*/}
        <button onClick={()=>setCount(count+1)}>➕ Increment</button>
      </div>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          setCount(Acount);
        }}>
          <input
            type="number"
            value={Acount}
            onChange={(e) => setAcount(Number(e.target.valueAsNumber))}
          />
          <button type="submit">Update Counter</button>
        </form>
      </div>
    </section>
  );
};

export default Counter;
