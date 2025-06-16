import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist';

const Plot = createPlotlyComponent(Plotly);

function hexToRgb(hex) {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = hex;
    const computed = ctx.fillStyle;
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(computed);
    return m ? `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}` : '31, 119, 180'; // default to Plotly blue
  }

function computeKaplanMeier(time, event, group = null, showCIs = false, colors = []) {
    const data = [];
    const groups = group ? [...new Set(group)] : [null];
  
    groups.forEach((grp, groupIndex) => {
      const groupId = grp || 'group' + groupIndex;
      const indices = group ? group.map((g, i) => (g === grp ? i : -1)).filter(i => i !== -1) : time.map((_, i) => i);
      const zipped = indices.map(i => ({ time: time[i], event: event[i] }));
      zipped.sort((a, b) => a.time - b.time);
  
      let atRisk = zipped.length;
      let survival = 1.0;
      const x = [0];
      const y = [1.0];
      const eventMarkers = [];
      const ciLower = [1.0];
      const ciUpper = [1.0];
      let varSum = 0;
  
      for (let i = 0; i < zipped.length; i++) {
        const { time, event } = zipped[i];
        if (event === 1) {
          const q = 1 / (atRisk * (atRisk - 1));
          varSum += q;
          survival *= (atRisk - 1) / atRisk;
          eventMarkers.push({ time, survival });
        }
        x.push(time);
        y.push(survival);
  
        if (showCIs) {
          const stderr = Math.sqrt(survival * survival * varSum);
          const lower = Math.max(0, survival - 1.96 * stderr);
          const upper = Math.min(1, survival + 1.96 * stderr);
          ciLower.push(lower);
          ciUpper.push(upper);
        }
  
        atRisk--;
      }
  
      const baseColor = colors[groupIndex % colors.length] || '#000000';
      const rgb = hexToRgb(baseColor);
  
      data.push({
        x,
        y,
        type: 'scatter',
        mode: 'lines',
        name: grp || 'KM Curve',
        line: { color: baseColor },
        legendgroup: groupId,
        showlegend: true
      });
  
      data.push({
        x: eventMarkers.map(e => e.time),
        y: eventMarkers.map(e => e.survival),
        mode: 'markers',
        type: 'scatter',
        name: `${grp || 'KM Curve'} Events`,
        marker: { symbol: 'line-ns-open', size: 10, color: baseColor },
        showlegend: false,
        hoverinfo: 'skip',
        legendgroup: groupId
      });
  
      if (showCIs) {
        // Add upper bound first
        data.push({
          x,
          y: ciUpper,
          type: 'scatter',
          mode: 'lines',
          name: `${grp || 'KM Curve'} CI Upper`,
          line: { dash: 'dot', width: 1, color: baseColor },
          showlegend: false,
          legendgroup: groupId
        });
  
        // Add lower bound with fill toward upper
        data.push({
          x,
          y: ciLower,
          type: 'scatter',
          mode: 'lines',
          name: `${grp || 'KM Curve'} CI Lower`,
          line: { dash: 'dot', width: 1, color: baseColor },
          fill: 'tonexty',
          fillcolor: `rgba(${rgb}, 0.08)`,
          showlegend: false,
          legendgroup: groupId
        });
      }
    });
  
    return data;
  }
  
  /**
     * Kaplan-Meier class to generate Kaplan-Meier curves.
     */
  class KaplanMeier extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      const {
        id,
        style,
        className,
        time,
        event,
        group,
        showCIs,
        colors,
        layout,
        config,
        showStatistics,
        logrankP,
        coxP,
        hazardRatio,
        title,
        loading_state,
        setProps,
      } = this.props;
  
      const data = computeKaplanMeier(time, event, group, showCIs, colors);
  
      let annotations = [];
      if (showStatistics) {
        if (
          typeof logrankP === 'number' &&
          typeof coxP === 'number' &&
          typeof hazardRatio === 'number'
        ) {
          annotations.push({
            text: `Log-rank p = ${logrankP.toExponential(2)}, HR = ${hazardRatio.toFixed(2)}, Cox p = ${coxP.toExponential(2)}`,
            showarrow: false,
            xref: 'paper',
            yref: 'paper',
            x: 0,
            y: 1.1,
            font: { size: 12 },
          });
        }
      }
  
      const fullLayout = {
        ...layout,
        annotations: [...(layout?.annotations || []), ...annotations],
        title: { ...(layout?.title || {}), text: title || layout?.title?.text },
        yaxis: {
          ...(layout?.yaxis || {}),
          range: [0, 1]
        }
      };
  
      return (
        <div
          id={id}
          style={style}
          className={className}
          data-dash-is-loading={
            (loading_state && loading_state.is_loading) || undefined
          }
        >
          <Plot
            data={data}
            layout={fullLayout}
            config={config}
            onClick={(event) => {
              if (setProps) {
                setProps({ clickData: event });
              }
            }}
          />
        </div>
      );
    }
}


KaplanMeier.propTypes = {
  /**
     * The ID for the component used in Dash callbacks.
     */
    id: PropTypes.string,
  /**
     * Custom style for the outer container div.
     */
  style: PropTypes.object,
  /**
     * CSS class to apply to the outer container.
     */
  className: PropTypes.string,
  /**
     * Array of time-to-event values.
     */
  time: PropTypes.arrayOf(PropTypes.number).isRequired,
  /**
     * Array of event indicators (1 or 0).
     */
  event: PropTypes.arrayOf(PropTypes.number).isRequired,
  /**
     * Array of group labels for each sample.
     */
  group: PropTypes.arrayOf(PropTypes.string),
  /**
     * Whether to display confidence intervals.
     */
  showCIs: PropTypes.bool,
  /**
     * Colors to use for each group curve.
     */
  colors: PropTypes.arrayOf(PropTypes.string),
  /**
     * Custom Plotly layout dictionary.
     */
  layout: PropTypes.object,
  /**
     * Custom Plotly config dictionary.
     */
  config: PropTypes.object,
  /**
     * Show log-rank, HR, and Cox p-value as annotation.
     */
  showStatistics: PropTypes.bool,
  /**
     * Precomputed log-rank p-value.
     */
  logrankP: PropTypes.number,
  /**
     * Precomputed Cox p-value.
     */
  coxP: PropTypes.number,
  /**
     * Precomputed hazard ratio.
     */
  hazardRatio: PropTypes.number,
  /**
     * Custom title to show on the plot.
     */
  title: PropTypes.string,
  /**
     * Dash internal prop for spinner/loading.
     */
  loading_state: PropTypes.object,
  /**
     * Dash-injected function to update props.
     */
  setProps: PropTypes.func,
};

export default KaplanMeier;
