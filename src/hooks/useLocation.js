import {useEffect, useState} from "react";
import {BASE_URL} from "../constants";

const chrome = window.chrome || null;

export const useLocation = () => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (chrome && chrome.tabs) {
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var activeTab = tabs[0];
        setUrl(activeTab.url);
      });
    }
  }, []);


  if(url.indexOf(BASE_URL) === -1) return null;

  return url;
}