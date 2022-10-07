import axios from "axios";
import base64url from 'base64url';
import { Err, Ok, Result } from "ts-results";
import config from "../../config/config.dev";
import { SearchTIRResponseDTO } from "../dto/tir.dto";
import { TIR } from "../entities/tir.entity";
import { tirRepository } from "../repositories/tir.repository";
import { ClearTIRErrors, FetchIssuersErrors, GetIssuerByNameErrors, GetTIDataErrors, GetTIDetailsErrors, GetTIInstErrors, StoreTIRErrors } from "../types/errors/tir.errors";
import { TrustedIssuer } from "../types/tir";

class TIRManagementService {

	constructor() { }


	// Store a Trusted Issuer in the db
	async storeTIR(did: string, institution: string, country: string, data: string): Promise<Result<null, StoreTIRErrors>> {
		
		if(did === "")
			return Err('INVALID_DID_ERROR');

		if(institution === "")
			return Err('INVALID_INST_ERROR');

		if(data === "")
			return Err('INVALID_DATA_ERROR');

		const storeIssuerRes = await tirRepository.insertIssuer(did, institution, country, data);

		if(storeIssuerRes.ok) {
			return Ok(null);
		}
		else {
			return Err(storeIssuerRes.val);
		}
	}


	// Fetch all Valid Trusted Issuers from TIR
	// *Valid = Have an "institution" field in their data object
	async fetchIssuers(): Promise<Result<null, FetchIssuersErrors>> {

		var url = config.tirURL+"?page[after]=1&page[size]=50";
		var tirRes;
		var response;
		var items;

		do {
			// keep initial url for first loop, use response for next
			url = response ? response.links.next : url;
			console.log('Fetching issuers from url:', url);
			tirRes = await axios.get(url);
			if(tirRes.status !== 200) {
				console.log('TIR API response code: ', tirRes.status);
				return Err('RESPONSE_ERROR');
			}
			if(tirRes.data === undefined || tirRes.data === null) {
				return Err('RESPONSE_ERROR');
			}
			response = tirRes.data;
			items = response.items;

			const trustedIssuers: TrustedIssuer[] = [];
			for (const issuer of items) {
				try {
					const tirDetailsRes = await this.getTrustedIssuerDetails(issuer.did, issuer.href);
					if(tirDetailsRes.ok) {
						trustedIssuers.push(tirDetailsRes.val);
					}
					else {
						console.log(tirDetailsRes.err);
					}
				}
				catch(err) {
					console.log(err);
				}
			}

			for (const trustedIssuer of trustedIssuers) {
				await tirRepository.insertIssuer(trustedIssuer.did, trustedIssuer.institution, trustedIssuer.country, trustedIssuer.data);
			}

		}
		while (url !== tirRes.data.links.last);

		return Ok(null);
	}


	// Get Institution and Data of Trusted Issuer with given DID
	async getTrustedIssuerDetails(did: string, href: string): Promise<Result<TrustedIssuer, GetTIDetailsErrors>> {

		const issuerRes = await axios.get(href);
		if(issuerRes.status !== 200) {
			console.log('TIR DID API response code: ', issuerRes.status);
			return Err('RESPONSE_ERROR');
		}
		if(issuerRes.data === undefined || issuerRes.data === null) {
			return Err('RESPONSE_ERROR');
		}

		var data: string = "";
		var institution: string = "";

		const getDataRes = this.getTrustedIssuerData(issuerRes.data);
		if(getDataRes.ok)
			data = getDataRes.val;
		else
			return Err('DB_ERROR');

		const getInstitutionRes = this.getTrustedIssuerInstitutionName(issuerRes.data);

		if(getInstitutionRes.ok)
			institution = getInstitutionRes.val;
		else
			return Err(getInstitutionRes.val);

		const trustedIssuer: TrustedIssuer = {did: did, data: data, institution: institution, country: "Greece"};
		console.log(trustedIssuer);

		return Ok(trustedIssuer);
	}


	// append all issuer attributes into a data string
	getTrustedIssuerData(encodedData: any): Result<string, GetTIDataErrors> {

		var data: string = "";

		for (const attr of encodedData.attributes) {
			const response = attr.body;
			if(response === undefined || response === null)
				continue;

			var decodedResponse: string = "";
			try {
				decodedResponse = base64url.decode(response);
			}
			catch(err) {
				console.log('Decoding error:', err);
				continue;
			}

			data+=decodedResponse;
		}

		if(data==="")
			return Err('DB_ERROR');
		return Ok(data);
	}


	// attempt to get issuer institution name
	getTrustedIssuerInstitutionName(data: any): Result<string, GetTIInstErrors> {

		// search every attribute for a json object with the Institution field
		// if one attr fails, continue to the next
		// if all fields fail to yield institution name, return Err
		for (const attr of data.attributes) {
			const response = attr.body;
			if(response === undefined || response === null)
				continue;

			var decodedResponse: string = "";
			try {
				decodedResponse = base64url.decode(response);
			}
			catch(e) {
				continue;
			}

			var responseObject;
			try {
				responseObject = JSON.parse(decodedResponse);
				const institutionName: string = responseObject.institution;
				if(institutionName!==undefined)
					return Ok(institutionName);
			}
			catch(e) {
				continue;
			}
		}

		return Err('INST_NAME_NOT_FOUND');
	}


	// clear saved TIR
	async clearTIR(): Promise<Result<null, ClearTIRErrors>> {

		const clearTirRes = await tirRepository.clearTIR();

		if(clearTirRes.ok) {
			return Ok(null);
		}
		else {
			console.log(clearTirRes.err);
			return Err(clearTirRes.val);
		}
	}


	async getIssuersByInstitutionName(institution: string, country: string): Promise<Result<SearchTIRResponseDTO[], GetIssuerByNameErrors>> {

		const getIssuersRes = await tirRepository.getIssuersByInstitutionName(institution, country);
		if(!getIssuersRes.ok) {
			console.log(getIssuersRes.err);
			return Err(getIssuersRes.val);
		}

		const result: SearchTIRResponseDTO[] = []
		const issuers: TIR[] = getIssuersRes.val;
		issuers.forEach(issuer => {
			result.push({id: issuer.id, institution: issuer.institution});
		});

		return Ok(result);
	}

}


const tirManagementService = new TIRManagementService();
export default tirManagementService;