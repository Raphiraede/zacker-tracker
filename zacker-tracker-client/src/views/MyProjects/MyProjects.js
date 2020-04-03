import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter.js";
import {createNewProject} from "redux/ducks/projects.js"
import { useState } from 'react'
import { connect } from "react-redux";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

function MyProjects(props) {
  const classes = useStyles()
  const [name, updateName] = useState('')
  const [description, updateDescription] = useState('')
  function onNameChange(e){
    updateName(e.target.value)
    console.log('name changed to', e.target.value)
  }
  function onDescriptionChange(e){
    console.log('triggered')
    updateDescription(e.target.value)
  }
  return (
    <div>
      <GridContainer>
        <GridItem>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Projects</h4>
              <p className={classes.cardCategoryWhite}>
                Projects by date:
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Description", "Created", "Last Modified"]}
                tableData={props.projects.projectsParsed}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create Project</h4>
              <p className={classes.cardCategoryWhite}>You will be able to create tickets for this project once it is created</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Project Name"
                    id="Project Name"
                    formControlProps={{
                      fullWidth: true,
                      onChange: onNameChange
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Description"
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      onChange: onDescriptionChange
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button 
                color="primary"
                onClick={() => props.createNewProject({name, description})}
              >
                Create Project
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

function mapStateToProps(state){
  return{
    userInfo: {...state.userInfo},
    projects: {...state.projects}
  }
}

function mapDispatchToProps(dispatch){
  return{
    createNewProject: (payload) => dispatch(createNewProject(payload))
  }
}

const MyProjectsContainer = connect(mapStateToProps, mapDispatchToProps)(MyProjects)

export default MyProjectsContainer