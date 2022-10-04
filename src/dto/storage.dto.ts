
export type StoreVcRequestDTO = {
	vcjwt: string
}



export type StoreVpRequestDTO = {
	vpjwt: string
}



// Get All VC
export type GetAllVcResponseDTO = {
	vc_list: {
		jwt: string;
	}[];
}


// Get One VC
export type GetOneVcResponseDTO = {
	vc: {
		jwt: string;
	};
}