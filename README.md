# @itkyk/appsync

## Install
```bash
npm i @itkyk/appsync
```

## Methods
### Setup
```typescript
// aws config file
import {AmplifyConfig} from "@itkyk/appsync";

export default AmplifyConfig({
  "aws_project_region": "us-east-1",
  "aws_appsync_graphqlEndpoint": "", // Your Appsync Endpoint
  "aws_appsync_region": "us-east-1", // AppSync region
  "aws_appsync_authenticationType": "API_KEY", // AppSync Auth type
  "aws_appsync_apiKey": "" // If auth type is API_KEY, copy api key from aws console.
})
```

### FrontEnd
#### Query
```typescript
import {query, configure} from "@itkyk/appsync";
import Config from "aws config file path";
configure(Config);

const queryParam = `query MyQuery($id: ID) {
  getID(id: $id) {
    id
  }
}`

const variable = {
  id: 1
}

const onNext = (data, error) => {
  if (error) return console.error(error);
  console.log(data);
}

const headers = {
  "x-sample-header": "ABC123"
}

query({
  queryParam,
  variable,
  onNext
}, headers);
```

#### mutation
```typescript
import {mutation, configure} from "@itkyk/appsync";
import Config from "aws config file path";
configure(Config);

const queryParam = `mutation MyMutation($id: ID) {
  addID(id: $id) {
    id
  }
}`

const variable = {
  id: 1
}

const onNext = (data, error) => {
  if (error) return console.error(error);
  console.log(data);
}

const headers = {
  "x-sample-header": "ABC123"
}

mutation({
  queryParam,
  variable,
  onNext
}, headers)
```

#### Subscription
```typescript
import {subscription, configure} from "@itkyk/appsync";
import Config from "aws config file path";
configure(Config);

const queryParam = `subscription MySubscribe($id: ID) {
  addedID(id: $id) {
    id
  }
}`

const variable = {
  id: 1
}

const onNext = (value, provider) => {
  console.log(value, provider);
}

const onError = (error) => {
  console.error(error)
}

const onComplete = () => {
  console.log("Subscription Complete");
}

const headers = {
  "x-sample-header": "ABC123"
}

const listener = subscription({
  queryParam,
  variable,
  onNext,
  onError,
  onComplete
}, headers)

listener.unsubscribe()
consoe.log(listener.closed) // -> return boolean
```

## Change Log
- 2023/03/03 (version 1.0.2)
  - Added `headers` to the second argument of the `query`/`mutation`/`subscription` method.
- 2023/02/17 (version 1.0.1)
  - subscription return ZenObservable.Subscription