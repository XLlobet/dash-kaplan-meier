# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dashKaplanMeier <- function(id=NULL, className=NULL, colors=NULL, config=NULL, coxP=NULL, event=NULL, group=NULL, hazardRatio=NULL, layout=NULL, loading_state=NULL, logrankP=NULL, showCIs=NULL, showStatistics=NULL, style=NULL, time=NULL, title=NULL) {
    
    props <- list(id=id, className=className, colors=colors, config=config, coxP=coxP, event=event, group=group, hazardRatio=hazardRatio, layout=layout, loading_state=loading_state, logrankP=logrankP, showCIs=showCIs, showStatistics=showStatistics, style=style, time=time, title=title)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashKaplanMeier',
        namespace = 'dash_kaplan_meier',
        propNames = c('id', 'className', 'colors', 'config', 'coxP', 'event', 'group', 'hazardRatio', 'layout', 'loading_state', 'logrankP', 'showCIs', 'showStatistics', 'style', 'time', 'title'),
        package = 'dashKaplanMeier'
        )

    structure(component, class = c('dash_component', 'list'))
}
