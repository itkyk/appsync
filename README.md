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
import {query, configure, gql} from "@itkyk/appsync";
import Config from "aws config file path";
configure(Config);

const queryParam = gql`
query MyQuery($id: ID) {
    getID(id: $id) {
        id
    }
}`

const variable = {
  id: 1
}

const headers = {
  "x-sample-header": "ABC123"
}

const response = await query(queryParam, variable , headers);
```

#### mutation
```typescript
import {mutation, configure, gql} from "@itkyk/appsync";
import Config from "aws config file path";
configure(Config);

const queryParam = gql`
mutation MyMutation($id: ID) {
  addID(id: $id) {
    id
  }
}`

const variable = {
  id: 1
}

const headers = {
  "x-sample-header": "ABC123"
}

const response = await mutation(queryParam, variable, headers);
```

#### Subscription
```typescript
import {subscription, configure, gql} from "@itkyk/appsync";
import Config from "aws config file path";
configure(Config);

const queryParam = gql`
subscription MySubscribe($id: ID) {
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

const listener = subscription(
  queryParam, 
  variable, 
  {
  onNext,
  onError,
  onComplete
  },
  headers);

listener.unsubscribe()
consoe.log(listener.closed) // -> return boolean
```

## Global Headers

```typescript
import {getGlobalHeaders, setGlobalHeaders} from "@itkyk/appsync";

// In the subsequent `query`/` mutation`/`subScribe`, if you do not pass Header, this header will be used.
setGlobalHeaders({
  "x-sample-header": "ABC123"
});

const headers = getGlobalHeaders();
console.log(headers); // ->  {"x-sample-header": "ABC123"}
```

## Change Log
- 2024/11/03(version 2.0.3)
  - `Query` and` Mutation` have been set to `Promise`.
  - Some arguments have been removed or removed.
  - Header can be set in common as a whole.
- 2023/03/03 (version 1.0.2)
  - Added `headers` to the second argument of the `query`/`mutation`/`subscription` method.
- 2023/02/17 (version 1.0.1)
  - subscription return ZenObservable.Subscription