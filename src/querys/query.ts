import {API, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api-graphql/src";
import {GraphQLError} from "graphql";
import {Observable} from "zen-observable-ts";
import {globalHeaders} from "../utils/settings";


export interface subscriptionProp {
  onNext: (value?: object,provider?: object) => void;
  onError?: (errorValue: any) => void;
  onComplete?: () => void;
}

export interface RequestHeaders {
  [key: string]: string
}


type Response<T> = {ok: true; data: T} | {ok: false; errors: GraphQLError[] | Error}

export const gql = (template: TemplateStringsArray) => template.join("");

export const query = async<T extends object>(queryParam: string, variables: {[key: string]: any}, headers?: RequestHeaders): Promise<Response<T>> => {
  try {
    const items = await API.graphql(graphqlOperation(queryParam, variables), headers || globalHeaders) as GraphQLResult<T>;
    const result = items.data || null;
    const errors = items.errors;
    if (errors) return {
      ok: false,
      errors
    };
    return {
      ok: true,
      data: result!
    };
  }catch (e) {
    return  {
      ok: false,
      errors: e as Error
    }
  }
}

export const mutation = async<T extends object>(queryParam: string, variables: {[key: string]: any}, headers?: RequestHeaders): Promise<Response<T>> => {
  try {
    const items = await API.graphql(graphqlOperation(queryParam, variables), headers || globalHeaders) as GraphQLResult<T>;
    const result = items.data || null;
    const errors = items.errors || null;
    if (errors) return {
      ok: false,
      errors
    };
    return {
      ok: true,
      data: result!
    };
  } catch (e) {
    return  {
      ok: false,
      errors: e as Error
    }
  }
}

export const subscription = (queryParam: string, variables: {[key: string]: any}, {onNext, onError, onComplete}: subscriptionProp, headers?: RequestHeaders) => {
  const Subscribe = API.graphql(graphqlOperation(queryParam, variables), headers || window.itkyk_appsync || {}) as Observable<object>;
  return Subscribe.subscribe({
    next({value, provider}: {value: {data: object}, provider: object}) {
      onNext(value, provider);
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