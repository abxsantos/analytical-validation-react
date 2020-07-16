import React, { Fragment } from "react";

import { Grid, Button } from "@material-ui/core";

import LinearityInputVolume from "./LinearityInputVolume";
import LinearityInputExperimentSize from "./LinearityInputExperimentSize";
import LinearityInputMass from "./LinearityInputMass";
import LinearityInputAnalyticalData from "./LinearityInputAnalyticalData";
import CalculateLinearityButton from "./components/button/CalculateLinearityButton";
import LinearityResultBlock from "./LinearityResutBlock";

const components = [
  <LinearityInputVolume />,
  <LinearityInputExperimentSize />,
  <LinearityInputMass />,
  <LinearityInputAnalyticalData />,
  <LinearityResultBlock />
];

class LinearityBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      actualComponent: "",
    };
  }

  handleClick = (i) => {
    this.setState((prevState) => {
      if (prevState.count < components.length - 1) {
        return {
          count: prevState.count + 1,
          actualComponent: components[this.state.count],
        };
      }
    });
  };

  render() {
    const { i } = this.state;
    return (
      <>
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            {components[this.state.count]}
          </Grid>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            {this.state.count < components.length - 2 ? (
              <Button color="primary" onClick={() => this.handleClick(i)}>
                Next
              </Button>
            ) : this.state.count < components.length - 1 ? (
              <CalculateLinearityButton />
            ) : ``}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default LinearityBlock;
