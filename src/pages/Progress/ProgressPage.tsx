import { useEffect, useState } from "react";
import Progess from "../../components/Progress/Progess";

function ProgressPage() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setValue((val) => val + 1);
    }, 100);
  }, []);
  return <Progess progress={value} />;
}

export default ProgressPage;
