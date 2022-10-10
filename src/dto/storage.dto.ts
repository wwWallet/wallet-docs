import { Vc } from "../entities/vc.entity"

export type StoreVcRequestDTO = {
	vcjwt: string
}



export type StoreVpRequestDTO = {
	vpjwt: string
}



// Get All VC
export type GetAllVcResponseDTO = {
	vc_list: Vc[];

}


// Get One VC
export type GetOneVcResponseDTO = {
	vc: Vc;
}