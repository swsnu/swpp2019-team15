/**
 * Summary.
 *
 *
 *
 * Description.
 *
 * @author taehioum
 * @since  2019-10-19
 */

import React, { Component } from 'react';
import appServerKey from '../../const/applicationServerPublicKey';
import axios from 'axios';

/**
 * urlBase64ToUint8Array
 *
 * @param {string} base64String a public vavid key
 */

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function askPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(
      function(result) {
        resolve(result);
      });
    if (permissionResult) {
      permissionResult.then(resolve, reject).catch(err => {});
    }
  }).then(function(permissionResult) {
    if (permissionResult !== "granted") {
      throw new Error("We weren't granted permission.");
    }
  }).catch(err => console.log("permission not granted"));
}

function sendSubscriptionToBackEnd(subscription) {
  console.log("Received PushSubscription: ", JSON.stringify(subscription));
  return axios
    .post("/api/save-subscription/", subscription)
    .then(function(response) {
      if (response.status !== 201) {
        throw new Error("Bad status code from server.");
      }
      if (!(response.data && response.data.data.success)) {
        throw new Error("Bad reponse from server.");
      }
      return response;
    }).catch(err=>{});
}

function subscribeUserToPush() {
  return navigator.serviceWorker
    .register("/sw.js")
    .then(function(registration) {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(appServerKey)
      };

      return registration.pushManager.subscribe(subscribeOptions);
    }).catch(err=>{})
    .then(function(pushSubscription) {
      sendSubscriptionToBackEnd(pushSubscription);
      return pushSubscription;
    }).catch(err => console.log("subscription failed from server"))
}

//function unsubscribeUserToPush() {
//navigator.serviceWorker.register("/sw.js").then(function(registration) {
//registration.pushManager
//.getSubscription()
//.then(subscription => {
//if (!subscription) {
//return;
//}
//subscription.unsubscribe();
//})
//.catch(err => console.log(err));
//});
//}

//function isSubscribed() {
//navigator.serviceWorker.register("/sw.js").then(function(registration) {
//registration.pushManager.getSubscription().then(subscription => {
//if (!subscription) {
//return false;
//}
//return true;
//});
//});
//}

class PushNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      push_subscribe: false,
  };
  }

  componentDidMount() {}

  subscribe() {
    if (!this.state.push_subscribe) {
      askPermission();
      subscribeUserToPush();
      this.setState({push_subscribe: true})
    } else {
      this.setState({push_subscribe: false})
    }
  }

  //unsubscribe() {
  //unsubscribeUserToPush();
  //}

  render() {
    var subscribe_content = (this.state.push_subscribe) ? ('UnSubcribe') : ('Subscribe');
    var subscribe_to_push
    = <button
    id="subscribe-button"
        onClick={() => this.subscribe()}
      >
        {subscribe_content}
        </button>

    return (
      <div className="PushNotification">
        <label>
          Push Notifications
          {subscribe_to_push}
        </label>
      </div>
    );
  }
}

export default PushNotification;
