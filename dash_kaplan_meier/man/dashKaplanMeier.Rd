% Auto-generated: do not edit by hand
\name{dashKaplanMeier}

\alias{dashKaplanMeier}

\title{DashKaplanMeier component}

\description{
Kaplan-Meier class to generate Kaplan-Meier curves.
}

\usage{
dashKaplanMeier(id=NULL, className=NULL, colors=NULL, config=NULL,
coxP=NULL, event=NULL, group=NULL, hazardRatio=NULL,
layout=NULL, loading_state=NULL, logrankP=NULL,
showCIs=NULL, showStatistics=NULL, style=NULL, time=NULL,
title=NULL)
}

\arguments{
\item{id}{Character. The ID for the component used in Dash callbacks.}

\item{className}{Character. CSS class to apply to the outer container.}

\item{colors}{List of characters. Colors to use for each group curve.}

\item{config}{Named list. Custom Plotly config dictionary.}

\item{coxP}{Numeric. Precomputed Cox p-value.}

\item{event}{List of numerics. Array of event indicators (1 or 0).}

\item{group}{List of characters. Array of group labels for each sample.}

\item{hazardRatio}{Numeric. Precomputed hazard ratio.}

\item{layout}{Named list. Custom Plotly layout dictionary.}

\item{loading_state}{Named list. Dash internal prop for spinner/loading.}

\item{logrankP}{Numeric. Precomputed log-rank p-value.}

\item{showCIs}{Logical. Whether to display confidence intervals.}

\item{showStatistics}{Logical. Show log-rank, HR, and Cox p-value as annotation.}

\item{style}{Named list. Custom style for the outer container div.}

\item{time}{List of numerics. Array of time-to-event values.}

\item{title}{Character. Custom title to show on the plot.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

