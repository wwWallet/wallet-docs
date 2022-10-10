export type StoreVcErrors = 'DB_ERROR' | 'VC_ID_ERR' | 'VC_ISS_ERR' | 'ISSUER_NOT_FOUND';
export type GetAllVcByDidErrors = 'DB_ERROR';
export type GetAllVcByIssErrors = 'DB_ERROR';
export type GetVcErrors = 'DB_ERROR' | 'VC_NOT_FOUND_ERROR';

export type StoreVpErrors = 'DB_ERROR' | 'VP_ID_ERR' | 'VP_ISS_ERR' | 'VP_AUD_ERR';
export type GetAllVpByDidErrors = 'DB_ERROR';
export type GetAllVpByIssErrors = 'DB_ERROR';
export type GetVpErrors = 'DB_ERROR' | 'VP_NOT_FOUND_ERROR';