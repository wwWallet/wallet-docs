import { randomUUID } from "crypto";
import { base64url } from "jose";

class CrossDeviceWalletSyncService {

	// key: state, value: did
	private syncImportRequestMap = new Map<string, string>();

	// key: state, value: did
	private syncExportRequestMap = new Map<string, string>();

	// Generates a URI for Cross-Device Wallet Import
	generateImportURI(): string {

		const state: string = base64url.encode(randomUUID());
		
		this.syncImportRequestMap.set(state, "");

		const stateToken: string = `wallet://wallet-import-sync?state=${state}`;
		return stateToken;
	}

	// Generates a URI for Cross-Device Wallet Export using the current DID
	generateExportURI(did: string): string {

		const state: string = base64url.encode(randomUUID());
		
		this.syncExportRequestMap.set(state, did);

		const stateToken: string = `wallet://wallet-import-sync?state=${state}`;
		return stateToken;
	}

}

const crossDeviceWalletSyncService = new CrossDeviceWalletSyncService();
export default crossDeviceWalletSyncService;