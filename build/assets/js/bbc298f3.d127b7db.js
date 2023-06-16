"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[529],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>g});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(r),f=i,g=u["".concat(l,".").concat(f)]||u[f]||d[f]||o;return r?n.createElement(g,a(a({ref:t},p),{},{components:r})):n.createElement(g,a({ref:t},p))}));function g(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:i,a[1]=s;for(var c=2;c<o;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},6062:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=r(7462),i=(r(7294),r(3905));const o={sidebar_position:3},a="Configuring the supported credentials for an issuer",s={unversionedId:"enterprise-issuer/configuring-credentials",id:"enterprise-issuer/configuring-credentials",title:"Configuring the supported credentials for an issuer",description:"Create a configurable supported credential using the SupportedCredentialProtocol",source:"@site/docs/enterprise-issuer/03-configuring-credentials.md",sourceDirName:"enterprise-issuer",slug:"/enterprise-issuer/configuring-credentials",permalink:"/docs/docs/enterprise-issuer/configuring-credentials",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Configuring an issuer",permalink:"/docs/docs/enterprise-issuer/configuring-issuer"},next:{title:"Configuring the authentication mechanism",permalink:"/docs/docs/enterprise-issuer/authentication"}},l={},c=[{value:"Create a configurable supported credential using the SupportedCredentialProtocol",id:"create-a-configurable-supported-credential-using-the-supportedcredentialprotocol",level:2}],p={toc:c},u="wrapper";function d(e){let{components:t,...r}=e;return(0,i.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"configuring-the-supported-credentials-for-an-issuer"},"Configuring the supported credentials for an issuer"),(0,i.kt)("h2",{id:"create-a-configurable-supported-credential-using-the-supportedcredentialprotocol"},"Create a configurable supported credential using the SupportedCredentialProtocol"),(0,i.kt)("p",null,"Verifiable Credentials that can be issued are described by the SupportedCredentialProtocol:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"interface SupportedCredentialProtocol {\n    getCredentialIssuerConfig(): CredentialIssuerConfig;\n    getId(): string;\n    getFormat(): VerifiableCredentialFormat;\n    getTypes(): string[];\n    getDisplay(): Display;\n\n    getResources(userSession: UserSession): Promise<CategorizedRawCredential<any>[]>;\n    signCredential(userSession: UserSession, holderDID: string): Promise<{ format: VerifiableCredentialFormat, credential: any }>;\n\n    exportCredentialSupportedObject(): CredentialSupported;\n}\n\n")),(0,i.kt)("p",null,"Creating a custom credential to be issued is as simple as implementing the above functions for that credential."),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Create a file in the ",(0,i.kt)("inlineCode",{parentName:"li"},"src/configuration")," folder containing the custom credential's class, implementing ",(0,i.kt)("inlineCode",{parentName:"li"},"SupportedCredentialProtocol"),".")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"class EdiplomasBlueprint implements SupportedCredentialProtocol {}\n")),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"Implement the functions described on the ",(0,i.kt)("inlineCode",{parentName:"li"},"SupportedCredentialProtocol")," interface.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts",metastring:"title=src/configuration/IssuersConfiguration.ts",title:"src/configuration/IssuersConfiguration.ts"},"...\nuoaIssuer.addSupportedCredential(new EdiplomasBlueprint(uoaIssuer))\n\n")),(0,i.kt)("p",null,"An example of the ",(0,i.kt)("inlineCode",{parentName:"p"},"SupportedCredentialProtocol")," implementation is the ",(0,i.kt)("inlineCode",{parentName:"p"},"src/configuration/EdiplomasBlueprint.ts")))}d.isMDXComponent=!0}}]);