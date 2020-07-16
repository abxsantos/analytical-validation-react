import { REACT_APP_BACKEND_URL } from '../../../environment';

import {
  organizeResiduesChartData,
  organizeLinearityGraphData,
} from './ActionsLinearityResultAuxiliarFunctions';

export const UPD_LINEARITY_RESULT = 'UPD_LINEARITY_RESULT';

export function updateLinearityResults(jsonLinearityResultData) {
  let linearityChartData = organizeLinearityGraphData(
    jsonLinearityResultData.cleaned_data.cleaned_analytical_data,
    jsonLinearityResultData.cleaned_data.cleaned_concentration_data,
    jsonLinearityResultData.regression_coefficients.intercept,
    jsonLinearityResultData.regression_coefficients.slope
  );

  let residuesChartData = organizeResiduesChartData(
    jsonLinearityResultData.cleaned_data.cleaned_concentration_data,
    jsonLinearityResultData.regression_residues,
    jsonLinearityResultData.regression_coefficients.intercept,
    jsonLinearityResultData.regression_coefficients.slope
  );

  return {
    type: UPD_LINEARITY_RESULT,

    regressionCoefficients: jsonLinearityResultData.regression_coefficients,
    regressionAnova: jsonLinearityResultData.regression_anova,
    outliers: jsonLinearityResultData.cleaned_dataoutliers,

    cleanedAnalyticalData:
      jsonLinearityResultData.cleaned_data.cleaned_analytical_data,

    cleanedConcentrationData:
      jsonLinearityResultData.cleaned_data.cleaned_concentration_data,

    isNormalDistribution: jsonLinearityResultData.is_normal_distribution,
    isHomokedastic: jsonLinearityResultData.is_homokedastic,
    durbinWatsonValue: jsonLinearityResultData.durbin_watson_value,
    shapiropValue: jsonLinearityResultData.shapiro_pvalue,
    breuschPaganpValue: jsonLinearityResultData.breusch_pagan_pvalue,

    regressionChartData: residuesChartData,
    linearityChartData: linearityChartData,
  };
}

export function getLinearityResults() {
  return (dispatch, getState) => {
    const { samples } = getState();

    console.log(samples);

    const jsonLinearityInputData = {
      analytical_data: JSON.stringify(samples.analyticalData),
      concentration_data: JSON.stringify(samples.concentrations),
    };

    fetch(REACT_APP_BACKEND_URL + '/linearity', {
      type: "no-cors",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonLinearityInputData),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonLinearityResultData) => {
        if (jsonLinearityResultData.status === 201){
          dispatch(updateLinearityResults(jsonLinearityResultData));
        } else {
          alert(jsonLinearityResultData.body)
        }
        
      })
  }
};
