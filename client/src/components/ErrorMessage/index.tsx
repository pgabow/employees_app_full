import React from "react";
import { Alert } from "antd";

type PropsErrorMessage = {
  message?: string
}

export const ErrorMessage = ({ message }: PropsErrorMessage) => {
  if (!message) {
    return null
  }

  return <Alert message={message} type='error' />
}
