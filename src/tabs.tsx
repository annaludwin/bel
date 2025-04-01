import { useState } from "react";

export function Tabs() {
  const [tab, setTab] = useState("one");
  return (
    <div>
      <div>
        <button onClick={() => setTab("one")}>TAB 1</button>
        <button onClick={() => setTab("two")}>TAB 2</button>
        <button onClick={() => setTab("three")}>TAB 3</button>
      </div>
      <div>
        {tab === "one" ? <div>Content 1</div> : null}
        {tab === "two" ? <div>Content 2</div> : null}
        {tab === "three" ? <div>Content 3</div> : null}
      </div>
    </div>
  );
}
