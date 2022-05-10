import React, { useState } from "react";
import { Button, ButtonGroup, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { style } from "@mui/system";
import LinkButton from "../LinkButton/LinkButton";
const Buttons = () => {
  const [last, setLast] = useState(null);
  const [aroundMe, setAroundMe] = useState(null);

  return (
      <div>
          <Container
              sx={{
                  display: 'flex',
                  justifyContent: 'center',
              }}
          >
              <ButtonGroup
                  sx={{ gap: { xs: '15px', md: '25px' }, marginBottom: '30px' }}
              >
                  <LinkButton to='/' text={'Les derniers'} />
                  <LinkButton to='/aroundMe' text={'Autour de moi'} />
              </ButtonGroup>
          </Container>
      </div>
  );
};

export default Buttons;
