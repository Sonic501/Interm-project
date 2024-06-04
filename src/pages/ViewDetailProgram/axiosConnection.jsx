import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function OutlineAPI(endpoint) {
  const token = useSelector(state => state.auth.token)
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAxiosData = async () => {
      const headers = {
        'Authorization': 'Bearer ' + token,
        'accept': '*/*'
      };
      try {
        const response = await axios.get(endpoint, { headers });
        setData(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAxiosData();
  }, [endpoint]);

  // Return the state value directly
  return [data, setData];
}


export default OutlineAPI;