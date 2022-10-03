export type TIRErrors = 'DB_ERROR' | 'INVALID_DID_ERROR';
export type ClearTIRErrors = 'DB_ERROR';
export type StoreTIRErrors = 'DB_ERROR' | 'INVALID_DID_ERROR' | 'INVALID_DATA_ERROR' | 'INVALID_INST_ERROR';
export type FetchIssuersErrors = 'DB_ERROR' | 'CONNECTION_ERROR' | 'INVALID_ADDRESS_ERROR' | 'RESPONSE_ERROR';
export type GetTIDetailsErrors = 'DB_ERROR' | 'CONNECTION_ERROR' | 'INVALID_ADDRESS_ERROR' | 'RESPONSE_ERROR' | 'INST_NAME_NOT_FOUND';
export type GetIssuerByNameErrors = 'DB_ERROR';
export type GetTIDataErrors = 'DB_ERROR' | 'RESPONSE_NO_BODY_ERROR' | 'DECODING_ERROR';
export type GetTIInstErrors = 'DB_ERROR' | 'INST_NAME_NOT_FOUND';