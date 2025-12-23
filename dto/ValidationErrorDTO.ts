export interface ValidationErrorResponse {
  errors: {
    [field: string]: ValidationErrorDetail;
  };
  _message: string;
  message: string;
}

export interface ValidationErrorDetail {
  name: string;
  message: string;
  properties: ValidationErrorProperties;
  kind: string;
  path: string;
  value: string;
}

export interface ValidationErrorProperties {
  message: string;
  type: string;
  maxlength?: number;
  minlength?: number;
  path: string;
  value: string;
}
