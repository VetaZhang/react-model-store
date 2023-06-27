import React, { useState, useCallback } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";

class Store {
  store = {};

  add(model) {
    let name = '';
    let value = {};
    let method = {};

    Object.entries(model).forEach(([key, val]) => {
      if (key === 'name') {
        if (this.store[val]) {
          throw new Error(`Model '${name}' already exist in store`);
        } else {
          name = val;
        }
      } else if (key === 'getValue') {
        value = val();
      } else if (typeof val === 'function') {
        method[key] = val;
      }
    });

    if (name) {
      this.store[name] = { value, method };
    } else {
      throw new Error('Model need a name');
    }
  }

  addAll(modelList) {
    if (Array.isArray(modelList)) {
      modelList.forEach(({ name, model }) => {
        this.add(name, model);
      });
    } else {
      throw new Error('The param modelList must be a array');
    }
  }

  get(name) {
    if (this.store[name]) {
      return this.store[name];
    } else {
      throw new Error(`Cannot find model '${name}'`);
    }
  }
}

export const store = new Store();

export function userModel(modelName) {
  const model = store.get(modelName);
  const [value, setValue] = useState(model.value);
  const lastValueRef = useRef({});

  useEffect(() => {
    lastValueRef.current = value;
  }, [value]);

  const method = useMemo(() => {
    let wrappedMethod = {};
    Object.entries(model.method).forEach(([key, val]) => {
      wrappedMethod[key] = (...restParams) => {
        const firstParam = {
          set(obj) {
            const value = lastValueRef.current;
            setValue({ ...value, ...obj });
          }
        };
        val(firstParam, ...restParams);
      };
    });

    return wrappedMethod;
  }, [setValue]);

  return { ...value, ...method };
}