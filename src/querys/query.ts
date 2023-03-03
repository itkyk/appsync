import {API, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api-graphql/src/types/index";
import {Observable} from "zen-observable-ts/lib/index";

export interface queryProps {
  queryParam: string;
  variable?: object;
  onNext: (data?: any, error?: any) => void;
}

export interface mutationProps {
  queryParam: string;
  variable: object;
  onNext?: (data?: any, error?: any) => void;
}

export interface subscriptionProp {
  queryParam: string;
  variable?: string;
  onNext: (value?: object,provider?: object) => void;
  onError?: (errorValue: any) => void;
  onComplete?: () => void;
}

export interface RequestHeaders {
  [key: string]: string
}

export const query = async({queryParam, variable, onNext}: queryProps, headers?: RequestHeaders) => {
  const items = await API.graphql(graphqlOperation(queryParam, variable), headers || {}) as GraphQLResult;
  const result = items.data || null;
  const errors = items.errors || null;
  onNext(result, errors)
}

export const mutation = async({queryParam, variable, onNext}: mutationProps, headers?: RequestHeaders) => {
  const items = await API.graphql(graphqlOperation(queryParam, variable), headers || {}) as GraphQLResult;
  const result = items.data || null;
  const errors = items.errors || null;
  if (onNext) {
    onNext(result, errors)
  }
}

export const subscription = ({queryParam, variable, onNext, onError, onComplete}: subscriptionProp, headers?: RequestHeaders) => {
  const Subscribe = API.graphql(graphqlOperation(queryParam, variable), headers || {}) as Observable<object>;
  return Subscribe.subscribe({
    next({value, provider}: {value: {data: object}, provider: object}) {
      onNext(value.data, provider);
    },
    error(errorValue: any) {
      if(onError) {
        onError(errorValue);
      }
    },
    complete() {
      if(onComplete) {
        onComplete()
      }
    }
  })
}