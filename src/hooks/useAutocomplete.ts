import { useEffect, useState } from "react";
import { autocompleteLocation } from "../utils/api";
import { useDebounce } from "./useDebounce";

export const useAutocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [autoCompleteInput, setAutoCompleteInput] = useState("");
  const debouncedInput = useDebounce(autoCompleteInput, 300);
  useEffect(() => {
    const fetchAutocompleteSuggestions = async () => {
      if (debouncedInput) {
        try {
          const locationSuggestions = await autocompleteLocation(
            debouncedInput
          );
          setSuggestions(locationSuggestions);
        } catch (error) {
          console.error("Autocomplete error:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchAutocompleteSuggestions().catch(console.error);
  }, [debouncedInput]);

  return { suggestions, setAutoCompleteInput, setSuggestions };
};
