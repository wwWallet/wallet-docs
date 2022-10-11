

/**
 * 
 * @param type is the 'type' attribute of a VC in JSON-LD format
 */
export function decideVerifiableCredentialType(type: string[]): 'Diploma' | 'Attestation' | 'Presentation' {

	if (type.includes('VerifiablePresentation')) return 'Presentation';


	for (const t of type) {
		const lower = t.toLowerCase();
		if (lower.includes('europass') ||
				lower.includes('universitydegree') ||
				lower.includes('diploma')) {

					return 'Diploma';
		}
	}

	return 'Attestation';
}