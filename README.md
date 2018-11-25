# Home Conditions Warning Webtask

This is a companion [webtask](https://webtask.io/) for [home-conditions](https://github.com/HarlemSquirrel/home-conditions).

## Getting stared

1. Copy the secrets file from `.secrets-template` to `.secrets` and fill in the values.
2. Install dependencies

    npm install

3. Create the webtask

    wt create --bundle --secrets-file .secrets index.js

## Scheduling

This webtask is most useful when [scheduled](https://webtask.io/docs/cron). We can schedule this to run daily at 7 AM Eastern Standard Time using the following command:

```
wt cron create --bundle --secrets-file .secrets --schedule "* 7 * * *" --tz EST index.js
```

## Watching the logs

Once the webtask is created, we can watch the logs while visiting the provided URL.

```
➜  wt create --bundle --secrets-file .secrets index.js
* Hint: A package.json file has been detected adjacent to your webtask. Ensuring that all dependencies from that file are available on the platform. This may take a few minutes for new versions of modules so please be patient.
* Hint: If you would like to opt-out from this behaviour, pass in the --ignore-package-json flag.
Resolving 3 modules...
Provisioning 3 modules...
request@2.88.0 is available
twitter-lite@0.7.0 is available
wt-cli@11.0.0 is available
Webtask created

You can access your webtask at the following url:

https://wt-dd236a2da86fec223d8727e3fb1746d1-0.sandbox.auth0-extend.com/home-conditions-warning-webtask
➜  wt logs
[19:26:11.129Z]  INFO wt: connected to streaming logs (container=wt-dd236a2da86fec223d8727e3fb1746d1-0)
[19:26:18.225Z]  INFO wt: new webtask request 1543173978186.570881
[19:26:18.795Z]  INFO wt:
    Body: {
      "temps": [
        {
          "humidity": "76.3",
          "location": "home",
          "tempC": "11.1",
          "timestamp": "2018-11-25 17:11:19"
        },
        {
          "humidity": "76.6",
          "location": "home",
          "tempC": "11.0",
          "timestamp": "2018-11-25 18:11:07"
        },
        {
          "humidity": "76.9",
          "location": "home",
          "tempC": "10.9",
          "timestamp": "2018-11-25 19:11:02"
        }
      ]
    }
[19:26:18.798Z]  INFO wt: Loading Twitter client.
[19:26:18.798Z]  INFO wt: Sending direct message...
[19:26:18.800Z]  INFO wt: finished webtask request 1543173978186.570881 with HTTP 200 in 447ms
[19:26:18.801Z]  INFO wt:
    Message posted! { type: 'message_create',
      id: '1066775102082220037',
      created_timestamp: '1543173978716',
      message_create:
       { target: { recipient_id: '334825154' },
         sender_id: '334825154',
         message_data:
          { text: '⚠ 76.9% humidity! Get out your golashes.',
            entities: [Object] } } }
```
