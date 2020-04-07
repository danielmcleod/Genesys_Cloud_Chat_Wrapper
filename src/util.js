/*global ININ*/

export function getChatConfig(settings,data) {
    // const formData = this.state.formData;
    // const data = settings.params;
    // if(formData !== null){
    //     for (var attrname in formData) { data[attrname] = formData[attrname]; }
    // }
    return {
        'webchatAppUrl': 'https://apps.mypurecloud.com/webchat',
        'webchatServiceUrl': 'https://realtime.mypurecloud.com:443',
        'orgId': settings.orgId,
        'orgGuid': settings.orgGuid,
        'orgName': settings.orgName,
        'queueName': settings.queue,
        'logLevel': 'ERROR',
        'locale': 'en',
        'welcomeMessage': settings.welcomeMessage,
        'cssClass': 'gc-chat-frame',
        'css': {
            'width': '100%',
            'height': '100%'
        },
        // Logo used at the top of the chat window
        'companyLogo': {
            'width': 350,
            'height': 50,
            'url': settings.bigLogoUrl || settings.logoUrl
        },
        'companyLogoSmall': {
            'width': 25,
            'height': 25,
            'url': settings.logoUrl
        },
        // 'agentAvatar': {
        //     'width': 462,
        //     'height': 462,
        //     'url': 'https://d3a63qt71m2kua.cloudfront.net/developer-tools/1404/assets/images/agent.jpg'
        // },
        // 'userAvatar': {
        //     'width': 462,
        //     'height': 462,
        //     'url': 'https://d3a63qt71m2kua.cloudfront.net/developer-tools/1404/assets/images/agent.jpg'
        // },

        'data': data,

        // Whether to allow reconnects
        'reconnectEnabled': settings.reconnectEnabled,
        //Allowed reconnect origins
        'reconnectOrigins': settings.reconnectOrigins
    };
}

export function loadChatIfNotLoaded(cb,settings){
    function loadScript(id,type,src,region,orgGuid,deploymentKey,callback) {
        /* Load script from url and calls callback once it's loaded */
        let scriptTag = document.createElement('script');
        scriptTag.setAttribute("id", id);
        scriptTag.setAttribute("type", type);
        scriptTag.setAttribute("src", src);
        scriptTag.setAttribute("region", region);
        scriptTag.setAttribute("org-guid", orgGuid);
        scriptTag.setAttribute("deployment-key", deploymentKey);

        if (typeof callback !== "undefined") {
            if (scriptTag.readyState) {
                /* For old versions of IE */
                scriptTag.onreadystatechange = function() {
                    if (this.readyState === 'complete' || this.readyState === 'loaded') {
                        callback();
                    }
                };
            } else {
                scriptTag.onload = () => callback();
            }
        }
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
    }

    const {region,orgGuid,deploymentKey} = settings;

    if((ININ || null) === null){
        loadScript(
            "purecloud-webchat-js",
            "text/javascript",
            "https://apps.mypurecloud.com/webchat/jsapi-v1.js",
            region || "us-east-1",
            orgGuid,
            deploymentKey,
            () => cb()
        );
    } else {
        cb();
    }
}