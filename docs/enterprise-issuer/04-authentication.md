---
sidebar_position: 4
---

# Configuring the authentication mechanism 


## Adding Authentication Methods

The Enterprise Issuer uses PassportJS for authorization & authentication, which means that custom authentication implementations can be used.

To create a new Authentication mechanism, create a file in the `src/authorization` folder. This file should contain a function, which creates an Authentication Method.

Example:
```ts title=src/authorization/addLocalAuthMethod.ts
export function addLocalAuthMethod(
	entrypoint: string,
	authorizationRouter: any,
	authenticationCb: (res: Response) => void
) {}
```

Then, custom authentication mechanisms can be added in the `src/authorization/router.ts` file.

```js title=src/authorization/router.ts
addLocalAuthMethod('/login', authorizationRouter, (res) => {
	return res.redirect('/authorization/consent')
});
```

## Extending the req.userSession object

To extend the `req.userSession` with additional attibutes, you can define new attributes on the `src/configuration/session/AdditionalProperties.ts`

```ts title=src/configuration/session/AdditionalProperties.ts
/**
 * Provide additional data for a user-session
 */
export type AdditionalSessionData = {
	
	// authentication component variables
	taxisid?: string;

	// fetchingCredentials from external sources
	ediplomasResponse?: EdiplomasResponseSchema;
}
```