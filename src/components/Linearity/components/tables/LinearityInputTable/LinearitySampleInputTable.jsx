import { connect } from 'react-redux';
import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import {
  updateSampleValue,
  updateDilutionFactorValue,
  updateVolumeValue,
  updateMassValue,
} from '../../../actions';

import { buildColumns } from './TableBuildColumns';
import { buildRows } from './TableBuildRows';

import { BaseInputTableCell } from './BaseInputTableCell';

function LinearitySampleInputTable(props) {
  return (
    <Table aria-label='sticky table'>
      <TableHead>
        <TableRow>
          <TableCell
            id='starter-column'
            align='left'
            padding='dense'
            size='normal'
            variant='head'
            style={{
              fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Oxygen',
                'Ubuntu',
                'Cantarell',
                'Fira Sans',
                'Droid Sans',
                'Helvetica Neue',
                'sans-serif',
              ],
              fontWeight: 400,
              fontSize: 22,
              background: '#1c2541',
              color: 'white',
              textSizeAdjust: 'auto',
            }}
          >
            Volume
          </TableCell>
          {buildColumns(props.columns, 'Mass')}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow key={'volume'}>
          <BaseInputTableCell
            variant='body'
            id='starter-column'
            label='Volume'
            value={props.volume}
            onChangeAction={(e) => handleVolumeChange(e, props)}
          />
          {buildColumns(props.columns, 'Mass', false, props)}
        </TableRow>
      </TableBody>
      <TableHead>
        <TableRow>
          <TableCell
            style={{
              fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Oxygen',
                'Ubuntu',
                'Cantarell',
                'Fira Sans',
                'Droid Sans',
                'Helvetica Neue',
                'sans-serif',
              ],
              fontWeight: 400,
              fontSize: 22,
              background: '#1c2541',
              color: 'white',
              textSizeAdjust: 'auto',
            }}
            variant='head'
            align='left'
            padding='dense'
            size='small'
          >
            Dilution Factor
          </TableCell>
          {buildColumns(props.columns, 'Sample')}
          <TableCell
            style={{
              fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Oxygen',
                'Ubuntu',
                'Cantarell',
                'Fira Sans',
                'Droid Sans',
                'Helvetica Neue',
                'sans-serif',
              ],
              fontWeight: 400,
              fontSize: 22,
              background: '#1c2541',
              color: 'white',
              textSizeAdjust: 'auto',
            }}
            variant='head'
            align='center'
            padding='dense'
            size='small'
          >
            Average
          </TableCell>
          <TableCell
            style={{
              fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Oxygen',
                'Ubuntu',
                'Cantarell',
                'Fira Sans',
                'Droid Sans',
                'Helvetica Neue',
                'sans-serif',
              ],
              fontWeight: 400,
              fontSize: 22,
              background: '#1c2541',
              color: 'white',
              textSizeAdjust: 'auto',
            }}
            variant='head'
            align='center'
            padding='dense'
            size='small'
          >
            Standard Deviation
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{buildRows(props)}</TableBody>
    </Table>
  );
}

function handleVolumeChange(event, props) {
  props.updateVolumeValue(event.target.value);
}

const mapStateToProps = (state) => ({
  rows: state.samples.numRows,
  columns: state.samples.numColumns,

  analyticalData: state.samples.analyticalData,

  dilutionFactor: state.samples.dilutionFactor,

  concentrations: state.samples.concentrations,
  initialConcentrations: state.samples.initialConcentrations,

  mass: state.samples.mass,
  volume: state.samples.volume,

  averages: state.samples.averages,
  stdDeviations: state.samples.stdDeviations,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateVolumeValue: (updatedValue) => {
      dispatch(updateVolumeValue(updatedValue));
    },
    updateMassValue: (updatedValue, column) => {
      dispatch(updateMassValue(updatedValue, column));
    },
    updateSampleValue: (updatedValue, row, column) => {
      dispatch(updateSampleValue(updatedValue, row, column));
    },
    updateDilutionFactorValue: (updatedValue, row) => {
      dispatch(updateDilutionFactorValue(updatedValue, row));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinearitySampleInputTable);
