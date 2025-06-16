# AUTO GENERATED FILE - DO NOT EDIT

export dashkaplanmeier

"""
    dashkaplanmeier(;kwargs...)

A DashKaplanMeier component.
Kaplan-Meier class to generate Kaplan-Meier curves.
Keyword arguments:
- `id` (String; optional): The ID for the component used in Dash callbacks.
- `className` (String; optional): CSS class to apply to the outer container.
- `colors` (Array of Strings; optional): Colors to use for each group curve.
- `config` (Dict; optional): Custom Plotly config dictionary.
- `coxP` (Real; optional): Precomputed Cox p-value.
- `event` (Array of Reals; required): Array of event indicators (1 or 0).
- `group` (Array of Strings; optional): Array of group labels for each sample.
- `hazardRatio` (Real; optional): Precomputed hazard ratio.
- `layout` (Dict; optional): Custom Plotly layout dictionary.
- `loading_state` (Dict; optional): Dash internal prop for spinner/loading.
- `logrankP` (Real; optional): Precomputed log-rank p-value.
- `showCIs` (Bool; optional): Whether to display confidence intervals.
- `showStatistics` (Bool; optional): Show log-rank, HR, and Cox p-value as annotation.
- `style` (Dict; optional): Custom style for the outer container div.
- `time` (Array of Reals; required): Array of time-to-event values.
- `title` (String; optional): Custom title to show on the plot.
"""
function dashkaplanmeier(; kwargs...)
        available_props = Symbol[:id, :className, :colors, :config, :coxP, :event, :group, :hazardRatio, :layout, :loading_state, :logrankP, :showCIs, :showStatistics, :style, :time, :title]
        wild_props = Symbol[]
        return Component("dashkaplanmeier", "DashKaplanMeier", "dash_kaplan_meier", available_props, wild_props; kwargs...)
end

