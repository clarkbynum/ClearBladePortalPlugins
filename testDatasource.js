function PluginDatasourceTest(settings, updateCallback, errorCallback) {

    let payload = {
        query: settings.query,
        apiKey: settings.apiKey,
        searchEngineId: settings.searchEngineId,
    };

    this.onSettingsChanged = function (settings) {
        payload = {
            query: settings.query,
            apiKey: settings.apiKey,
            searchEngineId: settings.searchEngineId,
        }
        this.updateNow();
    }

    this.updateNow = function () {
        this.sendData(payload);
    }

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        
        return response;
    }

    this.sendData = function (data) {
        fetch(`https://www.googleapis.com/customsearch/v1?q=${data.query}&key=${data.apiKey}&cx=${data.searchEngineId}`, {
            method: 'GET'
        }).then(handleErrors)
            .then((resp) => resp.json().then((jsonResp) => {
            updateCallback(jsonResp);
    }))
    .catch((e) => {
            errorCallback("Failed to search", e);
    })
    }

    this.onDispose = function () {

    }

    this.updateNow();
}

CB_PORTAL.registerDatasource({
    type_name: "CB_PLUGIN_DATASOURCEEEEE",
    display_name: "Plugin Datasource Internal",
    group: "ClearBlade Plugins",
    description: "A datasource as a plugin.",
    class: PluginDatasourceTest,
    settings: [
        {
            name: "query",
            display_name: "Search Query",
            type: "text",
            required: true
        },
        {
            name: "apiKey",
            display_name: "Google Search API Key",
            type: "text",
            required: true
        },
        {
            name: "searchEngineId",
            display_name: "Search Engine ID",
            type: "text",
            required: true
        },
        {
            name: "dessert",
            display_name: "Favorite Dessert?",
            type: "text",
            required: true
        },
        {
            name: "booleanVal",
            display_name: "Boolean Value",
            type: "boolean",
            default_value: true,
        },
        {
            name: "numberVal",
            display_name: "Number Value",
            type: "number",
            default_value: 42
        },
        {
            name: "colorVal",
            display_name: "Color Value",
            type: "color",
            default_value: "#fff",
        },
        {
            name: "optionVal",
            display_name: "Option Value",
            type: "option",
            default_value: "option2",
            options: [
                {
                    name: "Option 1",
                    value: "option1"
                },
                {
                    name: "Option 2",
                    value: "option2"
                }
            ]
        },
    ]
});
