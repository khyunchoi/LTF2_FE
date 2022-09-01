import { useEffect, useState } from "react";

// ******************************
const useFilter = ({ initState, filterModule }) => {
  const [state, setState] = useState(initState);
  const [list, setList] = useState([]);

  // ******************************

  useEffect(() => {
    const filteredList = filterModule(state,list)
    setList(filteredList)
  }, [state]);
  
  // ******************************
  
  const handleChange = (e, phones) => {
    const { name, value } = e.target;
    setList(phones)
    setState(() => ({
      ...state,
      [name]: value
    }));
  };


  return {
    handleChange,
    state,
    list
  };
};

export default useFilter;