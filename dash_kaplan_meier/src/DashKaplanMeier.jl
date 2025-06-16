
module DashKaplanMeier
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.1"

include("jl/dashkaplanmeier.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_kaplan_meier",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "async-DashKaplanMeier.js",
    external_url = "https://unpkg.com/dash_kaplan_meier@0.0.1/dash_kaplan_meier/async-DashKaplanMeier.js",
    dynamic = nothing,
    async = :true,
    type = :js
),
DashBase.Resource(
    relative_package_path = "async-DashKaplanMeier.js.map",
    external_url = "https://unpkg.com/dash_kaplan_meier@0.0.1/dash_kaplan_meier/async-DashKaplanMeier.js.map",
    dynamic = true,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_kaplan_meier.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_kaplan_meier.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
