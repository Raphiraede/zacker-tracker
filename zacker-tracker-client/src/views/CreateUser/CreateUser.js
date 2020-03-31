import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { useState } from 'react'

import './CreateUser.css'


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function CreateUser() {
  const [name, updateName] = useState('')
  function onChange(e){
    updateName(e.target.value)
  }
  function ConfirmName(){
    const body = {
      name: name
    }
    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.ok){
        window.location.pathname='admin/dashboard'
      }
    })
  }
  const classes = useStyles();
  return (
    <div className="CreateUserWrapper">
      <div className="InnerWrapper">
        <GridContainer className='CreateUserGridContainer'>
          <GridItem xs={8} sm={8} md={8}>
            <Card className='child'>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Confirm</h4>
                <p className={classes.cardCategoryWhite}>Confirm Display Name</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Display Name:"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={
                        onChange={onChange}
                      }
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button 
                  color="primary"
                  onClick={ConfirmName}
                  >Confirm</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
