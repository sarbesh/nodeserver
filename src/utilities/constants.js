function define(name, value){
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define("ENV_local", "development");
define("ENV_prod", "production");
define("cowin_url", "https://cdn-api.co-vin.in/api/");