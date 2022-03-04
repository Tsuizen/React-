import React, { useEffect } from 'react';

export default function Test() {
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [count]);
  return <div></div>;
}
