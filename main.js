window.addEventListener("load", function(event) {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw-main.js').then(initializeState);
        
    } else {
        console.warn("Service worker not supported");
    }

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
            .then(function(subscription) {

                console.log(JSON.stringify(subscription));
            })
            .catch(function(err) {
                console.warn("Error during getSubscription(). ", err);
            });
    });
});

function initializeState() {
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.warn("Notification not supported");
        return;
    }

    if (Notification.permission === 'denied') {
        console.warn("User blocked subscription");
        return;
    }

    if (!("PushManager" in window)) {
        console.warn("Push not supported");
        return;
    }

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        console.log("Subscribe");
        serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
            .then(function(subscription) {
                if (subscription != null) {
                    sendSubData(subscription);
                }
            })
            .catch(function(err) {
                console.warn("Error during subscribe(). ", err);
            });
    });
}

function sendSubData(pushSub){

    var subscription = JSON.stringify(pushSub);
    // var pushSub = document.getElementById('code');
    // pushSub = pushSub.innerHTML;

    if (pushSub != ''){

        dataString =  { 
            'subObject': subscription,
            'endpoint': pushSub.endpoint,
            'geo': 'NL-nl',
            'service': 'voucher',
            'navigator': "chrome, Android"
        }

        $.ajax({
            type: "POST",
            url: "insert.php",
            data: dataString,
            cache: false,
            success: function()
                {
                    console.log('data sent to server');
                }
            });
        }   

    else {}
}