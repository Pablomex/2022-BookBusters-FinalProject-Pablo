import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchBar.style";
// import { searchBooks } from "../../api/fetchApi";
import { useNavigate } from "react-router-dom";
import { searchBooks } from "../../api/fetchApi";
import { Typography } from "@mui/material";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    const response = await searchBooks(search);
    // console.log(response.data);
    navigate("/SearchResults", { state: response.data });
    setErrMsg("");
  };

  return (
      <Search component='form' onSubmit={handleSubmitSearch}>
          <SearchIconWrapper>
              <SearchIcon />
          </SearchIconWrapper>
          {errMsg && (
              <Typography
                  variant='body2s'
                  color='error'
                  sx={{ mt: 2, textAlign: 'center' }}
              >
                  {errMsg}
              </Typography>
          )}
          <StyledInputBase
              placeholder='Recherche de livre'
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              sx={{ width: '100%' }}
          />
      </Search>
  );
};

export default SearchBar;
