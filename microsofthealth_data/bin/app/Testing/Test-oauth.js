//


(function () {
    var splunkjs = require('splunk-sdk');
    var ModularInputs = splunkjs.ModularInputs;
    var Logger = ModularInputs.Logger;
    var Event = ModularInputs.Event;
    var Scheme = ModularInputs.Scheme;
    var Argument = ModularInputs.Argument;
    var utils = ModularInputs.utils;
    var unirest = require("unirest");
    var reqauth = unirest("POST", "https://login.live.com/oauth20_token.srf");
    var _storeClientID = 'dsdfasdf34wsghyt43szx*4xdfga32#4';
    var _storeClientKey = 'a2sdf4sare3425xacxv43';
    var _refreshToken = 'N/A';
    var _authToken = 'N/A';
    var _username = 'N/A';
    var _fullname = 'N/A';
    var _lastSyncDate = 'N/A';
    var _lastCheckpointDate = 'N/A';
    var _startDate = 'N/A';
    var _endDate = 'N/A';
    var _name = 'TEST';
    var _INPUTDate = 'N/A';
    var checkpointFileContents = "";

    var testdate = "2016/8/5";
    var Step = "0";

    var RunTime = new Date();
    var processRunTime = RunTime.toString();
    var mynote = '"Notes":"Test"';
    var errorFound = false;

    //var maxAPIpullcount = 40;
    //var APIpullcount    = 0;
    var APIIterate = 0;

    //==========================================================================
    //--Input Scheme
    //==========================================================================
    exports.getScheme = function () {
        var scheme = new Scheme("Microsoft Health Data");

        scheme.description = "Gets Micrsoft Health Data.";
        scheme.useExternalValidation = true;
        scheme.useSingleInstance = true;

        scheme.args = [
            new Argument({
                name: "fullname",
                dataType: Argument.dataTypeString,
                description: "Please enter your first and lastname.",
                requiredOnCreate: true,
                requiredOnEdit: false
            }),


            new Argument({
                name: "username",
                dataType: Argument.dataTypeString,
                description: "Please enter your Microsoft Health UserName.",
                requiredOnCreate: true,
                requiredOnEdit: false
            }),
            new Argument({
                name: "startdate",
                dataType: Argument.dataTypeString,
                description: "Enter last date searched on or date to start searching on.",
                requiredOnCreate: false,
                requiredOnEdit: false
            }),
            new Argument({
                name: "token_json",
                dataType: Argument.dataTypeString,
                description: "Please enter your Refresh Auth Token.",
                requiredOnCreate: true,
                requiredOnEdit: false
            })
        ];
        return scheme;
    };
    //==========================================================================
    //--Validate the Input
    //==========================================================================
    exports.validateInput = function (definition, done) {
        var token_json = definition.parameters.token_json;
        var startdate = definition.parameters.date;
        done();
    };


    exports.streamEvents = function (name, singleInput, eventWriter, done) {//Streaming
        _username = singleInput.username;
        _fullname = singleInput.fullname;
        var name = singleInput.name;
        _INPUTDate = singleInput.startdate;
        //--------------------------------------------------------




        //1-Start-----------------------------------------------------------------------------------------------
        //1--Gather CLientID and Client Secret Key from storage passwords
        //1-----------------------------------------------------------------------------------------------------


        console.log("_storeClientID:" + _storeClientID);
        console.log("_storeClientKey:" + _storeClientKey)
        //2-Start-----------------------------------------------------------------------------------------------
        //2--Gather Token From KV Store
        //2-----------------------------------------------------------------------------------------------------
        _refreshToken = 'MCWEvRoUDxGIvJdlP4R3g*TfVClLRZvEBt2s67m3OiHugUJUDMuqRGzYE23KqLGCo90OSlrTYBuwKJjFgp9OgFP6zYmPzRRusBDmENNe3o4Nv1wmp97z6KDSrrAyr!zL*hmFwVudYTFjA583oaZ1krH5Hn3SKeoEqRNyvsGeIKwTHT5Nbn2ZPAAXbd*NPQTuN8EC!a6tQzdjLIGlF2eWsJyqpeeWmb0BDflBZ34Pg3ahO*DM6rSHrIdpyTj7UKGxAfWpuDduXAg7YFp3*rPE3NazHPLmpUUw4dGNsCwkZtYbtRS8PNEIIiv3GrX8icT2D9GXQvT0JtHNUVfRne6wUXJCaMwV5CWkJOdPRlAS0PSwcbe4*HfG*uihLb*8HoBtBNSrbUWvZnifyWCt*mardbLTDjAhL6ViUCqM7AtOWP1*4'
        console.log("_refreshToken:" + _refreshToken);
        //3-Start-----------------------------------------------------------------------------------------------
        //3--Refresh Token for new authToken
        //3-----------------------------------------------------------------------------------------------------
        //3--Auth Setup to get new token
        reqauth.query({ "redirect_uri": "http://127.0.0.1:3000" });
        reqauth.headers({ "content-type": "application/x-www-form-urlencoded" });
        reqauth.timeout(60000);
        reqauth.form({
            "client_id": _storeClientID,
            "grant_type": "refresh_token",
            "refresh_token": _refreshToken,
            "client_secret": _storeClientKey
        });
        reqauth.end(function (resauth) {
            _authToken = resauth.body.access_token;
            console.log("_authToken:" + _authToken);

        });

        //3-END-------------------------------------------------------------------------------------------------

        //2-END-------------------------------------------------------------------------------------------------







    }

    //1-END-------------------------------------------------------------------------------------------------

};//Streaming

ModularInputs.execute(exports, module);
})();
