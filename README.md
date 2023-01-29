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
query({
  queryParam,
  variable,
  onNext
})
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
mutation({
  queryParam,
  variable,
  onNext
})
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
subscription({
  queryParam,
  variable,
  onNext,
  onError,
  onComplete
})
```