function PluginTest (settings, updateCallback) {
	this.allInfo = {settings: settings};
        this.render = function (element) {
		return `Stringified Info: <div>${JSON.stringify(this.allInfo)}</div>`;
	}
	
	this.onSettingsChanged = function (settings) {
		console.log(settings);
		this.allInfo.settings = settings;
	}
	
	this.onCalculatedValueChanged = function (data) {
		console.log(data);
		this.allInfo.data = data;
	}
	
	this.onDispose = function () {
		console.log("disposed");
	}
}

  CB_PORTAL.registerWidget({
      type_name: "MyTestWidget",
      display_name: "My Test Widget",
      group: "Basic",
      plugin: true,
      class: PluginTest,
      settings: [
        {
          name: "content",
	  default_value: "Plugin",
          display_name: "Content",
          incoming_parser: true,
        },
	{
	   name: "code",
	   display_name: "Datasource Test",
	   type: "DATA_SETTING_TYPE",
	   incoming_parser: true,
   	}
      ],
    });